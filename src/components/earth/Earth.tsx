// Three
import * as THREE from 'three';
import { Mesh } from 'three';
import { useTexture, useProgress, OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';

// React
import { useRef, useMemo, useCallback } from 'react';

// GSAP
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Store
import { useTimelineStore } from '@/store/timeline';
import { useContinentStore } from '@/store/continent';

// Earth shaders
import earthVertexShader from '@/assets/earth/shaders/vertex.glsl';
import earthFragmentShader from '@/assets/earth/shaders/fragment.glsl';

// Atmosphere shaders
import atmosphereVertexShader from '@/assets/atmosphere/shaders/vertex.glsl';
import atmosphereFragmentShader from '@/assets/atmosphere/shaders/fragment.glsl';

const Earth = () => {
  /**
   * Refs
   */
  const earthRef = useRef<Mesh>(null!);
  const atmosphereRef = useRef<Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const sunRef = useRef<Mesh>(null!);
  // const yPosition = useRef(0);
  const earthMaterial = useRef<THREE.ShaderMaterial>(null!);
  const atmosphereMaterial = useRef<THREE.ShaderMaterial>(null!);
  const masterTimelineRef = useRef<gsap.core.Timeline>();
  const mouse = useRef({ x: 0, y: 0 });

  /**
   * Store
   */
  const currentAct = useTimelineStore((state) => state.currentAct);
  const updateAct = useTimelineStore((state) => state.updateAct);
  const continent = useContinentStore((state) => state.continent);

  console.log(continent);

  /**
   * GSAP
   */
  gsap.registerPlugin(useGSAP);

  const { progress } = useProgress();
  const { camera } = useThree();
  const { contextSafe } = useGSAP();

  /**
   * Timeline
   */

  // Act intro
  const actIntro = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'power2.inOut' },
    });

    tl.from(sunSpherical, {
      delay: 1,
      theta: -3,
      onUpdate: updateSun,
    });
  });

  // Act two
  const actTwo = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: 'expo.inOut' },
    });

    tl.to(
      groupRef.current.position,
      {
        y: 0,
      },
      '<',
    );

    tl.to(
      groupRef.current.rotation,
      {
        x: continent.position.x,
        y: continent.position.y,
        z: continent.position.z,
      },
      '<',
    );

    tl.to(
      camera.position,
      {
        z: 15,
      },
      '<',
    );

    tl.to(
      sunSpherical,
      {
        theta: 0.7,
        onUpdate: updateSun,
      },
      '<',
    );

    return tl;
  });

  // Act three
  const actThree = contextSafe(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: 'power2.inOut',
      },
    });

    tl.to(
      camera.position,
      {
        z: 4,
      },
      '<',
    );

    return tl;
  });

  useGSAP(
    () => {
      if (!masterTimelineRef.current) {
        masterTimelineRef.current = gsap.timeline({ paused: true });
      }

      const master = masterTimelineRef.current;

      master.add(actTwo());
      master.add(actThree());

      if (currentAct === 1) {
        master.tweenTo(0);
      }

      if (currentAct === 2) {
        master.tweenTo(1.5);
      }

      if (currentAct === 3) {
        master.tweenTo(3);
      }
    },
    { dependencies: [currentAct] },
  );

  useGSAP(
    () => {
      if (currentAct === 2) {
        gsap.to(groupRef.current.rotation, {
          x: continent.position.x,
          y: continent.position.y,
          z: continent.position.z,
        });
      }
    },
    { dependencies: [continent] },
  );

  useGSAP(
    () => {
      if (progress === 100) {
        actIntro();
      }
    },
    { dependencies: [progress] },
  );

  useGSAP(
    () => {
      gsap.to(camera.position, {
        x: mouse.current.x * 0.01,
        y: mouse.current.y * 0.01,
      });
    },
    { dependencies: [mouse] },
  );

  /**
   * Textures
   */
  const [dayTexture, nightTexture, specularCloudsTexture] = useTexture([
    '/textures/day.jpg',
    '/textures/night.jpg',
    '/textures/specularClouds.jpg',
  ]);

  dayTexture.anisotropy = 8;
  dayTexture.colorSpace = THREE.SRGBColorSpace;

  nightTexture.anisotropy = 8;
  nightTexture.colorSpace = THREE.SRGBColorSpace;

  specularCloudsTexture.anisotropy = 8;

  // Update texture anisotropy
  // const updateTextureAnisotropy = useCallback(() => {
  //   console.log('updateTextureAnisotropy');
  //   dayTexture.anisotropy = 1;
  //   nightTexture.anisotropy = 1;
  //   specularCloudsTexture.anisotropy = 1;
  // }, [dayTexture, nightTexture, specularCloudsTexture]);

  /**
   * Earth
   */
  const earthParameters = {
    atmosphereDayColor: '#00aaff',
    atmosphereTwilightColor: '#ff6600',
  };

  /**
   * Sun
   */
  const sunSpherical = useMemo(() => new THREE.Spherical(1, 0.8, -1.1), []);
  const sunDirection = useMemo(() => new THREE.Vector3(), []);

  // Update sun
  const updateSun = useCallback(() => {
    sunDirection.setFromSpherical(sunSpherical);
    sunDirection.normalize();

    sunRef.current.position.copy(sunDirection);
    sunRef.current.position.multiplyScalar(10);

    earthMaterial.current.uniforms.uSunDirection.value = sunDirection;
    atmosphereMaterial.current.uniforms.uSunDirection.value = sunDirection;
  }, [sunSpherical, sunDirection]);

  /**
   * Animate
   */
  useFrame((_state, delta) => {
    if (currentAct === 1) {
      groupRef.current.rotation.y -= delta * 0.05;
      groupRef.current.rotation.x += delta * 0.05;
    }
  });

  /**
   * Debug
   */

  // Sun spherical coordinates phi
  useControls('sunSpherical', {
    phi: {
      value: sunSpherical.phi,
      min: 0,
      max: Math.PI,
      onChange: (value) => {
        sunSpherical.phi = value;
        updateSun();
      },
    },
  });

  // Sun spherical coordinates theta
  useControls('sunSpherical', {
    theta: {
      value: sunSpherical.theta,
      min: -Math.PI,
      max: Math.PI,
      onChange: (value) => {
        sunSpherical.theta = value;
        updateSun();
      },
    },
  });

  // Enable controls
  const { enableControls, showDebugSun } = useControls('Controls', {
    enableControls: false,
    showDebugSun: false,
  });

  // Update act
  useControls('State', {
    changeAct: {
      options: [1, 2, 3],
      onChange: (value) => updateAct(value),
    },
  });

  // Earth position
  const { position } = useControls('Earth', {
    position: { value: [0, 0.5, 0] },
  });

  // Earth rotation
  const { rotation } = useControls('Earth', {
    rotation: { value: [0, 0, 0] },
  });

  // useEffect(() => {
  //   // // Calculate the y position based on the camera's field of view and the distance of the planet from the camera
  //   // const distance = camera.position.z;
  //   // yPosition.current =
  //   //   Math.tan(
  //   //     ((camera as THREE.PerspectiveCamera).fov / 2) * (Math.PI / 180),
  //   //   ) * distance;
  //   // updateSun();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      {enableControls && <OrbitControls />}
      <group position={position} ref={groupRef} rotation={rotation}>
        {/* Earth */}
        <mesh ref={earthRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <shaderMaterial
            ref={earthMaterial}
            vertexShader={earthVertexShader}
            fragmentShader={earthFragmentShader}
            uniforms={{
              uDayTexture: new THREE.Uniform(dayTexture),
              uNightTexture: new THREE.Uniform(nightTexture),
              uSpecularCloudsTexture: new THREE.Uniform(specularCloudsTexture),
              uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
              uAtmosphereDayColor: new THREE.Uniform(
                new THREE.Color(earthParameters.atmosphereDayColor),
              ),
              uAtmosphereTwilightColor: new THREE.Uniform(
                new THREE.Color(earthParameters.atmosphereTwilightColor),
              ),
            }}
          />
        </mesh>

        {/* Atmosphere */}
        <mesh scale={[1.04, 1.04, 1.04]} ref={atmosphereRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <shaderMaterial
            ref={atmosphereMaterial}
            side={THREE.BackSide}
            transparent
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            uniforms={{
              uSunDirection: new THREE.Uniform(new THREE.Vector3(0, 0, 1)),
              uAtmosphereDayColor: new THREE.Uniform(
                new THREE.Color(earthParameters.atmosphereDayColor),
              ),
              uAtmosphereTwilightColor: new THREE.Uniform(
                new THREE.Color(earthParameters.atmosphereTwilightColor),
              ),
            }}
          />
        </mesh>

        {/* Sun */}
        <mesh ref={sunRef} visible={showDebugSun}>
          <icosahedronGeometry args={[0.1, 2]} />
          <meshBasicMaterial />
        </mesh>
      </group>
    </>
  );
};

export default Earth;

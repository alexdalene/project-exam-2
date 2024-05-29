// Three
import * as THREE from 'three';
import { Mesh } from 'three';
import { useTexture, OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';

// React
import { useRef, useMemo, useCallback, useEffect } from 'react';

// Earth shaders
import earthVertexShader from '@/assets/earth/shaders/vertex.glsl';
import earthFragmentShader from '@/assets/earth/shaders/fragment.glsl';

// Atmosphere shaders
import atmosphereVertexShader from '@/assets/atmosphere/shaders/vertex.glsl';
import atmosphereFragmentShader from '@/assets/atmosphere/shaders/fragment.glsl';

// Components
import EarthMenu from './EarthMenu';

const Earth = () => {
  /**
   * Refs
   */
  const earthRef = useRef<Mesh>(null!);
  const atmosphereRef = useRef<Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const sunRef = useRef<Mesh>(null!);
  const earthMaterial = useRef<THREE.ShaderMaterial>(null!);
  const atmosphereMaterial = useRef<THREE.ShaderMaterial>(null!);

  /**
   * Textures
   */
  const [dayTexture, nightTexture, specularCloudsTexture] = useTexture([
    '/textures/day.jpg',
    '/textures/night.jpg',
    '/textures/specularClouds.jpg',
  ]);

  dayTexture.anisotropy = 4;
  dayTexture.colorSpace = THREE.SRGBColorSpace;

  nightTexture.anisotropy = 4;
  nightTexture.colorSpace = THREE.SRGBColorSpace;

  specularCloudsTexture.anisotropy = 4;

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

  useEffect(() => {
    updateSun();
  }, []);

  /**
   * Animate
   */
  useFrame((_state, delta) => {
    const time = performance.now() * 0.001; // get time in seconds
    const oscillation = Math.sin(time); // oscillates between -1 and 1

    groupRef.current.rotation.y -=
      delta * Math.cos(sunSpherical.theta) * oscillation * 0.08;
    groupRef.current.rotation.x +=
      delta * Math.sin(sunSpherical.theta) * oscillation * 0.08;
    groupRef.current.position.y = oscillation * 0.1;
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
    enableControls: true,
    showDebugSun: false,
  });

  // Earth position
  const { position } = useControls('Earth', {
    position: { value: { x: -0, y: 0 }, step: 0.01, joystick: 'invertY' },
  });

  // Earth rotation
  const { rotation } = useControls('Earth', {
    rotation: { value: { x: 0, y: 0, z: 0 }, step: 0.01 },
  });

  return (
    <>
      {enableControls && <OrbitControls enableDamping />}

      <group
        position={[position.x, position.y, 0]}
        ref={groupRef}
        rotation={[rotation.x, rotation.y, rotation.z]}
      >
        <EarthMenu />

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

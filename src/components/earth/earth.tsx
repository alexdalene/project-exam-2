import * as THREE from 'three';
import { Mesh } from 'three';
import { useTexture, useProgress } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

import { useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAnimationStore } from '@/store/animation';

// Earth shaders
import earthVertexShader from '@/assets/earth/shaders/vertex.glsl';
import earthFragmentShader from '@/assets/earth/shaders/fragment.glsl';

// Atmosphere shaders
import atmosphereVertexShader from '@/assets/atmosphere/shaders/vertex.glsl';
import atmosphereFragmentShader from '@/assets/atmosphere/shaders/fragment.glsl';

const Earth = () => {
  const earthRef = useRef<Mesh>(null!);
  const atmosphereRef = useRef<Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  /**
   * GSAP
   */
  const { progress } = useProgress();

  useGSAP(
    () => {
      if (progress === 100) {
        gsap.from(sunSpherical, {
          delay: 1.2,
          phi: 1.3,
          duration: 1.5,
          ease: 'power2.inOut',
          onUpdate: updateSun,
        });
      }
    },
    { dependencies: [progress] },
  );

  /**
   * Textures
   */
  const [dayTexture, nightTexture, specularCloudsTexture] =
    useTexture([
      '/textures/day.jpg',
      '/textures/night.jpg',
      '/textures/specularClouds.jpg',
    ]);

  dayTexture.anisotropy = 8;
  dayTexture.colorSpace = THREE.SRGBColorSpace;

  nightTexture.anisotropy = 8;
  nightTexture.colorSpace = THREE.SRGBColorSpace;

  specularCloudsTexture.anisotropy = 8;

  /**
   * Earth
   */
  const earthParameters = {
    atmoshphereDayColor: '#00aaff',
    atmosphereTwilightColor: '#ff6600',
  };

  /**
   * Sun
   */
  const sunSpherical = useMemo(
    () =>
      new THREE.Spherical(
        1,
        0.515221195188726,
        -2.65150419962979,
      ),
    [],
  );
  const sunDirection = useMemo(
    () => new THREE.Vector3(),
    [],
  );

  // Update sun
  const updateSun = useCallback(() => {
    // Sun direction
    sunDirection.setFromSpherical(sunSpherical);

    // Uniforms
    (
      earthRef.current.material as THREE.ShaderMaterial
    ).uniforms.uSunDirection.value.copy(sunDirection);
    (
      atmosphereRef.current.material as THREE.ShaderMaterial
    ).uniforms.uSunDirection.value.copy(sunDirection);
  }, [sunDirection, sunSpherical]);

  /**
   * Store
   */
  const isAnimating = useAnimationStore(
    (state) => state.isAnimating,
  );

  const { contextSafe } = useGSAP();
  const { camera } = useThree();
  const tl = gsap.timeline();

  const onClickAnimation = contextSafe(() => {
    tl.to(groupRef.current.position, {
      duration: 1.5,
      x: 0,
      y: window.innerHeight * 0.001 + 0.6,
      ease: 'power2.inOut',
    })
      .to(
        camera.position,
        {
          duration: 1.5,
          x: 0,
          y: 0,
          z: 50,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        groupRef.current.rotation,
        {
          duration: 1.5,
          x: Math.PI * 0.5,
          y: Math.PI * 1.2,
          ease: 'power2.inOut',
        },
        '<',
      );
  });

  if (isAnimating) {
    onClickAnimation();
  }

  /**
   * Animate
   */
  useFrame((_state, delta) => {
    earthRef.current.rotation.y += delta * 0.01;
    earthRef.current.rotation.x += delta * 0.01;
  });

  return (
    <>
      <group position={[-0.5, -1.5, 0]} ref={groupRef}>
        <mesh ref={earthRef}>
          <sphereGeometry args={[2, 64, 64]} />
          <shaderMaterial
            vertexShader={earthVertexShader}
            fragmentShader={earthFragmentShader}
            uniforms={{
              uDayTexture: { value: dayTexture },
              uNightTexture: { value: nightTexture },
              uSpecularCloudsTexture: {
                value: specularCloudsTexture,
              },
              uSunDirection: {
                value: new THREE.Vector3(0, 0, 1),
              },
              uAtmosphereDayColor: new THREE.Uniform(
                new THREE.Color(
                  earthParameters.atmoshphereDayColor,
                ),
              ),
              uAtmosphereTwilightColor: new THREE.Uniform(
                new THREE.Color(
                  earthParameters.atmosphereTwilightColor,
                ),
              ),
            }}
          />
        </mesh>

        <mesh
          scale={[1.04, 1.04, 1.04]}
          ref={atmosphereRef}
        >
          <sphereGeometry args={[2, 64, 64]} />
          <shaderMaterial
            side={THREE.BackSide}
            transparent
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            uniforms={{
              uSunDirection: {
                value: new THREE.Vector3(0, 0, 1),
              },
              uAtmosphereDayColor: new THREE.Uniform(
                new THREE.Color(
                  earthParameters.atmoshphereDayColor,
                ),
              ),
              uAtmosphereTwilightColor: new THREE.Uniform(
                new THREE.Color(
                  earthParameters.atmosphereTwilightColor,
                ),
              ),
            }}
          />
        </mesh>
      </group>
    </>
  );
};

export default Earth;

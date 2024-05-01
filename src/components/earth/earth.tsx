import * as THREE from 'three';
import { Mesh } from 'three';
import { useTexture, useProgress } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import GUI from 'lil-gui';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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

  useEffect(() => {
    updateSun();
  });

  /**
   * GUI
   */
  const gui = new GUI();
  gui.hide();

  // Get hash
  const hash = window.location.hash;

  // Show GUI if hash is debug
  if (hash === '#debug') {
    gui.show();
  }

  /**
   * GSAP
   */
  const { progress } = useProgress();

  useGSAP(
    () => {
      if (progress === 100) {
        gsap.from(sunSpherical, {
          delay: 2.6,
          phi: 1.3,
          duration: 2,
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
      'src/assets/earth/textures/day.jpg',
      'src/assets/earth/textures/night.jpg',
      'src/assets/earth/textures/specularClouds.jpg',
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
  const sunSpherical = new THREE.Spherical(
    1,
    0.515221195188726,
    -2.65150419962979,
  );
  const sunDirection = new THREE.Vector3();

  // Update sun
  const updateSun = () => {
    // Sun direction
    sunDirection.setFromSpherical(sunSpherical);

    // Uniforms
    (
      earthRef.current.material as THREE.ShaderMaterial
    ).uniforms.uSunDirection.value.copy(sunDirection);
    (
      atmosphereRef.current.material as THREE.ShaderMaterial
    ).uniforms.uSunDirection.value.copy(sunDirection);
  };

  /**
   * Debug
   */
  gui
    .add(sunSpherical, 'phi', 0, Math.PI)
    .onChange(updateSun);

  gui
    .add(sunSpherical, 'theta', -Math.PI, Math.PI)
    .onChange(updateSun);

  gui
    .addColor(earthParameters, 'atmoshphereDayColor')
    .onChange(() => {
      (
        earthRef.current.material as THREE.ShaderMaterial
      ).uniforms.uAtmosphereDayColor.value.set(
        earthParameters.atmoshphereDayColor,
      );
      (
        atmosphereRef.current
          .material as THREE.ShaderMaterial
      ).uniforms.uAtmosphereDayColor.value.set(
        earthParameters.atmoshphereDayColor,
      );
    });

  gui
    .addColor(earthParameters, 'atmosphereTwilightColor')
    .onChange(() => {
      (
        earthRef.current.material as THREE.ShaderMaterial
      ).uniforms.uAtmosphereTwilightColor.value.set(
        earthParameters.atmosphereTwilightColor,
      );
      (
        atmosphereRef.current
          .material as THREE.ShaderMaterial
      ).uniforms.uAtmosphereTwilightColor.value.set(
        earthParameters.atmosphereTwilightColor,
      );
    });

  gui.add({ reset: () => gui.reset() }, 'reset');

  useFrame((state, delta) => {
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

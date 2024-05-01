import {
  useTexture,
  OrbitControls,
} from '@react-three/drei';
import { Mesh } from 'three';
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import GUI from 'lil-gui';
import { useFrame } from '@react-three/fiber';

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
  const sunRef = useRef<Mesh>(null!);
  const earthRef = useRef<Mesh>(null!);
  const atmosphereRef = useRef<Mesh>(null!);

  useEffect(() => {
    if (sunRef.current) {
      updateSun();
    }
  }, [sunRef.current]);

  /**
   * GUI
   */
  const gui = new GUI();

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
    0.439822971502571,
    2.88398205599543,
  );
  const sunDirection = new THREE.Vector3();

  // Update sun
  const updateSun = () => {
    // Sun direction
    sunDirection.setFromSpherical(sunSpherical);

    // Debug
    sunRef.current.position
      .copy(sunDirection)
      .multiplyScalar(5);

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
  });

  return (
    <>
      <group position={[-0.5, -1.5, 0]}>
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
          <OrbitControls />
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

      <mesh ref={sunRef}>
        <icosahedronGeometry args={[0.1, 2]} />
        <meshBasicMaterial />
      </mesh>
    </>
  );
};

export default Earth;

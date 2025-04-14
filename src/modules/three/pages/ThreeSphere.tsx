import {
  Center,
  Environment,
  MeshDistortMaterial,
  OrbitControls,
  Sphere,
  Text3D,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export const ThreeSphere = () => {
  return (
    <div className="relative w-full h-full bg-white dark:bg-gray-800 rounded shadow overflow-hidden">
      <a
        href="https://github.com/zorochimaru/how-to-react/blob/main/src/modules/three/pages/ThreeSphere.tsx"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute z-10 top-2 right-2 text-sm text-gray-500 dark:text-gray-400"
      >
        Source {'</>'}
      </a>
      <Canvas camera={{ position: [10, -5, 20], zoom: 2, fov: 20 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <Center>
          <Text3D
            position={[0, 0, 0]}
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.5}
            letterSpacing={-0.06}
            size={1.5}
            font="fonts/Inter 24pt_Bold.json"
          >
            {`How to\nReact`}
            <meshNormalMaterial />
          </Text3D>
          <Sphere args={[1, 64, 64]} position={[-1, 0, 1]} scale={1}>
            <MeshDistortMaterial
              color="#38bdf8"
              attach="material"
              distort={0.3}
              speed={2}
              roughness={0.1}
            />
          </Sphere>
          <OrbitControls />
          <Environment preset="night" />
        </Center>
      </Canvas>
    </div>
  );
};

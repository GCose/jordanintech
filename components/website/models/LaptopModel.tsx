import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const LaptopModel = () => {
  const { scene } = useGLTF("/models/about.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={17.5} position={[0, 0, 0]} />
  );
};

useGLTF.preload("/models/about.glb");

export default LaptopModel;

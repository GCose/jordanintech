import { Suspense } from "react";
import LaptopModel from "./LaptopModel";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

const LaptopScene = () => {
  return (
    <div className="relative w-full h-full">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 10, 7]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.3} intensity={0.5} />

        <Suspense fallback={null}>
          <LaptopModel />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};
export default LaptopScene;

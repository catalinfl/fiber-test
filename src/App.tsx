import { useEffect, useRef, useState } from "react";
import { Button } from "./components/ui/button"
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, PresentationControls, useGLTF } from "@react-three/drei";

type Model = {
  path: string,
  title: string
}

const Models: Model[] = [
  {
    path: "../models/masa.glb",
    title: "Masa"
  },
  {
    path: "../models/scaun.glb",
    title: "Scaun"
  },
  {
    path: "../models/scena.glb",
    title: "Scena"
  }
]

import * as THREE from 'three';

function Model({ path }: Partial<Model>) {
  const { scene } = useGLTF(path as string) 
  const ref = useRef<THREE.Object3D>()

  useEffect(() => {
    if (ref.current) {
      // ref.current.rotation.x = THREE.MathUtils.degToRad(30); // Rotate 30 degrees around the x-axis
      // ref.current.rotation.z = THREE.MathUtils.degToRad(20); // Rotate 60 degrees around the y-axis
      // ref.current.rotation.x = THREE.MathUtils.degToRad(120);
      // ref.current.rotation.z = THREE.MathUtils.degToRad(90); // Rotate 90 degrees around the z-axis
    }
  }, []);
  
  return <primitive object={scene} position={[-2, -2, -6]} ref={ref}  />
}



function App() {

  const { toast } = useToast();


  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
  setIsDark(!isDark)
  if (!isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove("dark")
  }
  }


  return (
    <> 
      <Button
        onClick={() => {
          toast({
            title: "Scheduled: Catch up",
            description: "Friday, February 10, 2023 at 5:57 PM",
          })
        }}
      >
        Show Toast
      </Button>
      <Toaster />    
      <Canvas style={{
        width: "1200px", height: "700px"
      }} flat dpr={[1, 2]} camera={{ fov: 50, position: [-10, 20, 20] }}>
        <PresentationControls snap global zoom={0.3} rotation={[0, -Math.PI/2, 0]} polar={[0, Math.PI / 4]} azimuth={[-Math.PI / 8, Math.PI / 8]}>
        <ambientLight intensity={4} position={[0, 0, 0]}/>
        <pointLight position={[0, 0, -8]} intensity={12}/>
          <Model path={Models[2].path} />
        </PresentationControls>
      </Canvas>
    </>
  )

}

export default App

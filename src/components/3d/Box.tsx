import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react"
import { Mesh } from "three";

const Box = (props: { position: [x: number, y: number, z: number]}) => {
    
    const meshRef = useRef<Mesh>(null);

    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)

    useFrame((state, delta) => {
        if (meshRef.current && meshRef.current.rotation) {
            meshRef.current.rotation.x += delta;
        }
    })

    console.log(hovered)

    const handleFunc = () => {
        if (hovered) {
            setHover(false)
        } 
        else setHover(true)
    }

    return (
        <mesh
        position={props?.position}
        ref={meshRef}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerEnter={(event) => setHover(true)}
        onPointerLeave={(event) => setHover(false)}>
        
        <sphereGeometry args={[1, 100, 100]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
        )
}

export default Box
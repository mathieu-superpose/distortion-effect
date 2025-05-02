import { useMemo } from "react"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

import vertex from "../shaders/distorded-image/vertex.glsl"
import fragment from "../shaders/distorded-image/fragment.glsl"

const ImageDistortionsShaderMaterial = shaderMaterial({}, vertex, fragment)

extend({ ImageDistortionsShaderMaterial })

function ImageWithDistortions({ imageUrl }: { imageUrl: string }) {
  const material = useMemo(() => {
    const texture = new THREE.TextureLoader().load(imageUrl, (texture) => {
      // crisp pixels
      texture.minFilter = THREE.NearestFilter
      texture.magFilter = THREE.NearestFilter
    })
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: new THREE.Uniform(texture),
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    return material
  }, [imageUrl])

  return (
    <mesh material={material}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default ImageWithDistortions

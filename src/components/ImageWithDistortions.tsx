import { useMemo } from "react"
import * as THREE from "three"
import { extend, ThreeEvent, useFrame } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"

// // Crazy picture
// import vertex from "../shaders/crazy-picture/vertex.glsl"
// import fragment from "../shaders/crazy-picture/fragment.glsl"

// Distorted image
import vertex from "../shaders/distorded-image/vertex.glsl"
import fragment from "../shaders/distorded-image/fragment.glsl"

const ImageDistortionsShaderMaterial = shaderMaterial(
  {
    uTime: 10,
    uClickPosition: new THREE.Vector2(0, 0),
  },
  vertex,
  fragment
)

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
        uTime: new THREE.Uniform(10),
        uClickPosition: new THREE.Uniform(new THREE.Vector2(0, 0)),
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    })
    return material
  }, [imageUrl])

  const clock = useMemo(() => {
    const c = new THREE.Clock(false)
    c.elapsedTime = 10

    return c
  }, [])

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    const uv = e.uv
    if (uv) {
      //  restart the clock
      clock.stop()
      // set the click position
      material.uniforms.uClickPosition.value.set(uv.x, uv.y)

      // restart the animation
      clock.start()
      // set the time to 0
      material.uniforms.uTime.value = 0
      // animate the time
    }
  }

  useFrame(() => {
    // update the time
    material.uniforms.uTime.value = clock.getElapsedTime()
  })

  return (
    <mesh material={material} onClick={(e) => handleClick(e)}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  )
}

export default ImageWithDistortions

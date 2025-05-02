import { Canvas } from "@react-three/fiber"

import ImageWithDistortions from "./components/ImageWithDistortions"

import "./Experience.css"

function Experience() {
  return (
    <div className="experience">
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 25 }}>
          <ImageWithDistortions imageUrl="/img/beach.png" />
        </Canvas>
      </div>
    </div>
  )
}
export default Experience

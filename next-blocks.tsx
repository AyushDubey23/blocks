"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useRef, useState, useEffect } from "react"
import * as THREE from "three"
import { ExternalLink, Linkedin, Instagram, Loader2 } from "lucide-react"

const isMobile = () => {
  if (typeof window === "undefined") return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

const BoxWithEdges = ({ position }) => {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshPhysicalMaterial
          color="#0070f3"
          roughness={0.1}
          metalness={0.8}
          transparent={true}
          opacity={0.9}
          transmission={0.5}
          clearcoat={1}
        />
      </mesh>
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(0.5, 0.5, 0.5)]} />
        <lineBasicMaterial color="#214dbd" linewidth={2} />
      </lineSegments>
    </group>
  )
}

const BoxLetter = ({ letter, position }) => {
  const group = useRef()

  const getLetterShape = (letter) => {
    const shapes = {
      A: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      Y: [
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
      ],
      U: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      S: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      H: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      D: [
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
      ],
      B: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
      ],
      E: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 1, 0],
        [1, 0, 0],
        [1, 1, 1],
      ],
    }
    return shapes[letter] || shapes["A"]
  }

  const letterShape = getLetterShape(letter)

  return (
    <group ref={group} position={position}>
      {letterShape.map((row, i) =>
        row.map((cell, j) => {
          if (cell) {
            let xOffset =
              j * 0.5 - (letter === "T" ? 1 : letter === "E" ? 0.5 : letter === "X" || letter === "N" ? 1 : 0.75)

            if (letter === "N") {
              if (j === 0) {
                xOffset = -0.5
              } else if (j === 1) {
                xOffset = 0
              } else if (j === 2) {
                xOffset = 0.25
              } else if (j === 3) {
                xOffset = 0.5
              } else if (j === 4) {
                xOffset = 1
              }
            }

            if (letter === "X") {
              if (j === 0) {
                xOffset = -1
              } else if (j === 1) {
                xOffset = -0.75
              } else if (j === 2) {
                xOffset = -0.25
              } else if (j === 3) {
                xOffset = 0.25
              } else if (j === 4) {
                xOffset = 0.5
              }
            }

            return <BoxWithEdges key={`${i}-${j}`} position={[xOffset, (4 - i) * 0.5 - 1, 0]} />
          }
          return null
        }),
      )}
    </group>
  )
}

const Scene = () => {
  const orbitControlsRef = useRef()
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  return (
    <>
      {/* First line: AYUSH */}
      <group position={[-1, 1.5, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="A" position={[-6, 0, 0]} />
        <BoxLetter letter="Y" position={[-3, 0, 0]} />
        <BoxLetter letter="U" position={[0, 0, 0]} />
        <BoxLetter letter="S" position={[3, 0, 0]} />
        <BoxLetter letter="H" position={[6, 0, 0]} />
      </group>

      {/* Second line: DUBEY */}
      <group position={[-1, -1.5, 0]} rotation={[0, Math.PI / 1.5, 0]}>
        <BoxLetter letter="D" position={[-6, 0, 0]} />
        <BoxLetter letter="U" position={[-3, 0, 0]} />
        <BoxLetter letter="B" position={[0, 0, 0]} />
        <BoxLetter letter="E" position={[3, 0, 0]} />
        <BoxLetter letter="Y" position={[6, 0, 0]} />
      </group>
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom
        enablePan
        enableRotate
        autoRotate
        autoRotateSpeed={2}
        rotation={[Math.PI, 0, 0]}
      />

      <ambientLight intensity={0.5} />

      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />

      <Environment
        files={
          isMobileDevice
            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download3-7FArHVIJTFszlXm2045mQDPzsZqAyo.jpg"
            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dither_it_M3_Drone_Shot_equirectangular-jpg_San_Francisco_Big_City_1287677938_12251179%20(1)-NY2qcmpjkyG6rDp1cPGIdX0bHk3hMR.jpg"
        }
        background
      />
    </>
  )
}

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="mb-8">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-2">AYUSH DUBEY</h1>
        </div>
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default function Component() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Set loaded to true immediately, no artificial delay
    setIsLoaded(true)
  }, [])

  return (
    <div className="w-full h-screen bg-gray-900 relative">
      {!isLoaded && (
        <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="mb-8">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white mb-2">AYUSH DUBEY</h1>
            </div>
            <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <Canvas camera={{ position: [10.047021, -0.127436, -11.137374], fov: 50 }}>
        <Scene />
      </Canvas>

      {/* Social Links Overlay */}
      <div className="absolute top-6 right-6 flex flex-col gap-4 z-10">
        <a
          href="https://ayushdubey23.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          <ExternalLink size={18} />
          <span className="text-sm font-medium">Portfolio</span>
        </a>

        <a
          href="https://www.linkedin.com/in/ayush-dubey-508196331/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          <Linkedin size={18} />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>

        <a
          href="https://www.instagram.com/ayushhdubey/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          <Instagram size={18} />
          <span className="text-sm font-medium">Instagram</span>
        </a>
      </div>

      {/* Name Label */}
      <div className="absolute bottom-6 left-6 z-10">
        <h1 className="text-white text-2xl font-bold tracking-wider">AYUSH DUBEY</h1>
        <p className="text-white/70 text-sm mt-1">Developer & Designer</p>
      </div>
    </div>
  )
}

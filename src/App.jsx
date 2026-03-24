import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'

// HARE-PONT 本体（3Dモデル）コンポーネント
function HarePontModel() {
  const { scene } = useGLTF('/tooth_model.glb')
  return (
    <group>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

export default function App() {
  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#ffffff', 
      fontFamily: '"Helvetica Neue", Arial, sans-serif',
      color: '#333' 
    }}>
      
      {/* ヘッダーロゴ：虫歯を連想させないメディカルブルーデザイン */}
      <div style={{ 
        position: 'absolute', top: 50, left: 50, zIndex: 10, pointerEvents: 'none' 
      }}>
        <h1 style={{ 
          margin: 0, 
          marginBottom: '16px', 
          fontSize: '3rem', 
          fontWeight: '900', 
          letterSpacing: '-0.02em',
          lineHeight: '1',
          color: '#0066cc' // 虫歯を連想させない、清潔なメディカルブルー
        }}>
          HARE-PONT
        </h1>
        <p style={{ 
          margin: 0, 
          color: '#aaa', 
          fontSize: '0.9rem', 
          fontWeight: '500', 
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Preventive Dental Bridge System
        </p>
      </div>

      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 40 }}>
        <color attach="background" args={['#ffffff']} />
        
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.4, blur: 2 }}>
            <HarePontModel />
          </Stage>
        </Suspense>

        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>

      {/* フッター */}
      <div style={{ 
        position: 'absolute', bottom: 40, width: '100%', textAlign: 'center', 
        color: '#ccc', fontSize: '0.75rem', letterSpacing: '0.05em' 
      }}>
        © 2026 HARE-PONT PROJECT. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}
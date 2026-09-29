import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage, useProgress, Html, Center } from '@react-three/drei'

// --- ローディング画面 ---
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div style={{ color: '#fff', fontSize: '0.8rem', letterSpacing: '0.1em', textAlign: 'center', width: '160px' }}>
        <div style={{ width: '100%', height: '2px', background: '#333', borderRadius: '1px', overflow: 'hidden', marginBottom: '8px' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#38bdf8', transition: '0.2s' }} />
        </div>
        LOADING 3D ASSET {Math.round(progress)}%
      </div>
    </Html>
  )
}

// --- 3Dモデル（Centerで確実にど真ん中へ固定） ---
function HarePontModel() {
  const { scene } = useGLTF('/tooth_model.glb')
  return (
    <Center top>
      <primitive object={scene} />
    </Center>
  )
}

export default function App() {
  const [showAbout, setShowAbout] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0a0b0e', overflow: 'hidden', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* 1. ヘッダー：プロダクトタイトル */}
      <header style={{
        position: 'absolute', top: 24, left: 24, zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '4px', pointerEvents: 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
            HARE-PONT
          </span>
          <span style={{ fontSize: '0.65rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.3)', fontWeight: '600' }}>
            v1.0 / Web3D
          </span>
        </div>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#888', letterSpacing: '0.05em' }}>
          PREVENTIVE DENTAL BRIDGE INTERACTION
        </p>
      </header>

      {/* 2. 右上アクションボタン */}
      <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
        <button
          onClick={() => setShowAbout(!showAbout)}
          style={{
            background: showAbout ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
            color: showAbout ? '#0a0b0e' : '#fff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: '600',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease'
          }}
        >
          {showAbout ? '✕ CLOSE' : 'INSIGHT & ABOUT ↗'}
        </button>
      </div>

      {/* 3. 3Dキャンバス（完全に中央固定） */}
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0b0e']} />
        
        <Suspense fallback={<Loader />}>
          <Stage
            environment="city"
            intensity={0.6}
            contactShadow={{ opacity: 0.6, blur: 2.5, color: '#000000' }}
            adjustCamera={1.6}
          >
            <HarePontModel />
          </Stage>
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      {/* 4. 操作ガイド（フッター） */}
      <div style={{
        position: 'absolute', bottom: 20, left: 0, width: '100%',
        textAlign: 'center', pointerEvents: 'none', zIndex: 5,
        display: 'flex', justifyContent: 'center', gap: '15px'
      }}>
        <span style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          • Drag to 360° Rotate
        </span>
        <span style={{ fontSize: '0.7rem', color: '#666', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          • Scroll to Zoom
        </span>
      </div>

      {/* 5. グラスモーダル（About & コンセプト解説パネル） */}
      {showAbout && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: isMobile ? '100%' : '440px',
          height: '100%',
          background: 'rgba(15, 18, 24, 0.88)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 20,
          overflowY: 'auto',
          padding: '36px 28px',
          boxSizing: 'border-box',
          color: '#e2e8f0',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.7rem', color: '#38bdf8', letterSpacing: '0.1em', fontWeight: 'bold' }}>PROJECT INSIGHT</span>
            <button
              onClick={() => setShowAbout(false)}
              style={{ background: 'transparent', border: 'none', color: '#999', fontSize: '1.2rem', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', lineHeight: '1.4', marginBottom: '16px', color: '#fff' }}>
            歯科現場の「不安」を「晴れ」に変える3Dインターフェース
          </h2>

          <p style={{ fontSize: '0.85rem', lineHeight: '1.8', color: '#94a3b8', marginBottom: '24px' }}>
            歯科現場における患者の心理的不安を解消するため、口腔内の3DアセットをWebブラウザ上で直感的にインタラクションできるシステムを開発。言葉や2Dの図解だけでは伝わらない患部の構造を自ら回転させて発見する体験へと昇華させました。
          </p>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#38bdf8', margin: '0 0 8px 0' }}>ネーミングの由来</h3>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
              <b>晴れ（HARE）</b>：歯の健康を守り患者の心を晴れやかに。<br />
              <b>ポンティック（Pontic）</b>：歯科業界用語の「架け橋（人工歯）」への敬意。
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '0.85rem', color: '#38bdf8', margin: '0 0 8px 0' }}>技術スタック</h3>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
              React / React Three Fiber / @react-three/drei / Three.js / Vite
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '16px', fontSize: '0.7rem', color: '#64748b', lineHeight: '1.6' }}>
            ※ 本システムは説明補助用のプロトタイプであり、医療機器としての診断・治療方針決定を行うものではありません。
          </div>
        </div>
      )}
    </div>
  )
}
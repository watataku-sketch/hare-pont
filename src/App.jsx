import React, { Suspense, useState, useEffect, useRef } from 'react'
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

// --- 3Dモデル ---
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
  const controlsRef = useRef()

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ズーム制御関数（プラスで拡大、マイナスで縮小）
  const handleZoomIn = () => {
    if (controlsRef.current) {
      const controls = controlsRef.current
      controls.dollyOut(1.2) // 拡大（カメラを近づける）
      controls.update()
    }
  }

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const controls = controlsRef.current
      controls.dollyIn(1.2) // 縮小（カメラを遠ざける）
      controls.update()
    }
  }

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset()
    }
  }

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

      {/* 3. 3Dキャンバス */}
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
          ref={controlsRef}
          makeDefault
          enablePan={false}
          minDistance={2.5}
          maxDistance={8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.6}
        />
      </Canvas>

      {/* ★ 4. 右下：ズーム＆リセット操作コントロール ★ */}
      <div style={{
        position: 'absolute', bottom: isMobile ? 60 : 30, right: 24, zIndex: 10,
        display: 'flex', flexDirection: 'column', gap: '8px'
      }}>
        <button
          onClick={handleZoomIn}
          title="拡大"
          style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: '0.2s'
          }}
        >
          ＋
        </button>
        <button
          onClick={handleZoomOut}
          title="縮小"
          style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: '0.2s'
          }}
        >
          －
        </button>
        <button
          onClick={handleReset}
          title="位置リセット"
          style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#888', fontSize: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', transition: '0.2s', fontWeight: 'bold'
          }}
        >
          RESET
        </button>
      </div>

      {/* 5. 下部操作ガイド文（マウスホイール・ピンチを明記） */}
      <div style={{
        position: 'absolute', bottom: 20, left: 0, width: '100%',
        textAlign: 'center', pointerEvents: 'none', zIndex: 5,
        display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', padding: '0 10px'
      }}>
        <span style={{ fontSize: '0.7rem', color: '#777', letterSpacing: '0.05em' }}>
          • ドラッグで360°回転
        </span>
        <span style={{ fontSize: '0.7rem', color: '#777', letterSpacing: '0.05em' }}>
          • マウスホイール / ピンチで拡大・縮小
        </span>
      </div>

      {/* 6. グラスモーダル（About & コンセプト解説パネル） */}
      {showAbout && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: isMobile ? '100%' : '440px',
          height: '100%',
          background: 'rgba(15, 18, 24, 0.92)',
          backdropFilter: 'blur(20px)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 20,
          overflowY: 'auto',
          padding: '36px 28px',
          boxSizing: 'border-box',
          color: '#e2e8f0'
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

          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', lineHeight: '1.5', marginBottom: '16px', color: '#fff' }}>
            言葉が届かないもどかしさを、<br />
            「見て触れる安心」へ変える3Dインターフェース
          </h2>

          {/* 開発背景・原体験 */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.75rem', color: '#38bdf8', letterSpacing: '0.08em', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
              Background & Vision
            </h3>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.8', color: '#cbd5e1', margin: 0 }}>
              開発のきっかけは、長年携わった在宅介護の現場でした。耳が遠くなった祖父に対し、訪問診療に来てくださる歯科医師や歯科衛生士の方々が、言葉だけで症状を伝える難しさに直面していました。
              <br /><br />
              「今、自分の口の中で何が起きているのか」が分からない恐怖は、患者を不安にさせます。「もし手元で直感的に動かし、拡大して確認できる3Dの架け橋があれば、祖父も納得して安心でき、医療従事者の負担も減らせたのではないか」。その切実な現場の課題意識から本システムを制作しました。
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '0.8rem', color: '#38bdf8', margin: '0 0 8px 0' }}>ネーミングの由来</h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
              <b>晴れ（HARE）</b>：病状の不安を晴らし、患者と家族の心を晴れやかに。<br />
              <b>ポンティック（Pontic）</b>：歯科の専門用語で「架け橋（人工歯）」を意味する言葉。患者と医療現場を繋ぐ架け橋となる願いを込めています。
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '12px', padding: '16px', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '0.8rem', color: '#38bdf8', margin: '0 0 8px 0' }}>技術スタック</h3>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>
              React / React Three Fiber / @react-three/drei / Three.js / Vite
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '14px', fontSize: '0.68rem', color: '#64748b', lineHeight: '1.6' }}>
            ※ 本システムは説明補助・相互理解のための試作したものであり、医療機器としての自動診断を行うものではありません。
          </div>
        </div>
      )}
    </div>
  )
}
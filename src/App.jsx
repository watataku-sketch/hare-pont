import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stage } from '@react-three/drei'

// --- 1. 3Dモデルコンポーネント ---
function HarePontModel() {
  const { scene } = useGLTF('/tooth_model.glb')
  return (
    <group>
      <primitive object={scene} scale={1.5} />
    </group>
  )
}

// --- 2. メインの3D表示画面 (MainViewer) ---
function MainViewer({ onAboutClick }) {
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#ffffff' }}>
      {/* ヘッダーロゴ */}
      <div style={{ position: 'absolute', top: 50, left: 50, zIndex: 10 }}>
        <h1 style={{ margin: 0, fontSize: '3.5rem', fontWeight: '900', color: '#0066cc', letterSpacing: '-0.05em' }}>
          ハレポン
        </h1>
      </div>

      {/* 右上：Aboutボタン */}
      <button 
        onClick={onAboutClick}
        style={{
          position: 'absolute', top: 50, right: 50, zIndex: 20,
          background: 'none', border: '1px solid #0066cc', color: '#0066cc',
          padding: '12px 24px', borderRadius: '30px', cursor: 'pointer',
          fontWeight: 'bold', fontSize: '1rem', transition: '0.3s'
        }}
        onMouseEnter={(e) => (e.target.style.background = '#f0f7ff')}
        onMouseLeave={(e) => (e.target.style.background = 'none')}
      >
        ハレポンとは？
      </button>

      {/* 3Dキャンバス */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 40 }}>
        <color attach="background" args={['#ffffff']} />
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5} contactShadow={{ opacity: 0.4, blur: 2 }}>
            <HarePontModel />
          </Stage>
        </Suspense>
        <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
      </Canvas>

      <div style={{ position: 'absolute', bottom: 40, width: '100%', textAlign: 'center', color: '#ccc', fontSize: '0.75rem' }}>
        © 2026 HARE-PONT PROJECT. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}
// --- 3. 説明ページ (AboutPage / LP) ---
function AboutPage({ onBackClick }) {
  // すべてのボックスで使い回す共通スタイル
  const commonBoxStyle = {
    maxWidth: '900px',
    margin: '0 auto 40px auto',
    padding: '60px 40px',
    background: '#f4f8ff', // すべてのセクションをこの「優しい薄い青」に統一
    borderRadius: '40px',
    textAlign: 'center',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ 
      width: '100vw', minHeight: '100vh', background: '#ffffff', 
      fontFamily: '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Meiryo", sans-serif',
      color: '#333', overflowY: 'auto', overflowX: 'hidden', paddingBottom: '100px'
    }}>
      {/* 固定閉じるボタン */}
      <button 
        onClick={onBackClick}
        style={{
          position: 'fixed', top: 30, right: 30, zIndex: 100,
          background: '#0066cc', color: 'white', border: 'none',
          padding: '10px 20px', borderRadius: '30px', cursor: 'pointer',
          fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,102,204,0.3)'
        }}
      >
        × 閉じる
      </button>

      {/* 1. Hero Section */}
      <div style={{ 
        padding: '140px 20px 80px 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%)', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.4', marginBottom: '24px', color: '#1a1a1a' }}>
          歯科現場の「不安」を「晴れ」に変える、<br/>世界で一つの架け橋。
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#0066cc', fontWeight: '600', letterSpacing: '0.1em' }}>
          Preventive Dental Bridge System（予防歯科・架け橋・システム）
        </p>
      </div>

      {/* 2. Origin Section */}
      <div style={commonBoxStyle}>
        <h2 style={{ fontSize: '1.8rem', color: '#0066cc', marginBottom: '40px' }}>ネーミングの由来</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {[
            { t: '晴れ（HARE）', d: '歯の健康を守り、患者様の心を晴れやかに。' },
            { t: 'ポンティック（Pontic）', d: '歯科業界用語の「架け橋」への敬意。' },
            { t: 'Pont / Pons', d: 'ラテン語で「橋」を意味する言葉。' }
          ].map((item, i) => (
            <div key={i} style={{ width: '240px', padding: '24px', background: 'white', borderRadius: '20px', boxShadow: '0 4px 12px rgba(0,102,204,0.05)' }}>
              <h3 style={{ color: '#0066cc', marginBottom: '12px', fontSize: '1.1rem' }}>{item.t}</h3>
              <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#666' }}>{item.d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '40px', fontSize: '1.3rem', fontWeight: 'bold', color: '#0066cc' }}>
          「ハレポン ＝ 不安を晴らす架け橋」
        </p>
      </div>

      {/* 3. Killer Experience Section (スタイルを統一！) */}
      <div style={{ ...commonBoxStyle, textAlign: 'left' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: '#0066cc', textAlign: 'center' }}>「自ら見つける」という、怖くて優しい体験。</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '36px', color: '#444' }}>
          ハレポンの3D操作は、患者様自身が患部をグリグリと回して<b>「自分で発見する」</b>体験を提供します。<br/>
          人から言われた正論ではなく、自分で触れて見た「事実」だからこそ、<b>「納得」という最高の救い</b>へと変わります。
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '280px', background: 'white', padding: '24px', borderRadius: '20px' }}>
            <h4 style={{ color: '#0066cc', marginBottom: '10px' }}>患者様にとって</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>「どこが悪いか」を直感。迷いが自発的な予防行動（通院・ケア）という確固たる意志に変わります。</p>
          </div>
          <div style={{ flex: '1', minWidth: '280px', background: 'white', padding: '24px', borderRadius: '20px' }}>
            <h4 style={{ color: '#0066cc', marginBottom: '10px' }}>医院様にとって</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>説明から「共感」へ。患者様のモチベーションが維持され、スタッフの負担軽減とリピート率向上を実現します。</p>
          </div>
        </div>
      </div>

      {/* 4. Features Section (ボックスに入れて統一！) */}
      <div style={commonBoxStyle}>
        <h2 style={{ fontSize: '1.8rem', color: '#0066cc', marginBottom: '40px' }}>直感に訴えかける機能</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ width: '300px', textAlign: 'left', background: 'white', padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ borderLeft: '5px solid #0066cc', paddingLeft: '15px', fontSize: '1.1rem', color: '#0066cc' }}>直感的な3D操作</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '10px' }}>自分の歯を自由に回転。空間的な自分事化を促し、深い納得感を生み出します。</p>
          </div>
          <div style={{ width: '300px', textAlign: 'left', background: 'white', padding: '24px', borderRadius: '20px' }}>
            <h3 style={{ borderLeft: '5px solid #0066cc', paddingLeft: '15px', fontSize: '1.1rem', color: '#0066cc' }}>悪い部分の表示</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '10px' }}>どこが虫歯なのかを3Dで再現。「放置する恐怖」を可視化し、早期通院の動機付けを強化します。</p>
          </div>
        </div>
      </div>

      {/* 5. Vision & Closing */}
      <div style={commonBoxStyle}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', color: '#0066cc' }}>「自分の歯」への理解が、<br/>クリニックの未来を変える</h2>
        <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '40px', fontSize: '0.95rem' }}>
          ハレポンは、三方がハレやかになるサイクルを目指します。<br/>
          重症化前に来院が増えることで、院内の空気までも明るく変えていく。
        </p>
        <h3 style={{ fontSize: '2.2rem', fontWeight: '900', color: '#0066cc' }}>予防して、晴れやかに。</h3>
        <p style={{ marginTop: '20px', color: '#888', fontSize: '0.85rem' }}>
          私たちは、歯科医療を「痛くなってから行く場所」から、<br/>
          「人生を晴れやかにするために行く場所」へアップデートします。
        </p>
      </div>
    </div>
  )
}
// --- 4. メインのAppコンポーネント ---
export default function App() {
  const [page, setPage] = useState('home');
  return (
    <>
      {page === 'home' ? (
        <MainViewer onAboutClick={() => setPage('about')} />
      ) : (
        <AboutPage onBackClick={() => setPage('home')} />
      )}
    </>
  )
}
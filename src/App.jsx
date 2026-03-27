import React, { Suspense, useState, useEffect } from 'react'
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
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 600);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#ffffff', overflow: 'hidden' }}>
      <div style={{ 
        position: 'absolute', top: isMobile ? 20 : 40, left: isMobile ? 15 : 40, 
        width: isMobile ? 'calc(100% - 30px)' : 'auto',
        display: 'flex', flexDirection: 'row', alignItems: 'center', 
        zIndex: 10, pointerEvents: 'none', gap: isMobile ? '10px' : '20px'
      }}>
        <h1 style={{ 
          margin: 0, fontSize: isMobile ? '1.7rem' : '3.5rem', 
          fontWeight: '900', color: '#0066cc', letterSpacing: '-0.05em', pointerEvents: 'auto'
        }}>
          ハレポン
        </h1>
        <button 
          onClick={onAboutClick}
          style={{
            background: 'white', border: '1px solid #0066cc', color: '#0066cc',
            padding: isMobile ? '6px 12px' : '12px 24px', borderRadius: '30px', 
            cursor: 'pointer', fontWeight: 'bold', fontSize: isMobile ? '0.7rem' : '1rem', 
            pointerEvents: 'auto', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', whiteSpace: 'nowrap'
          }}
        >
          ハレポンとは？
        </button>
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

      <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center', color: '#ccc', fontSize: '0.65rem' }}>
        © 2026 HARE-PONT PROJECT. ALL RIGHTS RESERVED.
      </div>
    </div>
  )
}

// --- 3. 説明ページ (AboutPage / LP) ---
function AboutPage({ onBackClick }) {
  // すべてのボックスで使い回す共通スタイル
  const commonBoxStyle = {
    width: '92%', maxWidth: '800px', margin: '0 auto 30px auto',
    padding: '40px 20px', background: '#f4f8ff', // すべてのセクションをこの「優しい薄い青」に統一
    borderRadius: '40px',
    textAlign: 'center', boxSizing: 'border-box'
  };

  return (
    <div style={{ 
      width: '100vw', minHeight: '100vh', background: '#ffffff', 
      fontFamily: 'sans-serif', color: '#333', overflowY: 'auto', paddingBottom: '60px'
    }}>
      {/* 固定閉じるボタン */}
      <div style={{ 
        position: 'sticky', top: 0, background: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(10px)', padding: '15px 20px', 
        display: 'flex', justifyContent: 'flex-end', zIndex: 100, borderBottom: '1px solid #f0f0f0'
      }}>
        <button onClick={onBackClick} style={{ background: '#0066cc', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}>
          × 閉じる
        </button>
      </div>

      {/* 1. Hero */}
      <div style={{ padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: '900', lineHeight: '1.4', marginBottom: '15px', color: '#1a1a1a' }}>
          歯科現場の「不安」を<br/>「晴れ」に変える、<br/>世界で一つの架け橋。
        </h1>
        <p style={{ fontSize: '0.9rem', color: '#0066cc', fontWeight: 'bold' }}>
          Preventive Dental Bridge System<br/>（予防歯科・架け橋・システム）
        </p>
      </div>

      {/* 2. Origin Section */}
      <div style={commonBoxStyle}>
        <h2 style={{ fontSize: '1.5rem', color: '#0066cc', marginBottom: '30px' }}>ネーミングの由来</h2>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '25px', fontWeight: 'bold' }}>HARE-PONT（ハレポン）に込めた想い</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            { t: '晴れ（HARE）', d: '歯の健康を守り、患者様の心を晴れやかに。' },
            { t: 'ポンティック（Pontic）', d: '歯科業界用語の「架け橋（人工歯）」への敬意。' },
            { t: 'Pont / Pons', d: 'ラテン語で「橋」を意味する言葉。' }
          ].map((item, i) => (
            <div key={i} style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,102,204,0.05)' }}>
              <h4 style={{ color: '#0066cc', margin: '0 0 8px 0', fontSize: '1.1rem' }}>{item.t}</h4>
              <p style={{ fontSize: '0.85rem', margin: 0, color: '#666', lineHeight: '1.5' }}>{item.d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '30px', fontSize: '1.2rem', fontWeight: 'bold', color: '#0066cc' }}>
          「ハレポン ＝ 不安を晴らす架け橋」
        </p>
      </div>

      {/* 3. Killer Experience Section (★背景色とテキスト色を統一修正！) ★ */}
      <div style={{ ...commonBoxStyle, textAlign: 'left' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#0066cc', marginBottom: '20px', textAlign: 'center' }}>「自ら見つける」という、<br/>怖くて優しい体験。</h2>
        <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: '30px', color: '#333' }}>
          ハレポンの3D操作は、患者様自身が患部をグリグリと回して<b>「自分で発見する」</b>体験を提供します。<br/><br/>
          人から言われた正論ではなく、自分で触れて見た「事実」だからこそ、<b>「納得」という最高の救い</b>へと変わります。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* カードも白背景に統一！ */}
          <div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,102,204,0.05)' }}>
            <h4 style={{ color: '#0066cc', margin: '0 0 8px 0' }}>患者様にとって</h4>
            <p style={{ fontSize: '0.85rem', margin: 0, color: '#666', lineHeight: '1.5' }}>「どこが悪いか」を直感。迷いが<b>「自発的な予防行動（通院・ケア）」</b>という確固たる意志に変わります。</p>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,102,204,0.05)' }}>
            <h4 style={{ color: '#0066cc', margin: '0 0 8px 0' }}>医院様にとって
            </h4>
            <p style={{ fontSize: '0.85rem', margin: 0, color: '#666', lineHeight: '1.5' }}>説明から「共感」へ。患者様のモチベーションが維持され、スタッフの負担軽減とリピート率向上を実現します。</p>
          </div>
        </div>
      </div>

      {/* 4. Features Section */}
      <div style={commonBoxStyle}>
        <h2 style={{ fontSize: '1.5rem', color: '#0066cc', marginBottom: '30px' }}>直感に訴えかける機能</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ textAlign: 'left', background: 'white', padding: '25px', borderRadius: '20px' }}>
            <h3 style={{ borderLeft: '5px solid #0066cc', paddingLeft: '15px', fontSize: '1.1rem', color: '#0066cc', margin: '0 0 10px 0' }}>直感的な3D操作</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6' }}>自分の歯を自由に回転。空間的な自分事化を促し、深い納得感を生み出します。</p>
          </div>
          <div style={{ textAlign: 'left', background: 'white', padding: '25px', borderRadius: '20px' }}>
            <h3 style={{ borderLeft: '5px solid #0066cc', paddingLeft: '15px', fontSize: '1.1rem', color: '#0066cc', margin: '0 0 10px 0' }}>悪い部分の表示</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', lineHeight: '1.6' }}>どこが虫歯なのかを3Dで再現。「放置する恐怖」を可視化し、早期通院の動機付けを強化します。（準備中の機能）</p>
          </div>
        </div>
      </div>

      {/* 5. Vision & Closing */}
      <div style={commonBoxStyle}>
        <h2 style={{ fontSize: '1.4rem', color: '#333', marginBottom: '20px', lineHeight: '1.4' }}>
          「自分の歯」への理解が、<br/>クリニックの未来を変える
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.7', marginBottom: '30px' }}>
          ハレポンは、三方がハレやかになるサイクルを目指します。<br/>
          重症化前に来院が増えることで、院内の空気までも明るく変えていく。
        </p>
        <h3 style={{ fontSize: '2.4rem', fontWeight: '900', color: '#0066cc', margin: '30px 0', lineHeight: '1.2' }}>
          <div style={{ marginBottom: '10px' }}>予防して、</div>
          <div>晴れやかに。</div>
        </h3>
        <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.7', maxWidth: '300px', margin: '0 auto' }}>
          私たちは、歯科医療を「痛くなってから行く場所」から、
          「人生を晴れやかにするために行く場所」へアップデートします。
        </p>
      </div>
    </div>
  )
}

// --- 4. メインのAppコンポーネント ---
export default function App() {
  const [page, setPage] = useState('home');
  useEffect(() => { window.scrollTo(0, 0); }, [page]);
  return <>{page === 'home' ? <MainViewer onAboutClick={() => setPage('about')} /> : <AboutPage onBackClick={() => setPage('home')} />}</>
}
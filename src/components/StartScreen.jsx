import { TOTAL_QUESTIONS } from '../data/questions.js'

export default function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="hero">
        <h1>发现真实的自己</h1>
        <p className="hero-sub">
          {TOTAL_QUESTIONS} 道题的 MBTI 精准人格测试，从四个维度深度剖析你的性格倾向，
          并提供详尽的人格描述。
        </p>
        <button className="btn-primary" onClick={onStart}>
          开始测试
        </button>
        <p className="hero-note">约需 15 分钟 · 请凭第一直觉作答</p>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <h3>📋 {TOTAL_QUESTIONS} 道题</h3>
          <p>四个维度各 32 题，正反表述各半，显著减少答题偏差，提高准确率。</p>
        </div>
        <div className="feature-card">
          <h3>📊 四维分析</h3>
          <p>外向/内向、实感/直觉、思考/情感、判断/感知，用量化百分比呈现倾向强度。</p>
        </div>
        <div className="feature-card">
          <h3>📖 详尽描述</h3>
          <p>16 种类型覆盖核心画像、优势短板、职业发展、恋爱人际与代表人物。</p>
        </div>
        <div className="feature-card">
          <h3>🔒 本地保存</h3>
          <p>测试历史保存在本机浏览器，随时回看你的变化轨迹，数据不外传。</p>
        </div>
      </div>
    </div>
  )
}

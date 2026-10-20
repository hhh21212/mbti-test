import { TYPES } from '../data/types.js'
import DimensionBars from './DimensionBars.jsx'
import RadarChart from './RadarChart.jsx'
import ResultShare from './ResultShare.jsx'

function Section({ title, children }) {
  return (
    <section className="result-section">
      <h3>{title}</h3>
      {children}
    </section>
  )
}

function List({ items }) {
  return (
    <ul className="result-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

export default function Result({ result, onRestart, onHistory }) {
  const meta = TYPES[result.type]
  if (!meta) return null

  return (
    <div className="result">
      <div className="result-header">
        <div className="result-type-badge">{result.type}</div>
        <h1 className="result-name">{meta.name}</h1>
        <p className="result-tagline">{meta.tagline}</p>
      </div>

      <div className="result-viz">
        <div className="viz-card">
          <h3 className="viz-title">维度倾向</h3>
          <DimensionBars result={result} />
        </div>
        <div className="viz-card">
          <h3 className="viz-title">倾向强度雷达</h3>
          <RadarChart result={result} />
        </div>
      </div>

      <ResultShare result={result} />

      <Section title="核心画像">
        <p className="result-overview">{meta.overview}</p>
      </Section>

      <Section title="优势与天赋">
        <List items={meta.strengths} />
      </Section>

      <Section title="短板与盲点">
        <List items={meta.weaknesses} />
      </Section>

      <Section title="职业与发展">
        <div className="career-block">
          <h4>适合的职业方向</h4>
          <div className="tag-list">
            {meta.career['适合职业'].map((job) => (
              <span className="tag" key={job}>
                {job}
              </span>
            ))}
          </div>
          <h4>工作风格</h4>
          <p>{meta.career['工作风格']}</p>
          <h4>成长建议</h4>
          <p>{meta.career['成长建议']}</p>
        </div>
      </Section>

      <Section title="恋爱与人际">
        <div className="relation-block">
          <p>
            <strong>感情观：</strong>
            {meta.relation['感情观']}
          </p>
          <p>
            <strong>相处模式：</strong>
            {meta.relation['相处模式']}
          </p>
          <p>
            <strong>社交风格：</strong>
            {meta.relation['社交风格']}
          </p>
        </div>
      </Section>

      <Section title="代表人物">
        <div className="tag-list">
          {meta['代表人物'].map((p) => (
            <span className="tag" key={p}>
              {p}
            </span>
          ))}
        </div>
      </Section>

      <div className="result-footer-actions">
        <button className="btn-primary" onClick={onRestart}>
          重新测试
        </button>
        <button className="btn-secondary" onClick={onHistory}>
          查看历史记录
        </button>
      </div>
    </div>
  )
}

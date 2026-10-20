import { DIMENSIONS } from '../data/dimensions.js'

export default function DimensionBars({ result }) {
  return (
    <div className="dim-bars">
      {DIMENSIONS.map((dim) => {
        const r = result.dimensionResults[dim.key]
        const leftActive = r.letter === dim.left.letter
        return (
          <div className="dim-bar" key={dim.key}>
            <div className="dim-bar-head">
              <span className={`dim-label ${leftActive ? 'active' : ''}`}>
                {dim.left.letter} · {dim.left.name}
              </span>
              <span className="dim-level">{r.level}倾向</span>
              <span className={`dim-label ${leftActive ? '' : 'active'}`}>
                {dim.right.name} · {dim.right.letter}
              </span>
            </div>
            <div className="bar-track" aria-hidden="true">
              <div className="bar-fill" style={{ width: `${r.leftPct}%` }} />
            </div>
            <div className="dim-bar-pct">
              <span>{r.leftPct}%</span>
              <span>{r.rightPct}%</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

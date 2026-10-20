import {
  Radar,
  RadarChart as RChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { DIMENSIONS } from '../data/dimensions.js'

// 4 轴雷达图：每轴代表一个维度，数值为该维度的倾向强度（0-100%）
export default function RadarChart({ result }) {
  const data = DIMENSIONS.map((dim) => {
    const r = result.dimensionResults[dim.key]
    const dominant = r.letter === dim.left.letter ? dim.left : dim.right
    return {
      dimension: `${dim.key} · ${r.letter}`,
      strength: r.strength,
      name: dominant.name,
    }
  })

  return (
    <div className="radar-wrap">
      <ResponsiveContainer width="100%" height={300}>
        <RChart data={data} cx="50%" cy="50%" outerRadius="72%">
          <PolarGrid stroke="var(--gridline)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: 'var(--text-secondary)', fontSize: 13 }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="倾向强度"
            dataKey="strength"
            stroke="var(--series-1)"
            fill="var(--series-1)"
            fillOpacity={0.32}
            strokeWidth={2}
            dot={{ r: 3, fill: 'var(--series-1)' }}
          />
          <Tooltip
            formatter={(value) => [`${value}%`, '倾向强度']}
            labelFormatter={(label) => data.find((d) => d.dimension === label)?.name ?? label}
            contentStyle={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: 'var(--text-primary)',
            }}
          />
        </RChart>
      </ResponsiveContainer>
    </div>
  )
}

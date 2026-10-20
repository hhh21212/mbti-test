import { useState } from 'react'
import { QUESTIONS, TOTAL_QUESTIONS } from '../data/questions.js'

// 5 点李克特量表
const SCALE = [
  { value: -2, label: '非常不同意' },
  { value: -1, label: '不同意' },
  { value: 0, label: '中立' },
  { value: 1, label: '同意' },
  { value: 2, label: '非常同意' },
]

function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function Quiz({ onFinish }) {
  const [order] = useState(() => shuffle(QUESTIONS))
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})

  const q = order[current]
  const answeredCount = Object.keys(answers).length
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100)
  const isLast = current === TOTAL_QUESTIONS - 1
  const currentAnswer = answers[q.id]

  const select = (value) => {
    setAnswers((a) => ({ ...a, [q.id]: value }))
  }

  const next = () => {
    if (!isLast) {
      setCurrent((c) => c + 1)
      return
    }
    const remaining = TOTAL_QUESTIONS - answeredCount
    if (remaining > 0) {
      alert(`还有 ${remaining} 题未作答，请完成后提交。`)
      return
    }
    onFinish(answers)
  }

  const prev = () => setCurrent((c) => Math.max(0, c - 1))

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="quiz-progress-meta">
          <span>
            第 <strong>{current + 1}</strong> / {TOTAL_QUESTIONS} 题
          </span>
          <span>已答 {answeredCount} 题</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="quiz-card">
        <h2 className="quiz-question">{q.text}</h2>
        <div className="quiz-scale" role="radiogroup" aria-label="选项">
          {SCALE.map((opt) => (
            <button
              key={opt.value}
              className={`scale-option ${currentAnswer === opt.value ? 'selected' : ''}`}
              onClick={() => select(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-nav">
        <button className="btn-secondary" onClick={prev} disabled={current === 0}>
          上一题
        </button>
        <button className="btn-primary" onClick={next}>
          {isLast ? '查看结果' : '下一题'}
        </button>
      </div>
    </div>
  )
}

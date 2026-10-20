import { useState } from 'react'
import { loadHistory, clearHistory } from '../utils/history.js'
import { TYPES } from '../data/types.js'

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate(),
    ).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  } catch {
    return iso
  }
}

export default function History({ onViewResult }) {
  const [list, setList] = useState(() => loadHistory())

  const handleClear = () => {
    if (confirm('确定要清空所有历史记录吗？')) {
      clearHistory()
      setList([])
    }
  }

  if (list.length === 0) {
    return (
      <div className="history-empty">
        <h2>暂无历史记录</h2>
        <p>完成一次测试后，结果会自动保存在这里。</p>
      </div>
    )
  }

  return (
    <div className="history">
      <div className="history-head">
        <h2>历史记录</h2>
        <button className="btn-secondary" onClick={handleClear}>
          清空记录
        </button>
      </div>
      <ul className="history-list">
        {list.map((entry, i) => {
          const meta = TYPES[entry.type]
          return (
            <li key={i}>
              <button className="history-item" onClick={() => onViewResult(entry)}>
                <span className="history-type">{entry.type}</span>
                <span className="history-name">{meta ? meta.name : ''}</span>
                <span className="history-date">{formatDate(entry.date)}</span>
                <span className="history-arrow">查看 →</span>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

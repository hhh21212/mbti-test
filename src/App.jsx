import { useState } from 'react'
import { scoreTest } from './utils/scoring.js'
import { saveHistory } from './utils/history.js'
import StartScreen from './components/StartScreen.jsx'
import Quiz from './components/Quiz.jsx'
import Result from './components/Result.jsx'
import History from './components/History.jsx'

export default function App() {
  const [view, setView] = useState('home') // 'home' | 'quiz' | 'result' | 'history'
  const [result, setResult] = useState(null)

  const handleFinish = (answers) => {
    const res = scoreTest(answers)
    setResult(res)
    saveHistory({
      type: res.type,
      dimensionResults: res.dimensionResults,
      date: new Date().toISOString(),
    })
    setView('result')
  }

  const handleViewHistoryResult = (entry) => {
    setResult({ type: entry.type, dimensionResults: entry.dimensionResults })
    setView('result')
  }

  return (
    <div className="app">
      <header className="app-header">
        <button className="brand" onClick={() => setView('home')}>
          MBTI 精准人格测试
        </button>
        <nav className="app-nav">
          <button className={view === 'home' || view === 'quiz' ? 'nav-active' : ''} onClick={() => setView('home')}>
            开始测试
          </button>
          <button className={view === 'history' ? 'nav-active' : ''} onClick={() => setView('history')}>
            历史记录
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === 'home' && <StartScreen onStart={() => setView('quiz')} />}
        {view === 'quiz' && <Quiz onFinish={handleFinish} />}
        {view === 'result' && result && (
          <Result
            result={result}
            onRestart={() => setView('home')}
            onHistory={() => setView('history')}
          />
        )}
        {view === 'history' && <History onViewResult={handleViewHistoryResult} />}
      </main>

      <footer className="app-footer">结果仅供自我探索参考，不构成任何心理诊断。</footer>
    </div>
  )
}

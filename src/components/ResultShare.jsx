import { useState } from 'react'
import { resultToText } from '../utils/scoring.js'
import { TYPES } from '../data/types.js'
import { DIMENSIONS } from '../data/dimensions.js'

// 生成结果卡片图片（Canvas → PNG 下载）
function buildCardCanvas(result) {
  const meta = TYPES[result.type]
  const W = 720
  const H = 900
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // 背景
  ctx.fillStyle = '#fcfcfb'
  ctx.fillRect(0, 0, W, H)

  // 顶部色块
  ctx.fillStyle = '#2a78d6'
  ctx.fillRect(0, 0, W, 120)
  ctx.fillStyle = '#ffffff'
  ctx.font = '600 30px system-ui, "Segoe UI", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('MBTI 人格测试', W / 2, 78)

  // 类型
  ctx.fillStyle = '#0b0b0b'
  ctx.font = '700 96px system-ui, "Segoe UI", sans-serif'
  ctx.fillText(result.type, W / 2, 220)
  ctx.fillStyle = '#52514e'
  ctx.font = '600 34px system-ui, "Segoe UI", sans-serif'
  ctx.fillText(meta.name, W / 2, 270)
  ctx.fillStyle = '#898781'
  ctx.font = '400 22px system-ui, "Segoe UI", sans-serif'
  ctx.fillText(meta.tagline, W / 2, 308)

  // 维度条
  const barTop = 360
  const barH = 40
  const gap = 70
  const leftX = 90
  const rightX = W - 90
  ctx.textAlign = 'left'
  ctx.font = '600 20px system-ui, "Segoe UI", sans-serif'
  DIMENSIONS.forEach((dim, i) => {
    const r = result.dimensionResults[dim.key]
    const y = barTop + i * gap

    ctx.fillStyle = '#0b0b0b'
    ctx.fillText(`${dim.key}`, leftX, y - 8)
    ctx.textAlign = 'right'
    ctx.fillText(`${r.letter}`, rightX, y - 8)
    ctx.textAlign = 'left'

    // 轨道
    ctx.fillStyle = '#e1e0d9'
    ctx.fillRect(leftX, y, rightX - leftX, barH)
    // 左占比填充
    ctx.fillStyle = '#2a78d6'
    ctx.fillRect(leftX, y, ((rightX - leftX) * r.leftPct) / 100, barH)

    ctx.fillStyle = '#52514e'
    ctx.font = '400 18px system-ui, "Segoe UI", sans-serif'
    ctx.fillText(`${r.leftPct}%`, leftX + 6, y + 26)
    ctx.textAlign = 'right'
    ctx.fillText(`${r.rightPct}%`, rightX - 6, y + 26)
    ctx.textAlign = 'left'
  })

  // 页脚
  ctx.fillStyle = '#898781'
  ctx.font = '400 18px system-ui, "Segoe UI", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('结果仅供自我探索参考', W / 2, H - 40)

  return canvas
}

function downloadCard(canvas) {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mbti-result.png'
    a.click()
    URL.revokeObjectURL(url)
  })
}

export default function ResultShare({ result }) {
  const [copied, setCopied] = useState(false)
  const [exported, setExported] = useState(false)

  const copyText = async () => {
    const meta = TYPES[result.type]
    const text = `${resultToText(result)}\n\n【${meta.name}】${meta.overview}`
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportImage = () => {
    downloadCard(buildCardCanvas(result))
    setExported(true)
    setTimeout(() => setExported(false), 2000)
  }

  return (
    <div className="result-actions">
      <button className="btn-secondary" onClick={copyText}>
        {copied ? '已复制 ✓' : '复制结果文字'}
      </button>
      <button className="btn-secondary" onClick={exportImage}>
        {exported ? '已导出 ✓' : '导出结果图片'}
      </button>
    </div>
  )
}

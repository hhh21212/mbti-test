import { QUESTIONS } from '../data/questions.js'
import { DIMENSIONS } from '../data/dimensions.js'

// 每个维度题目数 × 单题最大绝对值(+2) = 理论上限
const MAX_PER_DIM = 32 * 2

// answers: { [questionId]: -2..2 }（5 点量表：-2 非常不同意 … +2 非常同意）
export function scoreTest(answers) {
  const raw = { EI: 0, SN: 0, TF: 0, JP: 0 }
  const signCount = { EI: 0, SN: 0, TF: 0, JP: 0 } // 用于平局兜底：多数端

  for (const q of QUESTIONS) {
    const v = answers[q.id]
    if (v === undefined || v === null || v === 0) continue

    // left 为该维度前字母（E/S/T/J），right 为后字母（I/N/F/P）
    const dim = DIMENSIONS.find((d) => d.key === q.dimension)
    const isLeft = q.pole === dim.left.letter
    const contribution = isLeft ? v : -v

    raw[q.dimension] += contribution
    signCount[q.dimension] += Math.sign(contribution)
  }

  const dimensionResults = {}
  let type = ''

  for (const dim of DIMENSIONS) {
    const score = raw[dim.key]
    // 决定主导字母：>0 取 left，<0 取 right，==0 用多数端兜底
    let letter
    if (score > 0) letter = dim.left.letter
    else if (score < 0) letter = dim.right.letter
    else letter = signCount[dim.key] >= 0 ? dim.left.letter : dim.right.letter

    const strength = Math.round((Math.abs(score) / MAX_PER_DIM) * 100)
    // 双端百分比（以 left 为基准，50% 表示完全中性）
    const leftPct = Math.round(50 + (score / MAX_PER_DIM) * 50)
    const rightPct = 100 - leftPct

    const level = strength >= 66 ? '明确' : strength >= 33 ? '中等' : '轻微'

    dimensionResults[dim.key] = {
      key: dim.key,
      score,
      letter,
      strength,
      leftPct,
      rightPct,
      level,
      left: dim.left,
      right: dim.right,
    }

    type += letter
  }

  return { type, dimensionResults }
}

// 供分享/历史用：把结果序列化成简洁可读的字符串
export function resultToText(result) {
  const lines = [`你的 MBTI 类型：${result.type}`]
  for (const dim of DIMENSIONS) {
    const r = result.dimensionResults[dim.key]
    const dominant = r.letter === r.left.letter ? r.left.name : r.right.name
    lines.push(`${dim.key}：${r.letter}（${dominant}）${r.leftPct}% / ${r.rightPct}%（${r.level}倾向）`)
  }
  return lines.join('\n')
}

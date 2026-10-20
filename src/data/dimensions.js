// MBTI 四个维度的元信息
// 每个维度有两个字母端：left（前字母）与 right（后字母）
export const DIMENSIONS = [
  {
    key: 'EI',
    left: { letter: 'E', name: '外向', en: 'Extraversion', desc: '从外部世界与人际互动中获取能量' },
    right: { letter: 'I', name: '内向', en: 'Introversion', desc: '从独处与内心世界中获得能量' },
  },
  {
    key: 'SN',
    left: { letter: 'S', name: '实感', en: 'Sensing', desc: '关注具体事实、细节与当下现实' },
    right: { letter: 'N', name: '直觉', en: 'Intuition', desc: '关注抽象概念、可能性与未来远景' },
  },
  {
    key: 'TF',
    left: { letter: 'T', name: '思考', en: 'Thinking', desc: '依据逻辑与客观原则做决策' },
    right: { letter: 'F', name: '情感', en: 'Feeling', desc: '依据价值观与人际和谐做决策' },
  },
  {
    key: 'JP',
    left: { letter: 'J', name: '判断', en: 'Judging', desc: '喜欢有计划、有条理、果断收尾' },
    right: { letter: 'P', name: '感知', en: 'Perceiving', desc: '喜欢灵活、开放、随机应变' },
  },
]

// 维度 key → 元信息映射
export const DIMENSION_MAP = Object.fromEntries(DIMENSIONS.map((d) => [d.key, d]))

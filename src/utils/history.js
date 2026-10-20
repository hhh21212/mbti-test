const KEY = 'mbti-history'
const MAX = 20

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function saveHistory(entry) {
  const list = loadHistory()
  list.unshift(entry)
  if (list.length > MAX) list.length = MAX
  localStorage.setItem(KEY, JSON.stringify(list))
  return list
}

export function clearHistory() {
  localStorage.removeItem(KEY)
}

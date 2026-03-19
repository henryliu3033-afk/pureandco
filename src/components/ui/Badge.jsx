const BADGE_STYLES = {
  '熱銷':    { bg: 'var(--color-terra)', color: 'white' },
  '暢銷':    { bg: 'var(--color-terra)', color: 'white' },
  '新品':    { bg: 'var(--color-sage)', color: 'white' },
  '環保':    { bg: 'var(--color-sage-dark)', color: 'white' },
  '季節限定': { bg: 'var(--color-brown)', color: 'var(--color-cream)' },
  '限量':    { bg: 'var(--color-dark)', color: 'var(--color-cream)' },
  '低庫存':  { bg: '#D97706', color: 'white' },
  '送禮首選': { bg: 'var(--color-brown-light)', color: 'white' },
}

export default function Badge({ label, className = '' }) {
  if (!label) return null
  const style = BADGE_STYLES[label] || { bg: 'var(--color-cream-3)', color: 'var(--color-brown)' }
  return (
    <span
      className={`inline-block text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 ${className}`}
      style={{ background: style.bg, color: style.color }}
    >
      {label}
    </span>
  )
}

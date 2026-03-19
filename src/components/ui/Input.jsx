import { useState } from 'react'

export default function Input({ label, error, hint, className = '', ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-2)' }}>
          {label}
        </label>
      )}
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background:   'var(--color-cream)',
          border:       `1px solid ${error ? '#ef4444' : focused ? 'var(--color-brown)' : 'var(--color-border-2)'}`,
          color:        'var(--color-text)',
          padding:      '10px 14px',
          fontSize:     '14px',
          outline:      'none',
          transition:   'border-color 0.2s',
          width:        '100%',
          fontFamily:   'inherit',
        }}
        {...props}
      />
      {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
      {hint && !error && <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>{hint}</p>}
    </div>
  )
}

const VARIANTS = {
  primary:   'bg-[var(--color-brown)] text-[var(--color-cream)] hover:bg-[var(--color-brown-dark)] border border-[var(--color-brown)]',
  secondary: 'bg-[var(--color-cream-2)] text-[var(--color-brown)] hover:bg-[var(--color-cream-3)] border border-[var(--color-cream-3)]',
  outline:   'bg-transparent text-[var(--color-brown)] border border-[var(--color-brown)] hover:bg-[var(--color-brown)] hover:text-[var(--color-cream)]',
  sage:      'bg-[var(--color-sage)] text-white hover:bg-[var(--color-sage-dark)] border border-[var(--color-sage)]',
  ghost:     'bg-transparent text-[var(--color-text-2)] hover:text-[var(--color-brown)] border border-transparent hover:border-[var(--color-border)]',
  danger:    'bg-transparent text-red-500 border border-red-300 hover:bg-red-50',
}

const SIZES = {
  sm:   'px-4 py-1.5 text-xs',
  md:   'px-6 py-2.5 text-sm',
  lg:   'px-8 py-3.5 text-sm',
  xl:   'px-10 py-4 text-base',
  icon: 'p-2.5',
}

export default function Button({ variant = 'primary', size = 'md', className = '', children, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-sans font-medium tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

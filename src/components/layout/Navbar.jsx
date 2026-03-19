import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { useCartStore, cartCount } from '../../store/cart.store'
import { useAuthStore } from '../../store/auth.store'

const NAV_LINKS = [
  { to: '/shop', label: '商品' },
  { to: '/about', label: '關於我們' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const count = useCartStore(cartCount)
  const { isLoggedIn } = useAuthStore()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(250,246,240,0.97)' : 'var(--color-cream)',
          borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div
          className="container-page flex items-center justify-between"
          style={{ height: '64px' }}
        >
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span
              className="font-serif font-medium"
              style={{ fontSize: '20px', color: 'var(--color-brown)', letterSpacing: '0.05em' }}
            >
              Pure & Co.
            </span>
          </Link>

          {/* ── Center nav — desktop only ── */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-sm font-medium tracking-wider transition-colors hover-underline"
                style={{ color: location.pathname.startsWith(to) ? 'var(--color-brown)' : 'var(--color-text-2)' }}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* ── Right icons — always on the right ── */}
          <div className="flex items-center gap-5 flex-shrink-0">
            {/* Account — desktop only */}
            <Link
              to="/account"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium tracking-wider transition-colors"
              style={{ color: 'var(--color-text-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brown)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-2)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {isLoggedIn ? '帳號' : '登入'}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 text-sm font-medium tracking-wider transition-colors"
              style={{ color: 'var(--color-text-2)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-brown)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-2)')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="hidden md:inline">購物袋</span>
              {count > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center"
                  style={{ background: 'var(--color-terra)', color: 'white' }}
                >
                  {count}
                </span>
              )}
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="選單"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-[1.5px] transition-all duration-200 origin-center"
                  style={{
                    background: 'var(--color-brown)',
                    width: i === 1 ? '16px' : '22px',
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform:
                      i === 0 && menuOpen ? 'rotate(45deg) translate(4.5px, 4.5px)' :
                        i === 2 && menuOpen ? 'rotate(-45deg) translate(4.5px, -4.5px)' : 'none',
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden sticky top-16 z-40"
            style={{ background: 'var(--color-cream)', borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="container-page py-6 flex flex-col">
              {[
                ...NAV_LINKS,
                { to: '/account', label: isLoggedIn ? '我的帳號' : '登入 / 註冊' },
                { to: '/cart', label: `購物袋${count > 0 ? ` (${count})` : ''}` },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="py-4 text-base font-medium tracking-wider"
                  style={{ color: 'var(--color-text)', borderBottom: '1px solid var(--color-border)' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
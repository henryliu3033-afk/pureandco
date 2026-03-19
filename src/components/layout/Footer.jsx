import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-dark)', color: 'var(--color-cream-2)' }}>
      <div className="container-page py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-2">
            <span className="font-serif text-xl md:text-2xl block mb-3"
              style={{ color: 'var(--color-cream)', letterSpacing: '0.05em' }}>
              Pure & Co.
            </span>
            <p className="text-xs md:text-sm leading-relaxed max-w-xs mb-4"
              style={{ color: 'rgba(240,230,214,0.6)' }}>
              以最純粹的天然成分，手工製作每一塊皂。不含人工香精與防腐劑，讓皮膚回歸自然的呼吸。
            </p>
            <div className="flex gap-5">
              {['Instagram', 'Facebook', 'LINE'].map((s) => (
                <a key={s} href="#" className="text-xs font-medium tracking-wider transition-colors"
                  style={{ color: 'rgba(240,230,214,0.45)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cream)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,230,214,0.45)')}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: 'rgba(240,230,214,0.45)' }}>商品</p>
            <div className="flex flex-col gap-2.5">
              {['洗臉皂', '身體皂', '洗髮皂', '禮盒組', '季節限定'].map((c) => (
                <Link key={c} to={`/shop?category=${c}`} className="text-xs md:text-sm transition-colors"
                  style={{ color: 'rgba(240,230,214,0.65)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cream)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,230,214,0.65)')}>
                  {c}
                </Link>
              ))}
            </div>
          </div>

          {/* Info links */}
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: 'rgba(240,230,214,0.45)' }}>客服</p>
            <div className="flex flex-col gap-2.5">
              {[['關於我們', '/about'], ['貨運說明', '/'], ['退換貨', '/'], ['常見問題', '/'], ['聯絡我們', '/']].map(([label, to]) => (
                <Link key={label} to={to} className="text-xs md:text-sm transition-colors"
                  style={{ color: 'rgba(240,230,214,0.65)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-cream)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,230,214,0.65)')}>
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 md:pt-8 text-xs"
          style={{ borderTop: '1px solid rgba(240,230,214,0.1)', color: 'rgba(240,230,214,0.3)' }}>
          <span>© {new Date().getFullYear()} Pure & Co. All rights reserved.</span>
          <div className="flex gap-5">
            {['隱私政策', '服務條款'].map((t) => (
              <Link key={t} to="/" style={{ color: 'rgba(240,230,214,0.3)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(240,230,214,0.65)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(240,230,214,0.3)')}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

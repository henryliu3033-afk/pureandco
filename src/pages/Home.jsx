import { Link } from 'react-router'
import { motion } from 'motion/react'
import { getFeatured, PRODUCTS } from '../constants/products'
import ProductCard from '../components/product/ProductCard'
import Button from '../components/ui/Button'

const REVIEWS = [
  { name: 'Chloe W.', rating: 5, text: '薰衣草蜂蜜皂洗完真的不緊繃，已經回購三次了！包裝也非常有質感。' },
  { name: 'Marcus T.', rating: 5, text: '買來送媽媽的禮盒，她超喜歡。客服回覆很快，出貨速度也快。' },
  { name: 'Yuna L.', rating: 5, text: '用過很多品牌的手工皂，Pure & Co. 是真正讓我感受到天然成分差異的。' },
]

const FEATURES = [
  { icon: '🌿', title: '天然成分', desc: '100% 天然植物油脂，不含 SLS、防腐劑與人工色素' },
  { icon: '✋', title: '純手工製作', desc: '全程人工完成，保留最完整的天然甘油' },
  { icon: '🌱', title: '對環境友善', desc: '可生物分解配方，環保包裝，愛護皮膚也愛護地球' },
  { icon: '📦', title: '快速到貨', desc: '1–2 個工作天出貨，支援全台超商取貨' },
]

export default function Home() {
  const featured = getFeatured()
  const seasonal = PRODUCTS.filter((p) => p.category === '季節限定')

  return (
    <div className="page-enter">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'var(--color-cream-2)' }}>
        <div className="container-page py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            {/* Text */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="text-xs font-medium uppercase tracking-[0.3em] mb-4"
                style={{ color: 'var(--color-terra)' }}
              >
                Pure & Co. — 純粹手工皂
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif font-normal leading-[1.05] mb-5"
                style={{ fontSize: 'clamp(38px, 6vw, 76px)', color: 'var(--color-dark)' }}
              >
                回歸<br />
                <em style={{ color: 'var(--color-brown)' }}>自然純粹</em><br />
                的洗護
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm md:text-base leading-relaxed mb-7 max-w-md mx-auto md:mx-0"
                style={{ color: 'var(--color-text-2)' }}
              >
                以冷製工藝保留天然甘油，每一塊皂都是對皮膚的溫柔承諾。
                不含 SLS、無防腐劑，純粹來自大地的滋養。
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-3 justify-center md:justify-start"
              >
                <Link to="/shop"><Button size="lg">探索商品</Button></Link>
                <Link to="/about"><Button variant="outline" size="lg">我們的故事</Button></Link>
              </motion.div>
            </div>

            {/* Image grid */}
            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
              className="w-full md:w-1/2 grid grid-cols-2 gap-3 max-w-sm md:max-w-none mx-auto"
            >
              <img
                src="https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=500&q=80" alt=""
                className="w-full object-cover rounded-sm"
                style={{ aspectRatio: '3/4' }}
              />
              <div className="flex flex-col gap-3 pt-8">
                <img src="https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=400&q=80" alt=""
                  className="w-full object-cover rounded-sm" style={{ aspectRatio: '1/1' }} />
                <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&q=80" alt=""
                  className="w-full object-cover rounded-sm" style={{ aspectRatio: '1/1' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-cream)' }}>
        <div className="container-page">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center text-center gap-2 py-5 px-3"
              >
                <span className="text-2xl md:text-3xl">{f.icon}</span>
                <h3 className="font-serif text-sm md:text-base font-medium" style={{ color: 'var(--color-dark)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-3)' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="py-14 md:py-20 text-center" style={{ background: 'var(--color-cream-2)' }}>
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>精選商品</p>
          <h2 className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--color-dark)' }}>
            客戶最愛
          </h2>
          <div className="section-divider mb-8 md:mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
            {featured.slice(0, 3).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          <Link to="/shop"><Button variant="outline" size="lg">查看全部商品</Button></Link>
        </div>
      </section>

      {/* ── Brand story ── */}
      <section style={{ background: 'var(--color-dark)' }}>
        <div className="container-page py-14 md:py-20">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left order-2 md:order-1">
              <p className="text-xs font-medium uppercase tracking-[0.3em] mb-4" style={{ color: 'var(--color-terra-light)' }}>
                我們的故事
              </p>
              <h2 className="font-serif font-normal mb-4" style={{ fontSize: 'clamp(26px, 4vw, 48px)', color: 'var(--color-cream)', lineHeight: 1.15 }}>
                每一塊皂都承載著<br />
                <em style={{ color: 'var(--color-sage-light)' }}>我們對純粹的堅持</em>
              </h2>
              <p className="text-sm leading-relaxed mb-6 max-w-md mx-auto md:mx-0" style={{ color: 'rgba(240,230,214,0.7)' }}>
                從台灣小農採購天然植物油，以傳統冷製工藝保留最多天然甘油與養分。每一塊皂至少熟成四週，等待時間成就最好的質地。
              </p>
              <Link to="/about">
                <Button variant="outline" size="lg"
                  style={{ borderColor: 'rgba(240,230,214,0.4)', color: 'var(--color-cream)' }}>
                  了解更多
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80" alt="手工製皂"
                className="w-full object-cover" style={{ aspectRatio: '4/3', filter: 'brightness(0.75)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Seasonal ── */}
      <section className="py-14 md:py-20 text-center" style={{ background: 'var(--color-cream)' }}>
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>Limited Edition</p>
          <h2 className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(26px, 5vw, 42px)', color: 'var(--color-dark)' }}>季節限定</h2>
          <div className="section-divider mb-8 md:mb-10" />
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-2xl mx-auto">
            {seasonal.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-14 md:py-20 text-center" style={{ background: 'var(--color-cream-2)' }}>
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>顧客評價</p>
          <h2 className="font-serif font-normal mb-8 md:mb-10" style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--color-dark)' }}>
            他們這樣說
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {REVIEWS.map((r, i) => (
              <motion.div key={r.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 md:p-8"
                style={{ background: 'var(--color-cream)', border: '1px solid var(--color-border)' }}
              >
                <p className="text-xl mb-3" style={{ color: 'var(--color-terra)' }}>{'★'.repeat(r.rating)}</p>
                <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--color-text-2)' }}>"{r.text}"</p>
                <p className="text-xs font-medium tracking-wider" style={{ color: 'var(--color-text-3)' }}>{r.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-12 md:py-16 text-center" style={{ background: 'var(--color-brown)', color: 'var(--color-cream)' }}>
        <div className="container-page">
          <h2 className="font-serif font-normal mb-2" style={{ fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--color-cream)' }}>
            訂閱電子報
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgba(250,246,240,0.75)' }}>最新商品、限定優惠，第一時間送達信箱</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm sm:max-w-md mx-auto">
            <input
              type="email" placeholder="輸入您的 Email"
              className="flex-1 text-sm"
              style={{
                padding: '12px 16px',
                background: 'rgba(250,246,240,0.15)',
                border: '1px solid rgba(250,246,240,0.3)',
                color: 'var(--color-cream)',
                outline: 'none',
                fontFamily: 'inherit',
              }}
            />
            <Button variant="secondary" size="md"
              style={{ background: 'var(--color-cream)', color: 'var(--color-brown)', whiteSpace: 'nowrap' }}>
              訂閱
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

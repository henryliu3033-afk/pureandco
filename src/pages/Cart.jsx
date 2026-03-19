import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCartStore, cartSubtotal } from '../store/cart.store'
import Button from '../components/ui/Button'

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCartStore()
  const subtotal = useCartStore(cartSubtotal)

  if (items.length === 0) return (
    <div className="page-enter min-h-[60vh] flex flex-col items-center justify-center gap-5 text-center py-16 px-4">
      <div className="text-5xl opacity-30">🧼</div>
      <p className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--color-text-2)' }}>購物袋是空的</p>
      <p className="text-sm" style={{ color: 'var(--color-text-3)' }}>去探索我們的純天然手工皂吧！</p>
      <Link to="/shop"><Button size="lg">前往商品</Button></Link>
    </div>
  )

  return (
    <div className="page-enter">
      {/* Header */}
      <div className="py-10 md:py-12 text-center" style={{ background: 'var(--color-cream-2)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-page">
          <h1 className="font-serif font-normal" style={{ fontSize: 'clamp(28px, 4vw, 46px)', color: 'var(--color-dark)' }}>
            購物袋
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--color-text-3)' }}>
            {items.reduce((s, i) => s + i.qty, 0)} 件商品
          </p>
        </div>
      </div>

      <div className="container-page py-8 md:py-12">
        {/* Mobile: stacked; Desktop: grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-10">

          {/* Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div key={item.id}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="flex gap-4 py-5"
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img src={item.image} alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover"
                      style={{ background: 'var(--color-cream-2)' }} />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-serif text-sm md:text-base font-medium leading-tight"
                          style={{ color: 'var(--color-dark)' }}>{item.name}</h3>
                      </Link>
                      <button onClick={() => removeItem(item.id)}
                        className="text-xl leading-none flex-shrink-0 transition-colors hover:text-red-400"
                        style={{ color: 'var(--color-text-3)' }}>
                        ×
                      </button>
                    </div>
                    <p className="text-xs mb-1" style={{ color: 'var(--color-text-3)' }}>
                      {item.category} · {item.weight}
                    </p>
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--color-brown)' }}>
                      NT${item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center" style={{ border: '1px solid var(--color-border-2)', display: 'inline-flex' }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          className="px-3 py-1.5 text-sm transition-colors hover:bg-[var(--color-cream-2)]"
                          style={{ color: 'var(--color-text-2)' }}>−</button>
                        <span className="px-3 text-sm" style={{ color: 'var(--color-text)' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          className="px-3 py-1.5 text-sm transition-colors hover:bg-[var(--color-cream-2)]"
                          style={{ color: 'var(--color-text-2)' }}>+</button>
                      </div>
                      {/* Subtotal */}
                      <p className="font-serif text-base md:text-lg" style={{ color: 'var(--color-brown)' }}>
                        NT${(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button onClick={clearCart}
              className="mt-4 text-xs transition-colors hover:text-red-400"
              style={{ color: 'var(--color-text-3)' }}>
              清空購物袋
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="p-5 md:p-6" style={{ background: 'var(--color-cream-2)', border: '1px solid var(--color-border)' }}>
              <h2 className="font-serif text-xl mb-5" style={{ color: 'var(--color-dark)' }}>訂單摘要</h2>

              <div className="flex flex-col gap-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-2)' }}>商品小計</span>
                  <span style={{ color: 'var(--color-text)' }}>NT${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: 'var(--color-text-2)' }}>運費</span>
                  <span style={{ color: 'var(--color-sage)' }}>結帳時選擇</span>
                </div>
              </div>

              <div className="flex justify-between py-4 mb-5 font-medium"
                style={{ borderTop: '1px solid var(--color-border-2)', borderBottom: '1px solid var(--color-border-2)' }}>
                <span style={{ color: 'var(--color-dark)' }}>小計</span>
                <span className="font-serif text-xl" style={{ color: 'var(--color-brown)' }}>NT${subtotal.toLocaleString()}</span>
              </div>

              {/* Free shipping hint */}
              <p className="text-xs mb-5 text-center py-2 px-3"
                style={{ background: subtotal >= 1200 ? 'rgba(122,158,126,0.12)' : 'var(--color-cream-3)', color: 'var(--color-sage-dark)' }}>
                {subtotal >= 1200 ? '✓ 已達標準宅配免運資格' : `再消費 NT${(1200 - subtotal).toLocaleString()} 享宅配免運`}
              </p>

              <Link to="/checkout" className="block">
                <Button size="xl" className="w-full justify-center">前往結帳</Button>
              </Link>
              <Link to="/shop"
                className="block text-center mt-3 text-xs transition-colors hover:text-[var(--color-brown)]"
                style={{ color: 'var(--color-text-3)' }}>
                ← 繼續購物
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

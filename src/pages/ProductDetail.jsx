import { useState } from 'react'
import { useParams, Link } from 'react-router'
import { motion } from 'motion/react'
import { getById, getRelated } from '../constants/products'
import { useCartStore } from '../store/cart.store'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProductCard from '../components/product/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const product  = getById(id)
  const addItem  = useCartStore((s) => s.addItem)
  const [qty,       setQty]   = useState(1)
  const [added,     setAdded] = useState(false)
  const [activeImg, setImg]   = useState(0)

  if (!product) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 py-16">
      <p className="font-serif text-2xl" style={{ color: 'var(--color-text-3)' }}>找不到商品</p>
      <Link to="/shop"><Button>回到商品列表</Button></Link>
    </div>
  )

  const related = getRelated(id, 4)

  const handleAdd = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="page-enter">
      {/* Breadcrumb */}
      <div className="container-page py-4">
        <nav className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-3)' }}>
          <Link to="/" className="transition-colors hover:text-[var(--color-brown)]">首頁</Link>
          <span>/</span>
          <Link to="/shop" className="transition-colors hover:text-[var(--color-brown)]">商品</Link>
          <span>/</span>
          <span className="truncate max-w-[120px] md:max-w-none" style={{ color: 'var(--color-text-2)' }}>{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <div className="container-page pb-12 md:pb-16">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Images */}
          <div className="w-full">
            <div className="overflow-hidden" style={{ aspectRatio: '1/1', background: 'var(--color-cream-2)' }}>
              <img src={product.images[activeImg] || product.image} alt={product.name}
                className="w-full h-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setImg(i)} className="flex-shrink-0"
                    style={{
                      width: '64px', aspectRatio: '1/1', overflow: 'hidden',
                      border: `2px solid ${activeImg === i ? 'var(--color-brown)' : 'transparent'}`,
                    }}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-3">
              <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-terra)' }}>
                {product.category}
              </p>
              {product.badge && <Badge label={product.badge} />}
            </div>

            <h1 className="font-serif font-normal mb-1 leading-tight"
              style={{ fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--color-dark)' }}>
              {product.name}
            </h1>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-3)' }}>{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-4">
              <span style={{ color: 'var(--color-terra)' }}>{'★'.repeat(Math.round(product.rating))}</span>
              <span className="text-xs" style={{ color: 'var(--color-text-3)' }}>
                {product.rating} · {product.reviewCount} 則評論
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-serif text-2xl md:text-3xl" style={{ color: 'var(--color-brown)' }}>
                NT${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through" style={{ color: 'var(--color-text-3)' }}>
                  NT${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs" style={{ color: 'var(--color-text-3)' }}>/ {product.weight}</span>
            </div>

            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--color-text-2)' }}>
              {product.description}
            </p>

            {/* Features */}
            {product.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {product.features.map((f) => (
                  <span key={f} className="text-xs px-3 py-1.5 font-medium"
                    style={{ background: 'var(--color-cream-2)', color: 'var(--color-brown)', border: '1px solid var(--color-border)' }}>
                    {f}
                  </span>
                ))}
              </div>
            )}

            {/* Qty + Add */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center" style={{ border: '1px solid var(--color-border-2)' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-base transition-colors hover:bg-[var(--color-cream-2)]"
                  style={{ color: 'var(--color-text-2)' }}>−</button>
                <span className="px-5 text-sm font-medium" style={{ color: 'var(--color-text)' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 text-base transition-colors hover:bg-[var(--color-cream-2)]"
                  style={{ color: 'var(--color-text-2)' }}>+</button>
              </div>
              <Button size="lg" onClick={handleAdd} className="flex-1 justify-center"
                style={added ? { background: 'var(--color-sage)', borderColor: 'var(--color-sage)' } : {}}>
                {added ? '✓ 已加入' : '加入購物袋'}
              </Button>
            </div>

            {/* Stock */}
            <p className="text-xs mb-5" style={{ color: product.stock < 20 ? '#D97706' : 'var(--color-text-3)' }}>
              {product.stock < 20 ? `⚠ 僅剩 ${product.stock} 件` : `庫存充足 (${product.stock} 件)`}
            </p>

            {/* Ingredients */}
            {product.ingredients.length > 0 && (
              <div className="pt-5" style={{ borderTop: '1px solid var(--color-border)' }}>
                <p className="text-xs font-medium uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-3)' }}>
                  主要成分
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="text-xs px-2.5 py-1"
                      style={{ background: 'var(--color-cream-2)', color: 'var(--color-text-2)' }}>
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Related */}
      <section className="py-12 md:py-16" style={{ background: 'var(--color-cream-2)' }}>
        <div className="container-page text-center">
          <h2 className="font-serif font-normal mb-8" style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', color: 'var(--color-dark)' }}>
            你可能也喜歡
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  )
}

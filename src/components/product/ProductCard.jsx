import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import Badge from '../ui/Badge'
import { useCartStore } from '../../store/cart.store'

export default function ProductCard({ product, index = 0 }) {
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = (e) => {
    e.preventDefault()
    addItem(product, 1)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Image wrapper */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '3/4', background: 'var(--color-cream-2)' }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5">
              <Badge label={product.badge} />
            </div>
          )}

          {/* Add to cart — slide up on hover (desktop); always visible tap on mobile */}
          <button
            onClick={handleAdd}
            className="absolute bottom-0 left-0 right-0 py-3 text-xs font-medium uppercase tracking-widest transition-all duration-300
              md:translate-y-full md:group-hover:translate-y-0"
            style={{
              background: added ? 'rgba(122,158,126,0.92)' : 'rgba(61,43,31,0.88)',
              color: 'var(--color-cream)',
            }}
          >
            {added ? '✓ 已加入' : '加入購物袋'}
          </button>
        </div>

        {/* Info */}
        <div className="pt-3 text-center">
          <p className="text-[10px] md:text-xs font-medium tracking-wider mb-0.5" style={{ color: 'var(--color-text-3)' }}>
            {product.category}
          </p>
          <h3 className="font-serif text-sm md:text-base font-medium leading-snug mb-0.5"
            style={{ color: 'var(--color-text)' }}>
            {product.name}
          </h3>
          <p className="text-[10px] md:text-xs mb-1.5" style={{ color: 'var(--color-text-3)' }}>
            {product.subtitle}
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <span className="font-sans text-sm font-medium" style={{ color: 'var(--color-brown)' }}>
              NT${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through" style={{ color: 'var(--color-text-3)' }}>
                NT${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

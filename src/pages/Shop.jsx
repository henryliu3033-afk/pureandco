import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { PRODUCTS, CATEGORIES } from '../constants/products'
import ProductCard from '../components/product/ProductCard'

const SORT_OPTIONS = [
  { value: 'default',    label: '預設排序' },
  { value: 'price-asc',  label: '價格：低→高' },
  { value: 'price-desc', label: '價格：高→低' },
  { value: 'rating',     label: '評分最高' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('default')
  const activeCategory = searchParams.get('category') || '全部'

  const setCategory = (cat) => {
    if (cat === '全部') setSearchParams({})
    else setSearchParams({ category: cat })
  }

  const filtered = useMemo(() => {
    let list = activeCategory === '全部' ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)
    if (sort === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating)
    return list
  }, [activeCategory, sort])

  return (
    <div className="page-enter">
      {/* Page header */}
      <div className="py-10 md:py-14 text-center" style={{ background: 'var(--color-cream-2)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.3em] mb-2" style={{ color: 'var(--color-terra)' }}>Shop</p>
          <h1 className="font-serif font-normal" style={{ fontSize: 'clamp(30px, 5vw, 52px)', color: 'var(--color-dark)' }}>
            全部商品
          </h1>
        </div>
      </div>

      <div className="container-page py-8 md:py-10">
        {/* Filter + Sort */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Category pills — scrollable on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="flex-shrink-0 px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all"
                style={{
                  background:  activeCategory === cat ? 'var(--color-brown)' : 'transparent',
                  color:       activeCategory === cat ? 'var(--color-cream)' : 'var(--color-text-2)',
                  border:      '1px solid',
                  borderColor: activeCategory === cat ? 'var(--color-brown)' : 'var(--color-border-2)',
                  whiteSpace:  'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort — right aligned */}
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>{filtered.length} 件商品</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-xs font-medium px-3 py-2 outline-none cursor-pointer"
              style={{
                background: 'var(--color-cream)',
                border: '1px solid var(--color-border-2)',
                color: 'var(--color-text-2)',
                fontFamily: 'inherit',
              }}
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid — 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-2xl" style={{ color: 'var(--color-text-3)' }}>暫無商品</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}

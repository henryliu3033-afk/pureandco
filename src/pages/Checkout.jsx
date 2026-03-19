import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useCartStore, cartSubtotal } from '../store/cart.store'
import { useAuthStore } from '../store/auth.store'
import { SHIPPING_OPTIONS } from '../constants/products'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

function StepIndicator({ step }) {
  const steps = ['收件資訊', '貨運方式', '確認訂單']
  return (
    <div className="flex items-center justify-center gap-0 mb-8 md:mb-12">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all"
              style={{
                background: step > i + 1 ? 'var(--color-sage)' : step === i + 1 ? 'var(--color-brown)' : 'transparent',
                color:      step >= i + 1 ? 'white' : 'var(--color-text-3)',
                border:     step < i + 1 ? '1px solid var(--color-border-2)' : 'none',
              }}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className="text-[10px] md:text-[11px] font-medium whitespace-nowrap"
              style={{ color: step === i + 1 ? 'var(--color-brown)' : 'var(--color-text-3)' }}>
              {s}
            </span>
          </div>
          {i < 2 && (
            <div className="w-10 md:w-16 h-px mx-1.5 mb-5"
              style={{ background: step > i + 1 ? 'var(--color-sage)' : 'var(--color-border-2)' }} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function Checkout() {
  const { items, clearCart } = useCartStore()
  const subtotal = useCartStore(cartSubtotal)
  const { placeOrder, user } = useAuthStore()
  const navigate = useNavigate()

  const [step, setStep]   = useState(1)
  const [order, setOrder] = useState(null)
  const [selectedShipping, setShipping] = useState(SHIPPING_OPTIONS[0].id)
  const [form, setForm] = useState({
    name: user?.name || '', email: user?.email || '', phone: '',
    address: '', city: '', zipcode: '', note: '', storeName: '',
  })
  const [errors, setErrors] = useState({})

  if (items.length === 0 && !order) return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center gap-5 py-16 px-4">
      <p className="font-serif text-2xl" style={{ color: 'var(--color-text-3)' }}>購物袋是空的</p>
      <Link to="/shop"><Button>前往商品</Button></Link>
    </div>
  )

  const shipping    = SHIPPING_OPTIONS.find((s) => s.id === selectedShipping)
  const shippingFee = subtotal >= shipping.freeOver ? 0 : shipping.fee
  const total       = subtotal + shippingFee
  const isHome      = selectedShipping === 'home_std' || selectedShipping === 'international'

  const validateStep1 = () => {
    const e = {}
    if (!form.name)  e.name  = '請填寫姓名'
    if (!form.email) e.email = '請填寫 Email'
    if (!form.phone) e.phone = '請填寫電話'
    if (isHome) {
      if (!form.address) e.address = '請填寫地址'
      if (!form.city)    e.city    = '請填寫城市'
    } else {
      if (!form.storeName) e.storeName = '請填寫取貨門市'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmitOrder = () => {
    const placed = placeOrder(items, shipping, form, total)
    clearCart()
    setOrder(placed)
    setStep(3)
    window.scrollTo(0, 0)
  }

  // Success
  if (step === 3 && order) return (
    <div className="page-enter container-page py-16 md:py-24 text-center">
      <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180 }}
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
        style={{ background: 'var(--color-sage)', color: 'white' }}>
        ✓
      </motion.div>
      <h1 className="font-serif font-normal mb-3" style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--color-dark)' }}>
        訂單成立！
      </h1>
      <p className="text-sm mb-1" style={{ color: 'var(--color-text-2)' }}>
        訂單編號：<span className="font-medium" style={{ color: 'var(--color-brown)' }}>{order.id}</span>
      </p>
      <p className="text-sm mb-8" style={{ color: 'var(--color-text-3)' }}>
        確認信已寄送至 {form.email}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/account"><Button size="lg">查看訂單</Button></Link>
        <Link to="/shop"><Button variant="outline" size="lg">繼續購物</Button></Link>
      </div>
    </div>
  )

  return (
    <div className="page-enter">
      <div className="py-10 md:py-12 text-center" style={{ background: 'var(--color-cream-2)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-page">
          <h1 className="font-serif font-normal" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--color-dark)' }}>
            結帳
          </h1>
        </div>
      </div>

      <div className="container-page py-8 md:py-10">
        <div className="max-w-3xl mx-auto">
          <StepIndicator step={step} />

          {/* Mobile: summary first; Desktop: side by side */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-8 lg:gap-10">

            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div key="step1"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    className="flex flex-col gap-4">
                    <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-text-3)' }}>
                      01 — 聯絡資訊
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input label="姓名" required placeholder="王小明"
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} />
                      <Input label="Email" type="email" required placeholder="you@example.com"
                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} />
                    </div>
                    <Input label="手機號碼" type="tel" required placeholder="09XX-XXX-XXX"
                      value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} />

                    {/* Shipping type preview */}
                    <div className="flex flex-col gap-2">
                      <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--color-text-3)' }}>
                        配送方式
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SHIPPING_OPTIONS.map((opt) => (
                          <button key={opt.id} onClick={() => setShipping(opt.id)}
                            className="px-3 py-1.5 text-xs font-medium transition-all"
                            style={{
                              border: `1px solid ${selectedShipping === opt.id ? 'var(--color-brown)' : 'var(--color-border-2)'}`,
                              background: selectedShipping === opt.id ? 'rgba(139,94,60,0.06)' : 'transparent',
                              color: selectedShipping === opt.id ? 'var(--color-brown)' : 'var(--color-text-2)',
                            }}>
                            {opt.icon} {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {isHome ? (
                      <>
                        <Input label="地址" required placeholder="台北市信義區忠孝東路100號"
                          value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} error={errors.address} />
                        <div className="grid grid-cols-2 gap-3">
                          <Input label="城市/縣市" required placeholder="台北市"
                            value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={errors.city} />
                          <Input label="郵遞區號" placeholder="110"
                            value={form.zipcode} onChange={(e) => setForm({ ...form, zipcode: e.target.value })} />
                        </div>
                        {selectedShipping === 'international' && (
                          <Input label="國家" placeholder="Taiwan"
                            value={form.country || ''} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                        )}
                      </>
                    ) : (
                      <Input label="取貨門市名稱" required placeholder="例：台北市信義區 7-11 信義門市"
                        value={form.storeName} onChange={(e) => setForm({ ...form, storeName: e.target.value })} error={errors.storeName} />
                    )}

                    <Input label="訂單備注（選填）" placeholder="如有特殊需求請填寫"
                      value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />

                    <Button size="lg" className="w-full mt-1"
                      onClick={() => { if (validateStep1()) { setStep(2); window.scrollTo(0, 0) } }}>
                      下一步：確認運費 →
                    </Button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2"
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                    className="flex flex-col gap-4">
                    <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'var(--color-text-3)' }}>
                      02 — 貨運方式
                    </p>
                    {SHIPPING_OPTIONS.map((opt) => (
                      <label key={opt.id}
                        className="flex items-start gap-4 p-4 cursor-pointer transition-all"
                        style={{
                          border: `1.5px solid ${selectedShipping === opt.id ? 'var(--color-brown)' : 'var(--color-border-2)'}`,
                          background: selectedShipping === opt.id ? 'rgba(139,94,60,0.04)' : 'transparent',
                        }}
                        onClick={() => setShipping(opt.id)}>
                        <input type="radio" name="shipping" value={opt.id} checked={selectedShipping === opt.id}
                          onChange={() => setShipping(opt.id)} className="mt-0.5 flex-shrink-0 accent-[var(--color-brown)]" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <p className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>
                              {opt.icon} {opt.label}
                            </p>
                            <p className="text-sm font-medium" style={{ color: 'var(--color-brown)' }}>
                              {subtotal >= opt.freeOver
                                ? <span style={{ color: 'var(--color-sage-dark)' }}>免運</span>
                                : `NT$${opt.fee}`}
                            </p>
                          </div>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-3)' }}>{opt.desc}</p>
                          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-3)' }}>
                            預計 {opt.days} · 滿 NT${opt.freeOver.toLocaleString()} 免運
                          </p>
                        </div>
                      </label>
                    ))}

                    <div className="flex gap-3 mt-2">
                      <Button variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>← 返回</Button>
                      <Button size="lg" className="flex-1" onClick={handleSubmitOrder}>確認下單 →</Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Summary sidebar */}
            <div className="lg:col-span-2">
              <div className="p-4 md:p-5 lg:sticky lg:top-24"
                style={{ background: 'var(--color-cream-2)', border: '1px solid var(--color-border)' }}>
                <h2 className="font-serif text-base md:text-lg mb-4" style={{ color: 'var(--color-dark)' }}>
                  訂單摘要
                </h2>
                <div className="flex flex-col gap-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2.5">
                      <div className="relative flex-shrink-0">
                        <img src={item.image} alt={item.name}
                          className="w-11 h-11 object-cover"
                          style={{ background: 'var(--color-cream-3)' }} />
                        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] flex items-center justify-center"
                          style={{ background: 'var(--color-brown)', color: 'white' }}>{item.qty}</span>
                      </div>
                      <span className="text-xs flex-1 min-w-0 truncate" style={{ color: 'var(--color-text)' }}>{item.name}</span>
                      <span className="text-xs font-medium flex-shrink-0" style={{ color: 'var(--color-brown)' }}>
                        NT${(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 flex flex-col gap-2" style={{ borderTop: '1px solid var(--color-border-2)' }}>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--color-text-2)' }}>小計</span>
                    <span>NT${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: 'var(--color-text-2)' }}>運費</span>
                    <span style={{ color: shippingFee === 0 ? 'var(--color-sage-dark)' : 'var(--color-text)' }}>
                      {shippingFee === 0 ? '免運' : `NT$${shippingFee}`}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-3 mt-2"
                  style={{ borderTop: '1px solid var(--color-border-2)' }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-dark)' }}>合計</span>
                  <span className="font-serif text-lg md:text-xl" style={{ color: 'var(--color-brown)' }}>
                    NT${total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

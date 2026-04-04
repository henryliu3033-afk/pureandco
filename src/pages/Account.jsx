import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAuthStore } from '../store/auth.store'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { Link } from 'react-router'

function AuthForm({ onLogin, onRegister }) {
  const [tab, setTab]     = useState('login')
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoad] = useState(false)
  const f = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) })

  const handleSubmit = async (e) => {
  e.preventDefault()
  if (!form.email || !form.password) { setError('請填寫所有必填欄位'); return }
  if (tab === 'register' && form.password !== form.confirm) { setError('兩次密碼不符'); return }
  setLoad(true)

  let result
  if (tab === 'login') result = await onLogin(form.email, form.password)
  else result = await onRegister(form.name, form.email, form.password)

  // store 裡如果有 error 就顯示
  if (result?.message && result.message !== '登入成功' && result.message !== 'Member created successfully') {
    setError(result.message)
  }
  setLoad(false)
}

  return (
    <div className="max-w-sm mx-auto py-10 md:py-16 px-4">
      <div className="flex mb-7" style={{ borderBottom: '1px solid var(--color-border-2)' }}>
        {[['login', '登入'], ['register', '註冊']].map(([t, label]) => (
          <button key={t} onClick={() => { setTab(t); setError('') }}
            className="flex-1 pb-3 text-sm font-medium transition-all"
            style={{
              color:       tab === t ? 'var(--color-brown)' : 'var(--color-text-3)',
              borderBottom: `2px solid ${tab === t ? 'var(--color-brown)' : 'transparent'}`,
            }}>
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.form key={tab}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          onSubmit={handleSubmit} className="flex flex-col gap-4">
          {tab === 'register' && (
            <Input label="您的姓名" required placeholder="王小明" {...f('name')} />
          )}
          <Input label="Email" type="email" required placeholder="you@example.com" {...f('email')} />
          <Input label="密碼" type="password" required placeholder="••••••••" {...f('password')} />
          {tab === 'register' && (
            <Input label="確認密碼" type="password" required placeholder="再輸入一次" {...f('confirm')} />
          )}
          {error && <p className="text-xs" style={{ color: '#ef4444' }}>{error}</p>}
          <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
            {loading ? '處理中...' : tab === 'login' ? '登入' : '建立帳號'}
          </Button>
          {tab === 'login' && (
            <p className="text-xs text-center" style={{ color: 'var(--color-text-3)' }}>
              （Demo：任意 email / 密碼即可登入）
            </p>
          )}
        </motion.form>
      </AnimatePresence>
    </div>
  )
}

function OrderCard({ order }) {
  const STATUS_COLOR = {
    '待出貨': { bg: '#FEF9C3', color: '#854D0E' },
    '運送中': { bg: '#DBEAFE', color: '#1E40AF' },
    '已送達': { bg: '#DCFCE7', color: '#166534' },
    '已取消': { bg: '#FEE2E2', color: '#991B1B' },
  }
  const sc = STATUS_COLOR[order.status] || STATUS_COLOR['待出貨']
  return (
    <div className="p-4 md:p-5" style={{ border: '1px solid var(--color-border)', background: 'var(--color-cream)' }}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-medium mb-0.5" style={{ color: 'var(--color-text-3)' }}>訂單編號</p>
          <p className="font-mono text-xs md:text-sm font-medium" style={{ color: 'var(--color-brown)' }}>{order.id}</p>
        </div>
        <span className="text-xs font-medium px-2.5 py-1" style={{ background: sc.bg, color: sc.color }}>
          {order.status}
        </span>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="w-9 h-9 object-cover flex-shrink-0" />
            <span className="text-sm flex-1 min-w-0 truncate" style={{ color: 'var(--color-text-2)' }}>{item.name}</span>
            <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-3)' }}>×{item.qty}</span>
            <span className="text-sm flex-shrink-0" style={{ color: 'var(--color-brown)' }}>
              NT${(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-between text-sm pt-3"
        style={{ borderTop: '1px solid var(--color-border)' }}>
        <p className="text-xs" style={{ color: 'var(--color-text-3)' }}>
          {new Date(order.createdAt).toLocaleDateString('zh-TW')}
          {order.shipping?.label ? ` · ${order.shipping.label}` : ''}
        </p>
        <p className="font-serif text-base" style={{ color: 'var(--color-brown)' }}>
          NT${order.total.toLocaleString()}
        </p>
      </div>
    </div>
  )
}

export default function Account() {
  const { user, isLoggedIn, login, register, logout, updateProfile } = useAuthStore()
  const [activeTab, setActive] = useState('orders')
  const [profileForm, setProfile] = useState({ name: user?.name || '', email: user?.email || '' })
  const [saved, setSaved] = useState(false)

  if (!isLoggedIn) return (
    <div className="page-enter">
      <div className="py-10 md:py-12 text-center"
        style={{ background: 'var(--color-cream-2)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-page">
          <h1 className="font-serif font-normal" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--color-dark)' }}>
            我的帳號
          </h1>
        </div>
      </div>
      <AuthForm onLogin={login} onRegister={register} />
    </div>
  )

  const handleSave = () => {
    updateProfile(profileForm)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="page-enter">
      <div className="py-10 md:py-12 text-center"
        style={{ background: 'var(--color-cream-2)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-page">
          <p className="text-xs font-medium uppercase tracking-[0.25em] mb-1.5" style={{ color: 'var(--color-terra)' }}>
            歡迎回來
          </p>
          <h1 className="font-serif font-normal" style={{ fontSize: 'clamp(26px, 4vw, 42px)', color: 'var(--color-dark)' }}>
            {user?.name}
          </h1>
        </div>
      </div>

      <div className="container-page py-8 md:py-10">
        <div className="flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-8">

          {/* Sidebar — horizontal on mobile, vertical on desktop */}
          <div className="md:col-span-1">
            <nav className="flex md:flex-col gap-1 overflow-x-auto pb-1 md:pb-0">
              {[['orders', '訂單記錄'], ['profile', '個人資料']].map(([tab, label]) => (
                <button key={tab} onClick={() => setActive(tab)}
                  className="flex-shrink-0 md:flex-shrink text-left py-2.5 px-4 text-sm font-medium transition-all"
                  style={{
                    color:      activeTab === tab ? 'var(--color-brown)' : 'var(--color-text-2)',
                    background: activeTab === tab ? 'var(--color-cream-2)' : 'transparent',
                    borderLeft: window.innerWidth >= 768 ? `2px solid ${activeTab === tab ? 'var(--color-brown)' : 'transparent'}` : 'none',
                    borderBottom: window.innerWidth < 768 ? `2px solid ${activeTab === tab ? 'var(--color-brown)' : 'transparent'}` : 'none',
                    whiteSpace: 'nowrap',
                  }}>
                  {label}
                </button>
              ))}
              <button onClick={logout}
                className="flex-shrink-0 text-left py-2.5 px-4 text-sm font-medium transition-colors md:mt-4"
                style={{ color: 'var(--color-text-3)', whiteSpace: 'nowrap' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-3)'}>
                登出
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeTab === 'orders' && (
              <div>
                <h2 className="font-serif text-xl md:text-2xl mb-5" style={{ color: 'var(--color-dark)' }}>訂單記錄</h2>
                {!user?.orders || user.orders.length === 0 ? (
                  <div className="py-12 md:py-16 text-center">
                    <p className="font-serif text-xl mb-4" style={{ color: 'var(--color-text-3)' }}>還沒有訂單記錄</p>
                    <Link to="/shop"><Button>前往購物</Button></Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {user.orders.map((o) => <OrderCard key={o.id} order={o} />)}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="font-serif text-xl md:text-2xl mb-5" style={{ color: 'var(--color-dark)' }}>個人資料</h2>
                <div className="flex flex-col gap-4 max-w-sm">
                  <Input label="姓名" value={profileForm.name}
                    onChange={(e) => setProfile({ ...profileForm, name: e.target.value })} />
                  <Input label="Email" type="email" value={profileForm.email}
                    onChange={(e) => setProfile({ ...profileForm, email: e.target.value })} />
                  <Button size="lg" onClick={handleSave}
                    style={saved ? { background: 'var(--color-sage)', borderColor: 'var(--color-sage)' } : {}}>
                    {saved ? '✓ 已儲存' : '儲存變更'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

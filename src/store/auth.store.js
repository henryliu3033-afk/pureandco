import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { authAPI } from '../components/lib/api'

const makeOrder = (items, shipping, address, total, orderId) => ({
  id: orderId || `ORD-${Date.now()}`,
  items,
  shipping,
  address,
  total,
  status: '待出貨',
  createdAt: new Date().toISOString(),
})

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      loading: false,
      error: null,

      register: async (name, email, password) => {
        set({ loading: true, error: null })
        const data = await authAPI.register(name, email, password, '')
        if (data.message === 'Member created successfully') {
          set({ user: { name, email, orders: [] }, isLoggedIn: true })
        } else {
          set({ error: data.message })
        }
        set({ loading: false })
        return data
      },

      login: async (email, password) => {
        set({ loading: true, error: null })
        const data = await authAPI.login(email, password)
        if (data.message === '登入成功') {
          set({ user: { name: email.split('@')[0], email, orders: [] }, isLoggedIn: true })
        } else {
          set({ error: data.message })
        }
        set({ loading: false })
        return data
      },

      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    { name: 'pure-auth' }
  )
)
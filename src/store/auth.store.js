import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

      register: (name, email, password) => {
        const user = { id: `u_${Date.now()}`, name, email, password, orders: [], createdAt: new Date().toISOString() }
        set({ user, isLoggedIn: true })
        return { success: true }
      },

      login: (email, password) => {
        // Demo: any email/password combo works; in production this hits an API
        const { user } = get()
        if (user && user.email === email) {
          set({ isLoggedIn: true })
          return { success: true }
        }
        // New demo user
        const demoUser = { id: `u_${Date.now()}`, name: email.split('@')[0], email, password, orders: [], createdAt: new Date().toISOString() }
        set({ user: demoUser, isLoggedIn: true })
        return { success: true }
      },

      logout: () => set({ isLoggedIn: false }),

      updateProfile: (data) =>
        set({ user: { ...get().user, ...data } }),

      placeOrder: (items, shipping, address, total) => {
        const order = makeOrder(items, shipping, address, total)
        const user = get().user
        if (user) {
          set({ user: { ...user, orders: [order, ...(user.orders || [])] } })
        }
        return order
      },
    }),
    { name: 'pure-auth' }
  )
)

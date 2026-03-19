import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import Navbar    from './components/layout/Navbar'
import Footer    from './components/layout/Footer'
import Home      from './pages/Home'
import Shop      from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart      from './pages/Cart'
import Checkout  from './pages/Checkout'
import Account   from './pages/Account'
import About     from './pages/About'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"              element={<Home />} />
        <Route path="/shop"          element={<Shop />} />
        <Route path="/product/:id"   element={<ProductDetail />} />
        <Route path="/cart"          element={<Cart />} />
        <Route path="/checkout"      element={<Checkout />} />
        <Route path="/account"       element={<Account />} />
        <Route path="/about"         element={<About />} />
        <Route path="*"              element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

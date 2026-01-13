import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

// Pages
import Index from './pages/Index'
import Account from './pages/Account'
import Component from './pages/Component'
import Crypto from './pages/Crypto'
import Exchange from './pages/Exchange'
import Message from './pages/Message'
import MyWallet from './pages/MyWallet'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Transaction from './pages/Transaction'

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/index" element={<Index />} />
      <Route path="/account" element={<Account />} />
      <Route path="/component" element={<Component />} />
      <Route path="/crypto" element={<Crypto />} />
      <Route path="/exchange" element={<Exchange />} />
      <Route path="/message" element={<Message />} />
      <Route path="/my-wallet" element={<MyWallet />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/transaction" element={<Transaction />} />
    </Routes>
  )
}

export default App

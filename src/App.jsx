
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/noPage/Nopage'
import MyState from './context/data/myState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import Productinfo from './pages/productInfo/Productinfo'

function App() {

  return (
    <>
      <MyState>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/order' element={<Order />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/productinfo/:id' element={<Productinfo />} />
            <Route path='/*' element={<Nopage />} />
          </Routes>
        </Router>
      </MyState>
    </>
  )
}

export default App


import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/noPage/Nopage'
import MyState from './context/data/MyState'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import Productinfo from './pages/productInfo/Productinfo'
import AddProduct from './pages/admin/pages/AddProduct'
import UpdateProduct from './pages/admin/pages/UpdateProduct'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
            <Route path='/addproduct' element={<AddProduct />} />
            <Route path='/updateproduct' element={<UpdateProduct />} />
            <Route path='/*' element={<Nopage />} />
          </Routes>
          <ToastContainer />
        </Router>
      </MyState>
    </>
  )
}


// protected Routes for user
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children
  } else {
    return <Navigate to={'/login'} />
  }
}

// protected Routes for admin

// export const ProtectedRouteForAdmin = ({ children }) => {
//   cons
// }


export default App

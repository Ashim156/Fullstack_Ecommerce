import { Route, Routes } from "react-router-dom"
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PageNotFound from './pages/PageNotFound'
import Register from "./pages/Auth/Register"
import Login from "./pages/Auth/Login"
import Dashboard from "./pages/user/Dashboard"
import  Private  from "./components/routes/Private"
import  Admin  from "./components/routes/Admin"
import Forget from "./pages/Auth/Forget"
import AdminDashboard from "./pages/admin/AdminDashboard"
import CreateCategory from "./pages/admin/CreateCategory"
import CreateProduct from "./pages/admin/CreateProduct"
import User from "./pages/admin/User"
import Products from "./pages/admin/Products"
import UpdateProduct from "./pages/admin/UpdateProduct"
import SearchPage from "./pages/SearchPage"
import ProductDetail from "./pages/ProductDetail"
import CartPage from "./pages/CartPage"
import Profile from "./pages/user/Profile"
import Order from "./pages/user/Order"
import AdminOrders from "./pages/admin/AdminOrders"



function App() {


  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product/:slug' element={<ProductDetail/>}/>
      <Route path='/cart' element={<CartPage/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/dashboard' element={<Private/>}>
      <Route path='user' element={<Dashboard/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      <Route path='user/order' element={<Order/>}/>
      </Route>
      <Route path='/dashboard' element={<Admin/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-category' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/update-product/:slug' element={<UpdateProduct/>}/>
      <Route path='admin/product' element={<Products/>}/>
      <Route path='admin/create-user' element={<User/>}/>
      <Route path='admin/all-orders' element={<AdminOrders/>}/>
 
      </Route>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<Forget/>}/>
      
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      
    </>
  )
}

export default App

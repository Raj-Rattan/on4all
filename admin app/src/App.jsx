import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import MainLayout from './components/MainLayout'
import Dashboard from './pages/Dashboard'
import Enquirires from './pages/Enquirires'
import BlogList from './pages/BlogList'
import BlogCategoryList from './pages/BlogCategoryList'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import ColorList from './pages/ColorList'
import CategoryList from './pages/CategoryList'
import BrandList from './pages/BrandList'
import ProductList from './pages/ProductList'
import AddBlog from './pages/AddBlog'
import AddBlogCategory from './pages/AddBlogCategory'
import AddColor from './pages/AddColor'
import AddCategory from './pages/AddCategory'
import AddBrand from './pages/AddBrand'
import AddProduct from './pages/AddProduct'
import AddCoupon from './pages/AddCoupon'
import CouponList from './pages/CouponList'
import ViewEnquiry from './pages/ViewEnquiry'
import ViewOrder from './pages/ViewOrder'
import { PrivateRoutes } from './routing/PrivateRoutes'
import { OpenRoutes } from './routing/OpenRotes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />} />
          <Route path='enquiries' element={<Enquirires />} />
          <Route path='enquiries/:id' element={<ViewEnquiry />} />
          <Route path='blog-list' element={<BlogList />} />
          <Route path='blog-category-list' element={<BlogCategoryList />} />
          <Route path='orders' element={<Orders />} />
          <Route path='order/:id' element={<ViewOrder />} />
          <Route path='customers' element={<Customers />} />
          <Route path='color-list' element={<ColorList />} />
          <Route path='category-list' element={<CategoryList />} />
          <Route path='brand-list' element={<BrandList />} />
          <Route path='product-list' element={<ProductList />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='add-blog/:id' element={<AddBlog />} />
          <Route path='add-blog-category' element={<AddBlogCategory />} />
          <Route path='add-blog-category/:id' element={<AddBlogCategory />} />
          <Route path='color' element={<AddColor />} />
          <Route path='color/:id' element={<AddColor />} />
          <Route path='category' element={<AddCategory />} />
          <Route path='category/:id' element={<AddCategory />} />
          <Route path='brand' element={<AddBrand />} />
          <Route path='brand/:id' element={<AddBrand />} />
          <Route path='product' element={<AddProduct />} />
          <Route path='product/:id' element={<AddProduct />} />
          <Route path='add-coupon' element={<AddCoupon />} />
          <Route path='add-coupon/:id' element={<AddCoupon />} />
          <Route path='coupon-list' element={<CouponList />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

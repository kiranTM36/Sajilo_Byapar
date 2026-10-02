import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Products from './pages/Products'
import Customer from './pages/Customer'
import Credit from './pages/Credit'
import CustomerEdit from './auth/CustomerEdit'
import CustomerLogin from './auth/CustomerLogin'
import SingleProduct from './pages/SingleProduct'
import SingleCustomer from './pages/SingleCustomer'
import Inventory from './pages/Inventory'
import AdminRoute from './status/AdminRoute'
import Report from './pages/Report'

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />}>
          <Route index element={<><Dashboard /></>} />
          <Route path='sales' element={<Sales />} />
          <Route path='products' element={<Products />} />
          
          <Route path='customers'>
            <Route index element={<Customer />} />
            <Route path=':id' element={<SingleCustomer />} />
          </Route>

          <Route path='credit' element={<Credit />} />
          <Route path='inventory' element={<Inventory />} />
          <Route path='report' element={<Report />} />
        </Route>

        <Route path='/customer/edit' element={<CustomerEdit />} />
        <Route path='/login' element={<CustomerLogin />} />
        <Route path='product/:id' element={<SingleProduct />} />
        

      </Routes>

    </BrowserRouter>
  )
}

export default App
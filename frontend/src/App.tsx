import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'
import Products from './pages/Products'
import Customer from './pages/Customer'

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path='/sales' element={<Sales />} />
          <Route path='/products' element={<Products />} />
          <Route path='/customers' element={<Customer />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
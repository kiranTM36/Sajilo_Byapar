import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './Home'
import Dashboard from './pages/Dashboard'
import Sales from './pages/Sales'

const App = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home />}>
          <Route index element={<Dashboard />} />
          <Route path='/sales' element={<Sales />} />
        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidenav from './components/SIdenav'

const Home = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Navbar />

      <div className="h-[93vh] mt-[7vh] w-full grid grid-cols-[15%_85%]">

        <div className="h-full overflow-hidden">
          <Sidenav />
        </div>

        <div className="bg-[#F8F9FF] h-full overflow-y-auto overflow-x-hidden">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Home
import { NavLink } from "react-router-dom"

const SIdenav = () => {
  return (
    <div className="h-full bg-white shadow flex justify-start items-center py-2 flex-col gap-1">

        <NavLink to='/' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>DashBoard</NavLink> 
        <NavLink to='/sales' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>Sales</NavLink> 
        <NavLink to='/customers' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>Customers</NavLink> 
        <NavLink to='/products' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>Products</NavLink> 
        <NavLink to='/inventory' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>Inventory</NavLink> 
        <NavLink to='/credit' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>Credit</NavLink> 
        <NavLink to='/report' className={({isActive}) => `SidenavButton ${isActive ? 'sidenavAvtive' : ''}`}>Report</NavLink> 

    </div>
  )
}

export default SIdenav
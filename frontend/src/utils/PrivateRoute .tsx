import { Navigate, Outlet, useLocation } from 'react-router-dom'

interface privateRoute {
    isAuthenticated: boolean
    role?: string
}

const PrivateRoute = ({ isAuthenticated, role }: privateRoute) => {

    const { pathname } = useLocation()

    

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />
    }
    const allowedRoutes = [
        "/profile",
        "/products",
        "/product/"
    ]

    if (role === "CUSTOMER" && !allowedRoutes.includes(pathname) && !pathname.startsWith('/product/')) {
        return <Navigate to='/profile' replace />
    }

    console.log("Role:", role);
console.log("Path:", pathname);

    return <Outlet />
}

export default PrivateRoute
import { useDispatch, useSelector } from "react-redux"
import { type AppDispatch, type RootState } from "../store/store"
import { logOutAction } from "../store/userSlice"
import { useState } from "react"
import { Link } from "react-router-dom"
import LowItem from "../pages/LowItem"
import { getProducts } from "../store/productSlice"
import { Bell, X } from "lucide-react"

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {products} = useSelector((state:RootState) => state.product)
    const {user} = useSelector((state:RootState) => state.user)

    const handleLogout = async () => {
        await dispatch(logOutAction())
        dispatch(getProducts())
    }

    const lowItems = products.filter((product) => product.quantity < 10)
    

    const [popOver, setPopOver] = useState(false)
    const [showLowStock , setShowLowStock] = useState(false)
    return (
        <div className='h-[7vh] w-full bg-white fixed z-10 shadow top-0 left-0 grid grid-cols-[15%_85%] px-3 text items-center'>
            <h1>Sajilo Byapar</h1>

            <div className='h-full flex justify-between items-center pr-7'>
                <h2 className='font-medium text-gray-500'>Itahari-2 Sunsari</h2>

                <div className="relative flex justify-center items-center gap-4">
                    {
                        user?.role === 'ADMIN' && (
                            <>
                                <span className="flex justify-center items-center absolute w-[2vh] h-[2vh] top-0.5 -left-1.75 text-white bg-red-600 rounded-full text-sm">{lowItems.length}</span>
                    <div className="h-[5vh] w-[5vh] rounded-full shadow flex justify-center items-center" onClick={()=> setShowLowStock(!showLowStock)}>
                        <Bell className="text-gray-800 stroke-2 " />
                    </div>
                            </>
                        )
                    }

                    {
                        showLowStock && (
                            <div className="fixed w-[20vw] z-100 top-13 right-7 rounded-2xl shadow-2xl bg-white">
                                <div className="relative">
                                    <button onClick={() => setShowLowStock(false)} className="absolute -top-4 right-0 h-[3vh] w-[3vh] bg-red-700 duration-150 hover:scale-105 cursor-pointer text-white rounded-full flex justify-center items-center p-1"><X className="stroke-3" /></button>
                                    <LowItem />
                                </div>
                            </div>
                        )
                    }

                    <div
                    className="h-[5vh] w-[5vh] rounded-full bg-center bg-no-repeat bg-cover cursor-pointer"
                    style={{
                        backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg')`
                    }}
                    onClick={() => setPopOver(!popOver)}
                ></div>

                </div>
                {
                    popOver && (
                        <div className="fixed py-2 px-3 top-13 z-100 right-8 bg-white shadow rounded-md">
                            <div className="flex justify-between items-center flex-col">
                                <Link to='/profile'><h1 className="px-3 w-[15vh] py-2 hover:bg-gray-100 text-center rounded-sm">profile</h1></Link>
                                <button className="px-3 py-2 w-[15vh] hover:bg-gray-100 cursor-pointer rounded-sm" onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Navbar
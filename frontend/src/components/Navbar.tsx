import { useDispatch } from "react-redux"
import { type AppDispatch } from "../store/store"
import { logOutAction } from "../store/userSlice"

const Navbar = () => {
    const dispatch = useDispatch<AppDispatch>()

    const handleLogout = async() => {
        await dispatch(logOutAction())
    }
    return (
        <div className='h-[7vh] w-full bg-white fixed z-10 shadow top-0 left-0 flex justify-between items-center'>
            <h1>Sajilo Byapar</h1>

            <div className='h-full w-[70vw] flex justify-between items-center'>
                <h2 className='font-medium text-gray-500'>Itahari-2 Sunsari</h2>
                <input type="text" className='h-[5vh] w-[20vw] rounded-md border outline-none border-gray-300 bg-blue-200' />
            </div>

            <button onClick={handleLogout}>Logout</button>
            <div className='w-[5vw]'>
                {
                    !localStorage.getItem('token') ? (<button>Login</button>):
                <button>Logout</button>
                }
            </div>
        </div>
    )
}

export default Navbar
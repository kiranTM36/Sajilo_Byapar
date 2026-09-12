import logo from '../assets/logo.jpg'

const Navbar = () => {
    return (
        <div className='h-[7vh] w-full bg-white fixed z-10 shadow top-0 left-0 flex justify-between items-center'>
            <h1>Sajilo Byapar</h1>

            <div className='h-full w-[70vw] flex justify-between items-center'>
                <h2 className='font-medium text-gray-500'>Itahari-2 Sunsari</h2>
                <input type="text" className='h-[5vh] w-[20vw] rounded-md border outline-none border-gray-300 bg-blue-200' />
            </div>

            <div className='w-[5vw]'></div>
        </div>
    )
}

export default Navbar
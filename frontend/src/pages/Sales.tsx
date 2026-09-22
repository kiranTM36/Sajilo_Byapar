import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getAllsales } from '../store/saleSlice'

const Sales = () => {

    const [search , setSearch ] = useState('')
    const dispatch = useDispatch<AppDispatch>()
    const { sales, status } = useSelector((state: RootState) => state.sales)

    useEffect(() => {
        dispatch(getAllsales())
    }, [dispatch])

    const searchSales = sales.filter((sale) => sale.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) )


    return (
        <div className='px-5 py-2'>
            <div className='h-[10vh] w-full mb-[1.5vh]'></div>

            <div className='h-[78vh] w-full grid overflow-x-hidden grid-cols-[69%_30%] gap-[1%]'>
                <div>
                    <div className='h-[10vh] w-full border px-4 flex justify-between items-center border-gray-200 rounded-md bg-white mb-3'>
                        <div className='w-[83%] border border-gray-200 h-[5vh] relative rounded-md overflow-hidden'>
                            <input type="text" onChange={(e)=> setSearch(e.target.value)} placeholder='Search customer Name....' className='pl-2 pr-[4vw] outline-none bg-[#EEF4FF] w-full h-full' />
                            <button className='absolute top-0 right-0 h-full w-[3vw] bg-[#00855D] text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
                        </div>

                        <select name="" id="" className='w-[15%] border border-gray-200 p-1'>
                            <option value="">Category</option>
                            <option value="">Noodles</option>
                        </select>
                    </div>
                    <div className='h-[66vh] w-full border border-gray-200 rounded-md bg-white overflow-x-hidden overflow-y-auto'>
                        <div>
                            <table className='w-full text-sm'>
                                <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                                    <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                                        <th className='px-5 py-2 font-medium'>Customer</th>
                                        <th className='px-5 py-2 font-medium'>Total Amount</th>
                                        <th className='px-5 py-2 font-medium'>Total Payment</th>
                                        <th className='px-5 py-2 font-medium'>Due</th>
                                        <th className='px-5 py-2 font-medium'>Status</th>
                                        <th className='px-5 py-2 font-medium'>Action</th>
                                    </tr>
                                </thead>

                                <tbody className='w-full text-sm overflow-x-hidden overflow-y-auto'>
                                    {
                                        searchSales.map((sale) => (
                                            <tr key={sale.id} className='text-center hover:bg-gray-5 text-gray-600 border border-gray-200'>
                                                <td className='px-5 py-4 text-gray-600'>
                                                    <span className='text-gray-800 font-semibold'>{sale.userName}</span>
                                                </td>
                                                
                                                <td className='px-5 py-4 text-gray-600'>{sale.totalAmount}</td>
                                                <td className='px-5 py-4 text-gray-600'>{sale.paidAmount}</td>
                                                <td className='px-5 py-4 text-gray-600'>{Number(sale.totalAmount) - Number(sale.paidAmount)}</td>

                                                {Number(sale.paidAmount) === 0 ? 
                                                <td className='px-5 py-4 text-red-600'><span className='bg-red-50 text-[12px] px-2 py-1 rounded-md'>credit</span></td>  :
                                                Number(sale.paidAmount) === Number(sale.totalAmount) ?
                                                 <td className='px-5 py-4 text-green-600'><span className='bg-green-50 text-[12px] px-2 py-1 rounded-md'>paid</span></td> :
                                                  <td className='px-5 py-4 text-yellow-600'><span className='bg-yellow-50 text-[12px] px-2 py-1 rounded-md'>partial</span></td>}
                                                
                                                
                                                {/* { Number(sale.paidAmount) === 0 && (<td className='px-5 py-4 text-gray-600'>credit</td>)}
                                                { Number(sale.paidAmount) === Number(sale.totalAmount) && (<td className='px-5 py-4 text-gray-600'>paid</td>)}
                                                { (sale.paidAmount) < sale.totalAmount && (<td className='px-5 py-4 text-gray-600'>Patrial</td>)} */}
                                                
                                                <td className='px-5 py-4 text-gray-600'>
                                                    {new Date(sale.saleDate).toLocaleDateString("ne-NP", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                    })}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='bg-white h-[78vh] rounded-md border border-gray-200 '>
                    <div className='flex justify-between gap-2 items-start py-2 px-4 flex-col'>
                        <div className='w-full'>
                            <div className='py-2 text-lg flex items-center border-b border-gray-300 justify-start gap-3 font-semibold'>Current Sales <span className='bg-[#047b55] text-white p-1 px-2 text-[10px] rounded-lg'>3 items</span></div>
                        </div>

                        <div className='h-[40vh] w-full flex flex-col justify-start items-center gap-2 overflow-y-auto scrollbar-none'>
                            <div className='h-[8vh] py-2 px-2 w-full flex justify-between items-center bg-blue-50 border border-gray-200 rounded-md'>
                                <div>
                                    <p className='text-[16px] font-semibold text-gray-800'>Wai Wai Noodles</p>
                                    <p className='text-[13px] font-medium text-gray-700'>Rs 25 Each</p>
                                </div>

                                <div className="h-[4vh] w-[5vw] flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
                                    <button className="w-[30%] h-full flex items-center justify-center hover:bg-gray-50">
                                        +
                                    </button>

                                    <p className="w-[40%] h-full flex items-center justify-center">
                                        0
                                    </p>

                                    <button className="w-[30%] h-full flex items-center justify-center  hover:bg-gray-50">
                                        -
                                    </button>
                                </div>

                                <div className='text-md font-medium text-gray-800 '>
                                    Rs 200
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sales
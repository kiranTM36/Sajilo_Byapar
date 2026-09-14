import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getCustomers } from '../store/customerSlice'

const Customer = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { customers , status } = useSelector((state:RootState) => state.customer)

    useEffect(() => {
        dispatch(getCustomers())
    } , [dispatch])

    console.log(status , customers)
    return (
    <div >
      <div className='w-full mb-[2vh]'>
        <div>
          <div className='px-5 flex justify-between items-center h-[10vh]'>

            <div>
              <h1 className='text-xl font-bold text-gray-800'>Good Morining</h1>
              <p className='text-sm text-gray-500'>Here is Your activities</p>
            </div>

            <div className='flex justify-center items-center gap-2 relative'>
              <button className='py-1 px-3 bg-white shadow  rounded-md '>Calender</button>
              <button className='py-1 px-3 text-white rounded-md shadow bg-[#00855D]'>New Sales</button>
            </div>

          </div>
          <div>

            <div className='flex justify-center items-center gap-5 px-5'>
              <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl'></div>
              <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl'></div>
              <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl'></div>
              <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl'></div>
            </div>
          </div>
        </div>
      </div>

      <div className='px-5'>
        <div className='h-[10vh] w-full border px-4 flex justify-between items-center border-gray-200 rounded-md bg-white mb-3'>
          <div className='w-[83%] border border-gray-200 h-[5vh] relative rounded-md overflow-hidden'>
            <input type="text" placeholder='Search customer Name....' className='pl-2 pr-[4vw] outline-none bg-[#EEF4FF] w-full h-full' />
            <button className='absolute top-0 right-0 h-full w-[3vw] bg-[#00855D] text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <select name="" id="" className='w-[15%] border border-gray-200 p-1'>
            <option value="">Category</option>
            <option value="">Noodles</option>
          </select>
        </div>
        <div className='h-[68vh] w-full border border-gray-200 rounded-md bg-white'>
          <div>
            <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[5%]'>CUSTOMER</th>
                  <th className='px-5 py-2 font-medium'>PHONE</th>
                  <th className='px-5 py-2 font-medium'>TOTAL PURCHASE</th>
                  <th className='px-5 py-2 font-medium'>OUTSTANDING CREDIT</th>
                  <th className='px-5 py-2 font-medium'>LAST PURCHASE</th>
                  <th className='px-5 py-2 font-medium'>ACTION</th>
                </tr>
              </thead>

              <tbody className='w-full text-sm'>
                {
                    customers?.map((customer) => (
                        <tr className='' key={customer._id}>
                                        <td className='px-5 py-4 text-gray-600'>
                                            <span className='text-gray-800 font-semibold'>{customer.customerName}</span>
                                        </td>
                                        <td className='px-5 py-4 text-gray-600'>Noodles</td>
                                        <td className='px-5 py-4 text-gray-600'>6</td>
                                        <td className='px-5 py-4 text-gray-600'>
                                            Rs 120
                                        </td>
                                        <td className='px-5 py-4 text-gray-600'>
                                            <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 mr-2'>Edit</span>
                                            <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700'>Delete</span>
                                        </td>
                        </tr>
                    ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Customer
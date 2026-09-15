import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getProducts } from '../store/productSlice'
import { getCategory } from '../store/categorySlice'

// interface categoryData {
//   id : number
//   categoryName : string
// }

const Credit = () => {

  const dispatch = useDispatch<AppDispatch>()

  const { category } = useSelector((state : RootState )=> state.category)
  // const { products , status } = useSelector((state : RootState) => state.product)

  useEffect(() => {
    // dispatch(getProducts())
    dispatch(getCategory())
  } , [dispatch])
  
  console.log(category)

  console.log(category , status)
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
              <div className='h-[20vh] w-1/2 bg-white shadow border border-gray-200 rounded-xl'></div>
              <div className='h-[20vh] w-1/2 bg-white shadow border border-gray-200 rounded-xl'></div>
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
            <option value="">Paid</option>
            <option value="">Credit</option>
          </select>
        </div>
        <div className='h-[68vh] w-full border border-gray-200 rounded-md bg-white'>
          <div>
            <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[15%]'>Customer</th>
                  <th className='px-5 py-2 font-medium'>Phone</th>
                  <th className='px-5 py-2 font-medium'>Total Credit</th>
                  <th className='px-5 py-2 font-medium'>Paid</th>
                  <th className='px-5 py-2 font-medium'>Remaining</th>
                  <th className='px-5 py-2 font-medium'>Last Payement</th>
                </tr>
              </thead>

              <tbody className='w-full text-sm'>
                <tr className='text-center text-gray-500 hover:bg-gray-50 border border-gray-200'>
                  <th className='px-5 py-4 font-medium w-[15%] text-gray-800'>Kiran Magar</th>
                  <th className='px-5 py-4 font-medium text-gray-600'>9827364010</th>
                  <th className='px-5 py-4 font-medium text-gray-600'>Rs. 900</th>
                  <th className='px-5 py-4 font-medium text-gray-600'>Rs. 700</th>
                  <th className='px-5 py-4 font-medium text-gray-600'>Rs. 200</th>
                  <th className='px-5 py-4 font-medium text-gray-600'>Yesterday</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Credit
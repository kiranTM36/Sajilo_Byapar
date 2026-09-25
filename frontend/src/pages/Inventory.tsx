import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { showInventory } from '../store/inventorySlice'
import { Link } from 'react-router-dom'

const Inventory = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { inventory , status} = useSelector((state:RootState) => state.inventory)

    useEffect(() => {
        dispatch(showInventory())
    }, [dispatch])

    console.log(inventory , status)
  return (
    <div className='px-5'>
        <div className='h-[10vh] w-full border px-4 flex justify-between items-center border-gray-200 rounded-md bg-white mb-3'>
          <div className='w-[83%] border border-gray-200 h-[5vh] relative rounded-md overflow-hidden'>
            <input type="text" placeholder='Search customer Name....' className='pl-2 pr-[4vw] outline-none bg-[#EEF4FF] w-full h-full' />
            <button className='absolute top-0 right-0 h-full w-[3vw] bg-[#00855D] text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <select name="" id="" className='w-[15%] border border-gray-200 p-1'>
            <option value="">Category</option>
            {/* {
              category.map((item)=> (
                <option value={`${item.id}`} key={`${item.id}`}>{item.categoryName}</option>
              ))
            } */}
          </select>
        </div>
        <div className='h-[68vh] w-full border border-gray-200 rounded-md bg-white'>
          <div>
            <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[5%]'>Image</th>
                  <th className='px-5 py-2 font-medium'>Product</th>
                  <th className='px-5 py-2 font-medium'>Category</th>
                  <th className='px-5 py-2 font-medium'>Price</th>
                  <th className='px-5 py-2 font-medium'>Stock</th>
                  <th className='px-5 py-2 font-medium'>Action</th>
                </tr>
              </thead>

              <tbody className='w-full text-sm'>
                {
                  inventory?.map((product) => (
                    <tr className='text-center text-gray-500 bg-white border border-gray-200' key={product.id}>
                      <td className='px-5 py-4 font-medium'><Link to={`/product/${product.id}`}>{product.productName}</Link></td>
                      <td className='px-5 py-4 font-medium'>{product.batchNo}</td>
                      <td className='px-5 py-4 font-medium'>Rs {product.purchasedPrice}</td>
                      <td className='px-5 py-4 font-medium'>{new Date(product.purchaseDate).toLocaleDateString("ne-Np" , {
                        year : "numeric",
                        month : "short",
                        day : "2-digit"
                      })}</td>
                      
                      <td className='px-5 py-4 font-medium'>Action</td>
                  </tr>
                  ))
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}

export default Inventory
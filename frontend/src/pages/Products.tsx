import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getProducts } from '../store/productSlice'
import { getCategory } from '../store/categorySlice'
import { Link } from 'react-router-dom'
import config from '../config/config'


const Products = () => {

  const [search , setSearch] = useState('')
  const dispatch = useDispatch<AppDispatch>()

  const { category } = useSelector((state : RootState )=> state.category)


  useEffect(() => {
    dispatch(getCategory())
  } , [dispatch])
  
  
  console.log(category)

  console.log(category , status)

  const { products } = useSelector((state:RootState) => state.product)

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const searchProduct = products.filter((product) => product.productName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
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
            <input type="text" onChange={(e)=>(setSearch(e.target.value))} value={search} placeholder='Search customer Name....' className='pl-2 pr-[4vw] outline-none bg-[#EEF4FF] w-full h-full' />
            <button className='absolute top-0 right-0 h-full w-[3vw] bg-[#00855D] text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <select name="" id="" className='w-[15%] border border-gray-200 p-1'>
            <option value="">Category</option>
            {
              category.map((item)=> (
                <option value={`${item.id}`} key={`${item.id}`}>{item.categoryName}</option>
              ))
            }
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
                  searchProduct?.map((product) => (
                    <tr className='text-center text-gray-500 bg-white border border-gray-200' key={product.id}>
                      <td className='px-5 py-2 font-medium w-[8%]'><div className='h-12.5 w-full'><img className='h-full w-full object-cover' src={`${config}uploads/${product.image}`} alt="" /></div></td>
                      <td className='px-5 py-4 font-medium'><Link to={`/product/${product.id}`}>{product.productName}</Link></td>
                      <td className='px-5 py-4 font-medium'>{product.categoryName}</td>
                      <td className='px-5 py-4 font-medium'>Rs {product.price}</td>
                      <td className='px-5 py-4 font-medium'>{product.description}</td>
                      <td className='px-5 py-4 font-medium'>Action</td>
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

export default Products
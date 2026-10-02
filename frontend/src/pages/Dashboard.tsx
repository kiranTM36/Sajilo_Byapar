import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { useEffect } from 'react'
import { showInventory } from '../store/inventorySlice'
import { getAllCustomer } from '../store/userSlice';
import { getAllsales } from '../store/saleSlice';
import { getProducts } from '../store/productSlice';

interface User {
  userName: string;
}

const Dashboard = () => {

  const dispatch = useDispatch<AppDispatch>()
  const user: User | null = JSON.parse(localStorage.getItem('User') || 'null');
  const userName = user?.userName || 'User';

  const { products } = useSelector((state: RootState) => state.product)
  const { customers } = useSelector((state:RootState) => state.user)
  const { sales } = useSelector((state:RootState) => state.sales)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getAllCustomer())
    dispatch(getAllsales())
  }, [dispatch])

  const totalSales = sales.reduce((total, sales) => total+Number(sales.paidAmount) , 0)
  
  return (
    <div className='w-full flex flex-col gap-5'>

      <div className='w-full'>
        <div>
        <div className='px-5 flex justify-between items-center h-[10vh]'>

          <div>
            <h1 className='text-xl font-bold text-gray-800'>Hello {userName}👏</h1>
            <p className='text-sm text-gray-500'>Here is Your activities</p>
          </div>

          <div className='flex justify-center items-center gap-2 relative'>
            <button className='py-1 px-3 bg-white shadow  rounded-md '>{new Date().toDateString()}</button>
            <button className='py-1 px-3 text-white rounded-md shadow bg-[#00855D]'>New Sales</button>
          </div>

        </div>
        <div>

          <div className='flex justify-center items-center gap-5 px-5'>

            <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 font-medium'>Total Sales</h1>
                <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
              </div>

              <div>
                <h1 className='font-bold text-4xl'><i className="fa-solid fa-indian-rupee-sign"></i>{totalSales}</h1>

                <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
              </div>
            </div>
            
            <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 font-medium'>Total Customer</h1>
                <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
              </div>

              <div>
                <h1 className='font-bold text-4xl'>{customers.length}</h1>

                <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
              </div>
            </div>

            <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 font-medium'>Total Customer</h1>
                <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
              </div>

              <div>
                <h1 className='font-bold text-4xl'>128</h1>

                <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
              </div>
            </div>

            <div className='h-[20vh] w-1/4 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
              <div className='flex justify-between items-center'>
                <h1 className='text-gray-500 font-medium'>Total Customer</h1>
                <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
              </div>

              <div>
                <h1 className='font-bold text-4xl'>128</h1>

                <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
              </div>
            </div>
            
            
          </div>
        </div>
      </div>
    </div>

      <div className='w-full px-5 grid grid-cols-[69%_30%] gap-4'>

        <div className='h-[58vh] bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden flex flex-col'>

          <div className='px-5 py-4 border-b border-gray-200 shrink-0'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Recent Sales
            </h2>

            <p className='text-sm text-gray-500'>
              Latest transactions from your shop
            </p>
          </div>

          <div className=' overflow-y-auto overflow-x-auto scrollbar-none'>

            <table className='w-full text-sm'>

              <thead className='bg-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-left text-gray-500'>

                  <th className='px-5 py-3 font-medium'>
                    Customer
                  </th>

                  <th className='px-5 py-3 font-medium'>
                    Items
                  </th>

                  <th className='px-5 py-3 font-medium'>
                    Amount
                  </th>

                  <th className='px-5 py-3 font-medium'>
                    Payment
                  </th>

                  <th className='px-5 py-3 font-medium'>
                    Time
                  </th>

                </tr>
              </thead>

              <tbody>

                <tr className='border-b border-gray-100 hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-gray-800'>
                    Ram Kumar
                  </td>

                  <td className='px-5 py-4 text-gray-600'>
                    3 Items
                  </td>

                  <td className='px-5 py-4 font-medium'>
                    Rs. 450
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700'>
                      Paid
                    </span>
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    10 min ago
                  </td>

                </tr>


                <tr className='border-b border-gray-100 hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-gray-800'>
                    Sita Rai
                  </td>

                  <td className='px-5 py-4 text-gray-600'>
                    5 Items
                  </td>

                  <td className='px-5 py-4 font-medium'>
                    Rs. 720
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-700'>
                      Credit
                    </span>
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    25 min ago
                  </td>

                </tr>


                <tr className='border-b border-gray-100 hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-gray-800'>
                    Hari Thapa
                  </td>

                  <td className='px-5 py-4 text-gray-600'>
                    2 Items
                  </td>

                  <td className='px-5 py-4 font-medium'>
                    Rs. 280
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700'>
                      Paid
                    </span>
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    42 min ago
                  </td>

                </tr>


                <tr className='border-b border-gray-100 hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-gray-800'>
                    Krishna Sharma
                  </td>

                  <td className='px-5 py-4 text-gray-600'>
                    4 Items
                  </td>

                  <td className='px-5 py-4 font-medium'>
                    Rs. 560
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-700'>
                      Credit
                    </span>
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    1 hour ago
                  </td>

                </tr>


                <tr className='border-b border-gray-100 hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-gray-800'>
                    Sunita Rai
                  </td>

                  <td className='px-5 py-4 text-gray-600'>
                    6 Items
                  </td>

                  <td className='px-5 py-4 font-medium'>
                    Rs. 850
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700'>
                      Paid
                    </span>
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    1 hour ago
                  </td>

                </tr>


                <tr className='border-b border-gray-100 hover:bg-gray-50'>

                  <td className='px-5 py-4 font-medium text-gray-800'>
                    Bikash Rai
                  </td>

                  <td className='px-5 py-4 text-gray-600'>
                    2 Items
                  </td>

                  <td className='px-5 py-4 font-medium'>
                    Rs. 320
                  </td>

                  <td className='px-5 py-4'>
                    <span className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700'>
                      Paid
                    </span>
                  </td>

                  <td className='px-5 py-4 text-gray-500'>
                    2 hours ago
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>


        <div className='h-[58vh] bg-white shadow-sm border border-gray-200 rounded-xl flex flex-col overflow-hidden'>

          <div className='px-4 py-4 border-b border-gray-200 shrink-0'>

            <div className='flex justify-between items-center'>

              <div>

                <h2 className='text-lg font-semibold text-gray-800'>
                  Low Stock
                </h2>

                <p className='text-sm text-gray-500'>
                  Products that need restocking
                </p>

              </div>

              <span className='text-xs font-medium px-2.5 py-1 rounded-md bg-orange-100 text-orange-700'>
                5 Items
              </span>

            </div>

          </div>


          <div className='flex flex-col gap-2 p-3 overflow-y-auto scrollbar-none'>

            {
              products
                .filter((product) => product.quantity < 20)
                .map((product) => (
                  <div key={product.productName} className='bg-[#F4F8FF] rounded-lg p-3 border border-gray-200 shrink-0'>

                    <div className='flex justify-between items-center'>

                      <h3 className='font-semibold text-gray-800'>
                        {product.productName}
                      </h3>

                      <span className={`px-2 py-1 text-xs font-medium rounded-md ${product.quantity > 10 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        Low Stock
                      </span>

                    </div>

                    <p className='text-sm text-gray-500 mt-1'>
                      {product.quantity} packets left
                    </p>

                  </div>
                ))
            }

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
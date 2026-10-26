import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../store/store'
import { getSingleUser } from '../store/userSlice'
import { getSinglesale } from '../store/saleSlice'

const SingleCustomer = () => {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const { sale } = useSelector((state: RootState) => state.sales)

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(Number(id)))
      dispatch(getSinglesale(Number(id)))
    }

  }, [dispatch, id])

  const uniqueSales = sale.filter(
  (item, index, self) =>
    index === self.findIndex(s => s.saleId === item.saleId)
)

const totalAmount = uniqueSales.reduce(
  (total, sale) => total + Number(sale.totalAmount),
  0
)

const totalPaid = uniqueSales.reduce(
  (total, sale) => total + Number(sale.paidAmount),
  0
)
  console.log(user, sale)
  return (
    <div>
      <div className='w-full py-3'>
        <div>
          <div className='px-5 flex justify-between items-center'>

            <div>
              <div className='flex justify-center items-center gap-10'>

                <div className='flex justify-center items-center'>
                  <div className='h-[7vh] w-[7vh] bg-gray-300 mr-3 rounded-full flex items-center justify-center'>
                    <h1 className='font-medium text-2xl'>
                      {(user?.userName ? user.userName.split(' ').map(w => w[0]).join('') : '??').toUpperCase()}
                    </h1>
                  </div>
                  <h1 className='text-3xl font-medium text-gray-800'>{user?.userName}</h1>
                </div>
                <div>
                  <span className='bg-orange-50 px-2 py-1 font-medium text-orange-600 border border-orange-200 text-sm rounded-2xl'>Active-Khata</span>
                </div>
              </div>
              <div className='flex justify-start'>
                <p className='text-sm text-gray-500 ml-12 mt-2'><i className="fa-solid fa-phone mr-1"></i>{user?.phoneNo}</p>
                <p className='text-sm text-gray-500 ml-12 mt-2'><i className="fa-regular fa-clock mr-1"></i>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString("ne-Np", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                }) : ''}</p>
              </div>
            </div>

          </div>
          <div className='mt-3'>

            <div className='flex justify-center items-center gap-5 px-5'>

              <div className='h-[20vh] w-1/3 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-gray-500 font-medium'>Total Purchase</h1>
                  <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
                </div>

                <div>
                  <h1 className='font-bold text-4xl'><i className="fa-solid fa-indian-rupee-sign"></i>{totalAmount}</h1>

                  <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
                </div>
              </div>

              <div className='h-[20vh] w-1/3 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-gray-500 font-medium'>Total Customer</h1>
                  <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
                </div>

                <div>
                  <h1 className='font-bold text-4xl'><i className="fa-solid fa-indian-rupee-sign"></i>{totalPaid}</h1>

                  <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
                </div>
              </div>

              <div className='h-[20vh] w-1/3 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-gray-500 font-medium'>Outstanding Khata</h1>
                  <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
                </div>

                <div>
                  <h1 className='font-bold text-4xl text-red-700'><i className="fa-solid fa-indian-rupee-sign"></i>{totalAmount - totalPaid}</h1>

                  <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
                </div>
              </div>


            </div>
          </div>
        </div>

        <div className='py-5 px-5'>
          
          <div>
            { sale.length === 0 ? <h1>No Sales Made</h1> : (
              <div className='w-full border border-gray-200 rounded-md bg-white shadow'>
                <h1 className='p-2 text-2xl font-bold ml-10 text-gray-700'>Recent Sales</h1>
              <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[20%]'>Date & Time</th>
                  <th className='px-5 py-2 font-medium'>Product</th>
                  <th className='px-5 py-2 font-medium'>SaleId</th>
                  <th className='px-5 py-2 font-medium'>Quantity</th>
                  <th className='px-5 py-2 font-medium'>Total</th>
                  <th className='px-5 py-2 font-medium'>Action</th>
                </tr>
              </thead>

              <tbody className='w-full text-sm'>
                {
                  sale?.map((sale) => (
                    <tr className='text-center text-gray-500 bg-white border border-gray-200 hover:bg-gray-50' key={sale.id}>
                      <td className='px-5 py-4 font-medium'>{new Date(sale.saleDate).toLocaleDateString("ne-Np", {
                        year : "numeric",
                        month : "short",
                        day : "2-digit",
                        hour12 : true,
                        hour : "2-digit",
                        minute: "2-digit",
                        second : "2-digit"
                      })}</td>
                      <td className='px-5 py-4 font-medium'><Link to={`/product/${sale.id}`}>{sale.productName}</Link></td>
                      <td className='px-5 py-4 font-medium'>{sale.saleId}</td>
                      <td className='px-5 py-4 font-medium'>{sale.itemQty}</td>
                      <td className='px-5 py-4 font-medium'><i className="fa-solid fa-indian-rupee-sign"></i> {sale.itemQty * sale.price}</td>
                      <td className='px-5 py-4 font-medium'>Action</td>
                  </tr>
                  ))
                }

              </tbody>
            </table>
            </div>
            )}
          
        </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCustomer
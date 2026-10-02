import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { type AppDispatch, type RootState } from '../store/store'
import { getSingleUser } from '../store/userSlice'
import { getSinglesale } from '../store/saleSlice'

const SingleCustomer = () => {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const { sale } = useSelector((state:RootState) => state.sales)

  useEffect(() => {
    if (id) {
      dispatch(getSingleUser(Number(id)))
      dispatch(getSinglesale(Number(id)))
    }

  }, [dispatch, id])

  console.log(user , sale)
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
                      year : "numeric",
                      month : "long",
                      day : "numeric"
                    }) : ''}</p>
              </div>
            </div>

            <div className='flex justify-center items-center gap-2 relative'>
              <button className='py-1 px-3 bg-white shadow  rounded-md '>{new Date().toDateString()}</button>
              <button className='py-1 px-3 text-white rounded-md shadow bg-[#00855D]'>New Sales</button>
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
                  <h1 className='font-bold text-4xl'><i className="fa-solid fa-indian-rupee-sign"></i>{sale?.totalAmount}</h1>

                  <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
                </div>
              </div>

              <div className='h-[20vh] w-1/3 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-gray-500 font-medium'>Total Customer</h1>
                  <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
                </div>

                <div>
                  <h1 className='font-bold text-4xl'><i className="fa-solid fa-indian-rupee-sign"></i>{sale?.paidAmount}</h1>

                  <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
                </div>
              </div>

              <div className='h-[20vh] w-1/3 bg-white shadow border border-gray-200 rounded-xl flex justify-center flex-col items-left px-5 gap-5'>
                <div className='flex justify-between items-center'>
                  <h1 className='text-gray-500 font-medium'>Outstanding Khata</h1>
                  <div className='bg-gray-300 rounded-full p-1.5'><i className="fa-solid fa-users text-gray-600"></i></div>
                </div>

                <div>
                  <h1 className='font-bold text-4xl text-red-700'><i className="fa-solid fa-indian-rupee-sign"></i>{Number(sale?.totalAmount) - Number(sale?.paidAmount)}</h1>

                  <div className='text-sm text-gray-500 font-medium'><span className='text-green-800'>+6 today</span> Registered based</div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
      )
}

      export default SingleCustomer
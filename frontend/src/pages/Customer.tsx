import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { deleteUser, getAllCustomer, signUp } from '../store/userSlice'
import CustomerForm, { type customerData } from '../auth/CustomerForm'
import { Link } from 'react-router-dom'

const Customer = () => {

  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const handleDelete = (id : number) => {
    dispatch(deleteUser(id))
  }

  const handleAddCustomer = async (data: customerData) => {
    const success = await dispatch(signUp(data))
    if (success) {
      alert("Addded")
    }
  }

  const { customers, status } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getAllCustomer())
  }, [dispatch])

  console.log(status, customers)
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
              <button className='py-1 px-3 text-white rounded-md shadow bg-[#00855D] flex gap-1 cursor-pointer justify-center items-center hover:scale-105 duration-200'
                onClick={() => setShowForm(true)}
              ><i className="fa-solid fa-plus text-md"></i>Add Customer</button>
            </div>

            {
              showForm && (
                <div className='h-screen fixed left-0 top-0 z-10 w-screen flex justify-center items-center backdrop-blur-2xl'>
                  <div className='relative'>
                    <button className='absolute top-[14vh] right-[35vw] h-[3vh] w-[3vh] text-center text-white bg-red-600 rounded-full text-sm hover:scale-105 cursor-pointer'
                      onClick={() => setShowForm(false)}
                    ><i className="fa-solid fa-x"></i></button>
                    <CustomerForm name='Add' onEvent={handleAddCustomer} />
                  </div>
                </div>
              )
            }

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
            <option value="">Credit</option>
            <option value="">Paid</option>
          </select>
        </div>
        <div className='h-[68vh] w-full border border-gray-200 rounded-md bg-white'>
          <div>
            <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[15%]'>CUSTOMER</th>
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
                    <tr key={customer.id} className='w-full text-center text-gray-500 border border-gray-200 hover:bg-gray-50'>
                      <td className='py-4 px-5 font-medium w-[15%]'><Link to={`user/${customer.id}`}>{customer.userName}</Link></td>
                      <td className='py-4 px-5 font-medium'>{customer.phoneNo}</td>
                      <td className='py-4 px-5 font-medium'>Rs 20</td>
                      <td className='py-4 px-5 font-normal'>{customer.role}</td>
                      <td className='py-4 px-5 font-medium'>Jan 1</td>
                      <td>
                        <Link to="/customer/edit"><button className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 mr-1'>Edit</button></Link>
                        <button onClick={()=>handleDelete(customer.id)} className='px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700' >Delete</button>
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
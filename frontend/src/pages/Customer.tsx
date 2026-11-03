import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { deleteUser, getAllCustomer } from '../store/userSlice'
import { Link } from 'react-router-dom'
import AddCustomer from '../auth/AddCustomer'
import { X } from 'lucide-react'

const Customer = () => {

  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const [search, setSearch] = useState('')

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id))
  }


  const { customers } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(getAllCustomer())
  }, [dispatch])

  console.log(customers);
  

  const searchCustomer = customers.filter((customer) => customer.userName.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  return (
    <div className='mt-3'>
      <div className='px-5 pb-4'>
        <div className='h-[10vh] w-full border px-4 flex justify-between items-center border-gray-200 rounded-md bg-white mb-3'>
          <div className='w-[83%] border border-gray-200 h-[5vh] relative rounded-md overflow-hidden'>
            <input type="text" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search customer Name....' className='pl-2 pr-[4vw] outline-none bg-[#EEF4FF] w-full h-full' />
            <button className='absolute top-0 right-0 h-full w-[3vw] bg-[#00855D] text-white'><i className="fa-solid fa-magnifying-glass"></i></button>
          </div>

          <div onClick={()=>setShowForm(true)} className='w-[15%] border border-gray-200 p-1 bg-[#00855D] text-white text-center rounded-md hover:scale-105 duration-150 ease-in cursor-pointer'>
            Add Customer
          </div>

          {
            showForm && (
              <div className='fixed inset-0 h-screen w-screen bg-black/50 flex justify-center items-center z-50'>
                <div className='p-6 rounded-md shadow-lg relative'>
                  <button onClick={()=>setShowForm(false)} className='absolute bg-red-700 text-white rounded-full text-center top-[18vh] left-[65vw] hover:scale-105 duration-100 cursor-pointer'><X className='stroke-3'/></button>
                  <AddCustomer />
                </div>
              </div>
            )
          }
        </div>
        <div className='h-[78vh] w-full border border-gray-200 rounded-md  overflow-x-hidden overflow-y-auto'>
          <div className=''>
            <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[15%]'>CUSTOMER</th>
                  <th className='px-5 py-2 font-medium'>PHONE</th>
                  <th className='px-5 py-2 font-medium'>TOTAL PURCHASE</th>
                  <th className='px-5 py-2 font-medium'>OUTSTANDING CREDIT</th>
                  <th className='px-5 py-2 font-medium'>JOINING DATE</th>
                  <th className='px-5 py-2 font-medium'>ACTION</th>
                </tr>
              </thead>

              <tbody className='w-full text-sm overflow-x-hiddden bg-white overflow-y-auto'>
                {
                  searchCustomer.reverse()?.map((customer , index) => (
                    <tr key={index} className='w-full text-center text-gray-500 border border-gray-200 hover:bg-gray-50'>
                      <td className='py-4 px-5 font-medium w-[15%]'><Link to={`/customers/${customer.id}`}>{customer.userName}</Link></td>
                      <td className='py-4 px-5 font-medium'>{customer.phoneNo}</td>
                      <td className='py-4 px-5 font-medium'>Rs 20</td>
                      <td className='py-4 px-5 font-normal'>{customer.role}</td>
                      <td className='py-4 px-5 font-medium'>{new Date(customer.createdAt).toLocaleDateString("us-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                      })}</td>
                      <td>
                        <Link to="/customer/edit"><button className='px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 mr-1'>Edit</button></Link>
                        <button onClick={() => handleDelete(customer.id)} className='px-2.5 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700' >Delete</button>
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
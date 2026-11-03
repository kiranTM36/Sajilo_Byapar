import  { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getAllCreditor } from '../store/creditorSlice'

const Credit = () => {

  const dispatch = useDispatch<AppDispatch>()
  const { creditors } = useSelector((state:RootState) => state.credit)

 useEffect(() => {
  dispatch(getAllCreditor())
 }, [dispatch])
  
  console.log(creditors)
  return (
    <div >
      <div className='px-5 mt-3'>
        
        <div className='w-full border border-gray-200 rounded-md bg-white'>
          <div>
            <table className='w-full text-sm'>
              <thead className='text-gray-50 border-b border-gray-200 sticky top-0'>
                <tr className='text-center text-gray-500 bg-[#EEF4FF]'>
                  <th className='px-5 py-2 font-medium w-[15%]'>Customer</th>
                  <th className='px-5 py-2 font-medium'>Total Credit</th>
                  <th className='px-5 py-2 font-medium'>Paid</th>
                  <th className='px-5 py-2 font-medium'>Remaining</th>
                  <th className='px-5 py-2 font-medium'>Last Payement</th>
                </tr>
              </thead>

              <tbody className='w-full text-sm'>
                {
                  creditors.toReversed().map((creditor) => (
                    <tr key={creditor.cId} className='text-center text-gray-500 hover:bg-gray-50 border border-gray-200'>
                        <th className='px-5 py-4 font-medium w-[15%] text-gray-800'>{creditor.userName}</th>
                        <th className='px-5 py-4 font-medium text-gray-600'>{Number(creditor.paidAmount) + Number(creditor.creditAmount)}</th>
                        <th className='px-5 py-4 font-medium text-gray-600'>{creditor.paidAmount}</th>
                        <th className='px-5 py-4 font-medium text-gray-600'>{creditor.creditAmount}</th>
                        <th className='px-5 py-4 font-medium text-gray-600'>{new Date(creditor.dueDate).toLocaleDateString('ne-NP', {
                          year : "numeric",
                          month : "short",
                          day : "2-digit",
                          hour12 : true,
                          hour : "2-digit",
                          minute : "2-digit"
                        })}</th>
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

export default Credit
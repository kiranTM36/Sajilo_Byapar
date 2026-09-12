import FourBox from '../components/FourBox'

const Dashboard = () => {
  return (
    <div className='w-full flex flex-col gap-5'>

      <FourBox />

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

            <div className='bg-[#F4F8FF] rounded-lg p-3 border border-gray-200 shrink-0'>

              <div className='flex justify-between items-center'>

                <h3 className='font-semibold text-gray-800'>
                  Noodles
                </h3>

                <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md'>
                  Low Stock
                </span>

              </div>

              <p className='text-sm text-gray-500 mt-1'>
                2 packets left
              </p>

            </div>


            <div className='bg-[#F4F8FF] rounded-lg p-3 border border-gray-200 shrink-0'>

              <div className='flex justify-between items-center'>

                <h3 className='font-semibold text-gray-800'>
                  Cooking Oil
                </h3>

                <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md'>
                  Low Stock
                </span>

              </div>

              <p className='text-sm text-gray-500 mt-1'>
                3 bottles left
              </p>

            </div>


            <div className='bg-[#F4F8FF] rounded-lg p-3 border border-gray-200 shrink-0'>

              <div className='flex justify-between items-center'>

                <h3 className='font-semibold text-gray-800'>
                  Biscuits
                </h3>

                <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md'>
                  Low Stock
                </span>

              </div>

              <p className='text-sm text-gray-500 mt-1'>
                4 packets left
              </p>

            </div>


            <div className='bg-[#F4F8FF] rounded-lg p-3 border border-gray-200 shrink-0'>

              <div className='flex justify-between items-center'>

                <h3 className='font-semibold text-gray-800'>
                  Salt
                </h3>

                <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md'>
                  Low Stock
                </span>

              </div>

              <p className='text-sm text-gray-500 mt-1'>
                2 packets left
              </p>

            </div>


            <div className='bg-[#F4F8FF] rounded-lg p-3 border border-gray-200 shrink-0'>

              <div className='flex justify-between items-center'>

                <h3 className='font-semibold text-gray-800'>
                  Tea
                </h3>

                <span className='px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-md'>
                  Low Stock
                </span>

              </div>

              <p className='text-sm text-gray-500 mt-1'>
                1 packet left
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard
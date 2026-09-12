import React from 'react'

const FourBox = () => {
  return (
    <div className='w-full'>
        <div>
        <div className='px-5 flex justify-between items-center h-[10vh]'>

          <div>
            <h1>Good Morining</h1>
            <p>Here is Your activities</p>
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
  )
}

export default FourBox
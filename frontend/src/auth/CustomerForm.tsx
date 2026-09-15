import { useState } from "react"

export interface customerData {
  userName : string,
    phoneNo : string,
    password : string
}

export interface customerFormProps {
  name : string ,
  onEvent : (data: customerData) => void
}

const CustomerForm:React.FC<customerFormProps> = ({name , onEvent}) => {
  const [data , setData] = useState<customerData>({
    userName : '',
    phoneNo : '',
    password : ''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    const value = e.target.value

    setData({
      ...data , 
      [name] : value
    })

    console.log(name , value)
  }
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className='w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-8'>

      <div className='mb-7'>
        <h1 className='text-2xl font-bold text-gray-800'>
          {name} Customer
        </h1>

        <p className='text-sm text-gray-500 mt-1'>
          Add customer information below
        </p>
      </div>

      <form className='flex flex-col gap-5'>

        <div className='flex flex-col gap-2'>
          <label
            htmlFor='userName'
            className='text-sm font-medium text-gray-700'
          >
            Customer Name
          </label>

          <input
          onChange={handleChange}
            id='userName'
            type='text'
            name='userName'
            placeholder='Enter customer name'
            className='w-full px-4 py-3 rounded-lg border border-gray-300
                       text-sm outline-none transition
                       focus:border-green-600 focus:ring-2 focus:ring-green-100'
          />
        </div>

        <div className='flex flex-col gap-2'>
          <label
            htmlFor='phoneNo'
            className='text-sm font-medium text-gray-700'
          >
            Phone Number
          </label>

          <input
          onChange={handleChange}
            id='phoneNo'
            type='tel'
            name='phoneNo'
            placeholder='Enter phone number'
            className='w-full px-4 py-3 rounded-lg border border-gray-300
                       text-sm outline-none transition
                       focus:border-green-600 focus:ring-2 focus:ring-green-100'
          />
          
        </div>

        {
          name === "Add" && (
            <div className='flex flex-col gap-2'>
          <label
            htmlFor='phoneNo'
            className='text-sm font-medium text-gray-700'
          >
            Password
          </label>

          <input
          onChange={handleChange}
            id='phoneNo'
            type='tel'
            name='password'
            placeholder='Enter phone password'
            className='w-full px-4 py-3 rounded-lg border border-gray-300
                       text-sm outline-none transition
                       focus:border-green-600 focus:ring-2 focus:ring-green-100'
          />
          
        </div>
          )
        }

        <button
          type='submit'
          className='w-full mt-2 bg-green-600 hover:bg-green-700
                     text-white font-medium py-3 rounded-lg
                     transition duration-200'
        >
          {name} Customer
        </button>

      </form>
    </div>
    </div>
  )
}

export default CustomerForm
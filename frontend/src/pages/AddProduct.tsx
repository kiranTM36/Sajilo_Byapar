import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../store/store";
import { createProduct } from "../store/productSlice";
import { getCategory } from "../store/categorySlice";

const AddProduct = () => {
    const dispatch = useDispatch<AppDispatch>()

    const [image , setImage] = useState<File | null>(null)
    const [data , setData] = useState({
        productName : "",
        price : '',
        // quantity : '',
        description : '',
        categoryId : ''
    })

    const { category } = useSelector((state:RootState) => state.category)

    useEffect(() => {
      dispatch(getCategory())
    }, [dispatch])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name , value } = e.target

        setData((data) => ({
            ...data , 
            [name] : value       
        }))
    }

    const handleSubmit = async(e:React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData()

        formData.append('productName' , data.productName)
        formData.append('categoryId' , data.categoryId)
        formData.append('description' , data.description)
        formData.append('price' , data.price)
        // formData.append('quantity' , data.quantity)

        if(image){
            formData.append("image" , image)
        }

        const success = await dispatch(createProduct(formData))

        if(success){
          alert('New Product added Successfully')
        }else{
          alert('error')
        }
        
    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F8F9FF] p-6">
      <form onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
      >
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Add Product
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Enter the product details below.
        </p>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              name="productName"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#00855D] focus:ring-2 focus:ring-[#00855D]/10"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              name="categoryId"
              onChange={handleChange}
              defaultValue=""
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#00855D]"
            >
              <option value="">
                Select category
              </option>

              {
                category.map((category) => (
                  <option value={category.id} key={category.id}>
                  {category.categoryName}
              </option>
                ))
              }
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Marked Price (Rs.)
            </label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#00855D]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              onChange={handleChange}
              name="quantity"
              min="0"
              step="1"
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-[#00855D]"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              rows={3}
              placeholder="Enter product description"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none focus:border-[#00855D]"
            />
          </div>

          <div className="col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Product Image
            </label>
            <input
            onChange={(e) => setImage(e.target.files?.item(0) ?? null)}
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 file:mr-4 file:border-0 file:bg-[#00855D]/10 file:text-[#00855D] file:px-4 file:py-2 file:rounded-md file:font-medium"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            type="reset"
            className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Clear
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-[#00855D] text-white font-medium hover:bg-[#006B4A] transition-colors"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

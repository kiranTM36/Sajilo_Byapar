import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store/store'
import { getSingleProducts } from '../store/productSlice'
import { useParams } from 'react-router-dom'
import config from '../config/config'

const SingleProduct = () => {

    const { id } = useParams()
    const dispatch = useDispatch<AppDispatch>()

    const { singleProduct } = useSelector(
        (state: RootState) => state.product
    )

    useEffect(() => {
        if (id) {
            dispatch(getSingleProducts(Number(id)))
        }
    }, [dispatch, id])

    if (!singleProduct) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-[#F8F9FF] flex justify-center items-center p-6">

            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 grid md:grid-cols-2 gap-10">

                <div className="relative bg-gray-50 rounded-xl flex items-center justify-center p-6 min-h-35">

                    <span className="absolute top-4 left-4 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
                        {singleProduct?.categoryName}
                    </span>

                    <img
                        src={`${config}uploads/${singleProduct?.image}`}
                        alt={singleProduct?.productName}
                        className="w-full h-72 object-contain"
                    />

                </div>

                <div className="flex flex-col justify-center gap-5">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            {singleProduct?.productName?.toUpperCase()}
                        </h1>
                    </div>

                    <div>
                        <p className="text-gray-600 leading-7 text-sm">
                            {singleProduct?.description}
                        </p>
                    </div>

                    <div className="border-t border-gray-100 pt-5">

                        <p className="text-sm text-gray-400 mb-1">
                            Selling Price
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900">
                            Rs. {singleProduct?.price}
                        </h2>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default SingleProduct
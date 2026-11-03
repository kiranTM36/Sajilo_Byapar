import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type AppDispatch, type RootState } from '../store/store'
import { getProducts } from '../store/productSlice'
import config from '../config/config'

const LowItem = () => {

    const dispatch = useDispatch<AppDispatch>()

    const { products } = useSelector((state: RootState) => state.product)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const lowStock = products.filter(product => product.quantity < 10)

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4">

            <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-800">
                    Low Stock Items
                </h2>

                <span className="text-sm bg-red-50 text-red-600 px-3 py-1 rounded-full">
                    {lowStock.length} Items
                </span>
            </div>

            <div className="flex flex-col gap-3">

                {lowStock.length === 0 ? (
                    <p className="text-center text-sm text-gray-500 py-6">
                        All stock levels are good!
                    </p>
                ) : (
                    lowStock.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between gap-3 p-2 rounded-lg border border-gray-100 hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3 min-w-0">
                                <img
                                    src={`${config}uploads/${product.image}`}
                                    alt={product.productName}
                                    className="h-12 w-12 rounded-md object-cover bg-gray-100"
                                />

                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-800 truncate">
                                        {product.productName}
                                    </p>

                                    <p className="text-xs text-gray-400">
                                        Remaining stock
                                    </p>
                                </div>
                            </div>

                            <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-md shrink-0">
                                {product.quantity} left
                            </span>
                        </div>
                    ))
                )}

            </div>
        </div>
    )
}

export default LowItem
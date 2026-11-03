
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    AreaChart, Area, XAxis, YAxis,
    Tooltip, ResponsiveContainer
} from 'recharts'

import { type AppDispatch, type RootState } from '../store/store'
import { getAllsales } from '../store/saleSlice'

const Report = () => {

    const dispatch = useDispatch<AppDispatch>()
    const { sales } = useSelector((state: RootState) => state.sales)

    const [period, setPeriod] = useState('month')

    useEffect(() => {
        dispatch(getAllsales())
    }, [dispatch])

    const today = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Kathmandu'
    })

    // Filter sales
    const filteredSales = sales.filter(sale => {

        const date = new Date(sale.saleDate).toLocaleDateString('en-CA', {
            timeZone: 'Asia/Kathmandu'
        })

        if (period === 'all') return true
        if (period === 'day') return date === today

        const current = new Date(today + 'T00:00:00')
        const saleDate = new Date(date + 'T00:00:00')

        if (period === 'week') {
            const day = current.getDay()
            current.setDate(current.getDate() - (day === 0 ? 6 : day - 1))
        }

        if (period === 'month') {
            current.setDate(1)
        }

        return saleDate >= current
    })

    const totalSales = filteredSales.reduce(
        (sum, sale) => sum + Number(sale.totalAmount), 0
    )

    const totalPaid = filteredSales.reduce(
        (sum, sale) => sum + Number(sale.paidAmount), 0
    )

    const credit = totalSales - totalPaid

    const chartData = filteredSales.reduce((acc: any[], sale) => {

        const date = new Date(sale.saleDate).toLocaleDateString('en-CA', {
            timeZone: 'Asia/Kathmandu'
        })

        const existing = acc.find(item => item.date === date)

        if (existing) {
            existing.total += Number(sale.totalAmount)
            existing.paid += Number(sale.paidAmount)
        } else {
            acc.push({
                date,
                total: Number(sale.totalAmount),
                paid: Number(sale.paidAmount)
            })
        }

        return acc

    }, []).sort((a, b) => a.date.localeCompare(b.date))

    return (
        <div className="w-[90%] mx-auto mt-8 space-y-6">

            {/* Filters */}
            <div className="flex gap-2">
                {['day', 'week', 'month', 'all'].map(item => (
                    <button
                        key={item}
                        onClick={() => setPeriod(item)}
                        className={`px-4 py-2 rounded-lg capitalize ${
                            period === item
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        {item === 'all' ? 'All Time' : item}
                    </button>
                ))}
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <p className="text-gray-500">Total Sales</p>
                    <h2 className="text-2xl font-bold">
                        Rs. {totalSales.toFixed(2)}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <p className="text-gray-500">Received</p>
                    <h2 className="text-2xl font-bold text-green-600">
                        Rs. {totalPaid.toFixed(2)}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <p className="text-gray-500">Remaining Credit</p>
                    <h2 className="text-2xl font-bold text-red-500">
                        Rs. {credit.toFixed(2)}
                    </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm">
                    <p className="text-gray-500">Transactions</p>
                    <h2 className="text-2xl font-bold">
                        {filteredSales.length}
                    </h2>
                </div>

            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm">

                <h2 className="font-semibold mb-5">Sales Report</h2>

                <div className="h-[350px]">

                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>

                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />

                            <Area
                                type="monotone"
                                dataKey="total"
                                name="Total Sales"
                                stroke="#6366f1"
                                fill="#6366f1"
                                fillOpacity={0.2}
                            />

                            <Area
                                type="monotone"
                                dataKey="paid"
                                name="Received"
                                stroke="#16a34a"
                                fill="#16a34a"
                                fillOpacity={0.1}
                            />

                        </AreaChart>
                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    )
}

export default Report

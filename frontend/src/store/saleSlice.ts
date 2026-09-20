import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface Product {
  id: number
  productName: string
  categoryId: number
  categoryName: string
  price: number
  image: string
  description: string
}

interface CartItem extends Product {
  quantity: number
}

interface ProductState {
  items: CartItem[]
}

const initialState: ProductState = {
  items: [],
}

const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addToSale(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity++
      }
    },

    decreaseQty(state , action : PayloadAction <number>){
        const item = state.items.find((item)=> item.id === action.payload)

        if(item){
            item.quantity --
        }
    },

    removeFromSales(state , action : PayloadAction <number>){
        state.items = state.items.filter((item) => item.id !== action.payload)
    }
  },
})

export const { addToSale, increaseQty , removeFromSales , decreaseQty } = saleSlice.actions
export default saleSlice.reducer

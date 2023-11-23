import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOrdersInitState, TOrder } from './Orders.types'

const initialState: IOrdersInitState = {
	orders: [],
	ordersTotal: 10,
}

const OrdersSlice = createSlice({
	name: 'OrdersSlice',
	initialState,
	reducers: {
		setOrders(state, { payload }: PayloadAction<TOrder[]>) {
			state.orders = payload
		},
		setOrdersTotal: (state, { payload }: PayloadAction<number>) => {
			state.ordersTotal = payload
		},
	},
})

export const { reducer, actions } = OrdersSlice

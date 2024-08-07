import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const stateSlice = createSlice({
	name: 'customerDashboard/state',
	initialState: {
		startDate: dayjs().subtract(4, 'week').toDate(),
		endDate: new Date(),
	},
	reducers: {
		setStartDate: (state, action) => {
			state.startDate = action.payload
		},
		setEndDate: (state, action) => {
			state.endDate = action.payload
		},
	},
})

export const {
	setStartDate,
	setEndDate,
} = stateSlice.actions

export default stateSlice.reducer

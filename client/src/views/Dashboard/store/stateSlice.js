import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
	name: 'customerDashboard/state',
	initialState: {
		startDate: new Date(),
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

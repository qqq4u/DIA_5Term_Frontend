import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	parkings: [],
	query: ""
};

const parkingsSlice = createSlice({
	name: 'parkings',
	initialState: initialState,
	reducers: {
		updateParkings(state, action) {
			state.parkings = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateParkings,
	updateQuery
} = parkingsSlice.actions;

export default parkingsSlice.reducer;
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	parking: undefined,
};

const parkingSlice = createSlice({
	name: 'parking',
	initialState: initialState,
	reducers: {
		updateParking(state, action) {
			state.parking = action.payload
		}
	}
})

export const {
	updateParking
} = parkingSlice.actions;

export default parkingSlice.reducer;
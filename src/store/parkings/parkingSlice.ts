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
		},
		updateName(state, action) {
			state.parking.name = action.payload
		},
		updateAddress(state, action) {
			state.parking.address = action.payload
		},
		updatePlacesCount(state, action) {
			state.parking.places_count = action.payload
		},
		updateImage(state, action) {
			state.parking.image = action.payload
		}
	}
})

export const {
	updateParking,
	updateName,
	updateAddress,
	updatePlacesCount,
	updateImage
} = parkingSlice.actions;

export default parkingSlice.reducer;
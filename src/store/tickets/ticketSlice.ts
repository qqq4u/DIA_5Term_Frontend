import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	ticket: undefined
};

const ticketSlice = createSlice({
	name: 'ticket',
	initialState: initialState,
	reducers: {
		updateTicket(state, action) {
			state.ticket = action.payload
		}
	}
})

export const {updateTicket} = ticketSlice.actions;

export default ticketSlice.reducer;
import {configureStore} from "@reduxjs/toolkit";

import parkingReducer from "./parkings/parkingSlice"
import draftTicketReducer from "./tickets/ticketSlice"
import authReducer from "./users/authSlice"
import ticketsReducer from "./tickets/ticketsSlice"
import parkingsReducer  from "./parkings/parkingsSlice"

export default configureStore({
	reducer: {
		parking: parkingReducer,
		parkings: parkingsReducer,
		ticket: draftTicketReducer,
		tickets: ticketsReducer,
		user: authReducer
	}
});
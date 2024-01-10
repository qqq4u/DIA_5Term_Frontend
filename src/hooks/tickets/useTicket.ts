import {useDispatch, useSelector} from 'react-redux';
import {
	updateTicket
} from "../../store/tickets/ticketSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useParkings} from "../parkings/useParkings";

export function useTicket() {

	const {access_token} = useToken()

	const ticket = useSelector(state => state.ticket.ticket)

	const is_draft = ticket?.status == 1

	const dispatch = useDispatch()

	const setTicket = (value) => {
		dispatch(updateTicket(value))
	}

	const sendTicket = async () => {

		const response = await api.put(`tickets/${ticket.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setTicket(undefined)
		}
	}

	const deleteTicket = async () => {

		const response = await api.delete(`tickets/${ticket.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setTicket(undefined)
		}

	}

	const saveTicket = async () => {

		await api.put(`tickets/${ticket.id}/update/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchTicket = async (ticket_id) => {

		const {data} = await api.get(`tickets/${ticket_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setTicket(data)
	}

	const addParkingToTicket = async (parking) => {
		await api.post(`parkings/${parking.id}/add_to_ticket/`, {}, {
			headers: {
				'authorization': access_token
			},
		})
	}

	const deleteParkingFromTicket = async (parking) => {
		await api.delete(`tickets/${ticket.id}/delete_parking/${parking.id}/`, {
			headers: {
				'authorization': access_token
			},
		})
	}

	return {
		ticket,
		is_draft,
		setTicket,
		saveTicket,
		sendTicket,
		deleteTicket,
		fetchTicket,
		addParkingToTicket,
		deleteParkingFromTicket
	};
}
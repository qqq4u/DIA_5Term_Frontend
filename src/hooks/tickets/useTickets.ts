import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/tickets/ticketsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useTickets() {
	const status = useSelector(state => state.tickets.status)
	const date_start = useSelector(state => state.tickets.date_start)
	const date_end = useSelector(state => state.tickets.date_end)
	const user = useSelector(state => state.tickets.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchTickets = async () => {

		const {data} = await api.get(`tickets/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		return data.filter(ticket => ticket.owner.name.includes(user))

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchTickets,
		setDateStart,
		setDateEnd,
		setUser
	};
}
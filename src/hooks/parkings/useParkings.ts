import {useDispatch, useSelector} from 'react-redux';
import {
	updateParkings,
	updateQuery
} from "../../store/parkings/parkingsSlice";
import {api} from "../../utils/api";
import {useTicket} from "../tickets/useTicket";
import {useToken} from "../users/useToken";

export function useParkings() {
	const parkings = useSelector(state => state.parkings.parkings);
	const query = useSelector(state => state.parkings.query);

	const {access_token} = useToken()

	const {fetchTicket} = useTicket()

	const dispatch = useDispatch()

	const setParkings = (value) => {
		dispatch(updateParkings(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchParkings = async () => {

		const {data} = await api.get(`parkings/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_ticket_id = data["draft_ticket_id"]
		draft_ticket_id && fetchTicket(draft_ticket_id)

		return data["parkings"]
	}

	return {
		parkings,
		setParkings,
		query,
		setQuery,
		searchParkings
	};
}
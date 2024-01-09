import {useDispatch, useSelector} from 'react-redux';
import {
	updateParking
} from "../../store/parkings/parkingSlice";
import {api} from "../../utils/api";

export function useParking() {
	const parking = useSelector(state => state.parking.parking);

	const dispatch = useDispatch()

	const setParking = (value) => {
		dispatch(updateParking(value))
	}

	const fetchParking = async (id) => {

		const {data} = await api.get(`parkings/${id}`);

		setParking(data)

	};

	return {
		parking,
		setParking,
		fetchParking
	};
}
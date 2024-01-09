import {useDispatch, useSelector} from 'react-redux';
import {
	updateParking,
	updateName,
	updateAddress,
	updatePlacesCount,
	updateImage
} from "../../store/parkings/parkingSlice";
import {api} from "../../utils/api";

export function useParking() {
	const parking = useSelector(state => state.parking.parking);

	const dispatch = useDispatch()

	const setParking = (value) => {
		dispatch(updateParking(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setAddress = (value) => {
		dispatch(updateAddress(value))
	}

	const setPlacesCount = (value) => {
		dispatch(updatePlacesCount(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchParking = async (id) => {

		const {data} = await api.get(`parkings/${id}`);

		setParking(data)

	};

	return {
		parking,
		setParking,
		fetchParking,
		setName,
		setAddress,
		setPlacesCount,
		setImage
	};
}
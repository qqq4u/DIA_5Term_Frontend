import "./ParkingsList.sass"
import ParkingCard from "../../../components/ParkingCard/ParkingCard";
import {useParkings} from "../../../hooks/parkings/useParkings";
import {useQuery} from "react-query";
import ParkingsFilters from "../ParkingsFilters/ParkingsFilters";

const ParkingsList = () => {

    const {searchParkings} = useParkings()

    const { isLoading, data, refetch } = useQuery(
        ["parkings"],
        () => searchParkings(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(parking  => (
        <ParkingCard parking={parking} key={parking.id}/>
    ))

    return (
        <div className="parkings-list-wrapper">

            <ParkingsFilters refetch={refetch}/>

            <div className="parkings-list">
                { cards }
            </div>

        </div>
    )
}

export default ParkingsList;
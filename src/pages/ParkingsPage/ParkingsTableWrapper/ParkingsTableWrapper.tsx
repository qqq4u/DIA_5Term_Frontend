import {useParkings} from "../../../hooks/parkings/useParkings";
import {useQuery} from "react-query";
import ParkingsTable from "./ParkingsTable/ParkingsTable";
import ParkingsFilters from "../ParkingsFilters/ParkingsFilters.tsx";

const ParkingsTableWrapper = () => {

    const {searchParkings} = useParkings()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["parkings"],
        () => searchParkings(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <ParkingsFilters refetch={refetch}/>
            <ParkingsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default ParkingsTableWrapper
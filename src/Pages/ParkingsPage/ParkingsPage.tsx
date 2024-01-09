import "./ParkingsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ParkingsList from "./ParkingsList/ParkingsList";
import ParkingsFilters from "./ParkingsFilters/ParkingsFilters";

const ParkingsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="parkings-wrapper">

            <ParkingsFilters />

            {!is_moderator && <ParkingsList />}

        </div>
    )
}

export default ParkingsPage;
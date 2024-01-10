import "./ParkingsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ParkingsList from "./ParkingsList/ParkingsList";
import ParkingsTableWrapper from "./ParkingsTableWrapper/ParkingsTableWrapper";

const ParkingsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="parkings-wrapper">

            <ParkingsList />
            {is_moderator && <ParkingsTableWrapper />}

        </div>
    )
}

export default ParkingsPage;
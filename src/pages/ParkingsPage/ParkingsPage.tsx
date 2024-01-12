import "./ParkingsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ParkingsList from "./ParkingsList/ParkingsList";
import ParkingsTableWrapper from "./ParkingsTableWrapper/ParkingsTableWrapper";

const ParkingsPage = () => {

    return (
        <div className="parkings-wrapper">

            <ParkingsList />

        </div>
    )
}

export default ParkingsPage;
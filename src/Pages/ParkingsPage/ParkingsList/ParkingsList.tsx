import "./ParkingsList.sass"
import {useEffect} from "react";
import ParkingCard from "../../../components/ParkingCard/ParkingCard";
import {useParkings} from "../../../hooks/parkings/useParkings";

const ParkingsList = () => {

    const {parkings, fetchParkings} = useParkings()

    useEffect(() => {
        fetchParkings()
    }, [])

    const cards = parkings.map(parking  => (
        <ParkingCard parking={parking} key={parking.id}/>
    ))

    return (
        <div className="parkings-list">

            { cards }

        </div>
    )
}

export default ParkingsList;
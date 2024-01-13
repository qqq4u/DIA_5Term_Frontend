import "./ParkingsList.sass"
import SearchBar from "../../Components/SearchBar/SearchBar";
import {useEffect, useState} from "react";
import ParkingCard from "./ParkingCard/ParkingCard";
import {iParkingsMock, requestTime} from "../../Consts";
import {Parking} from "../../Types";

const ParkingsList = () => {

    const [parkings, setParkings] = useState<Parking[]>([]);

    const [query, setQuery] = useState<string>("");

    const [isMock, setIsMock] = useState<boolean>(false);

    const searchParkings = async () => {

        try {

            const response = await fetch(`http://localhost:8000/api/parkings/search?&query=${query}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            })

            if (!response.ok){
                createMock();
                return;
            }

            const parkings: Parking[] = await response.json()

            // @ts-ignore
            setParkings(parkings["parkings"])
            setIsMock(false)

        } catch (e) {

            createMock()

        }
    }

    const createMock = () => {

        setIsMock(true);

        let filteredParkings:Parking[] = iParkingsMock.filter(parking => parking.status == 1)

        filteredParkings = filteredParkings.filter((parking) => parking.name.toLowerCase().includes(query))

        setParkings(filteredParkings)

    }

    useEffect(() => {
        searchParkings()
    }, [query])

    const cards = parkings.map(order  => (
        <ParkingCard order={order} key={order.id} isMock={isMock}/>
    ))

    return (
        <div className="cards-list-wrapper">

            <div className="top">

                <h2>Поиск парковок</h2>

                <SearchBar query={query} setQuery={setQuery} />

            </div>

            <div className="bottom">

                { cards }

            </div>

        </div>
    )
}

export default ParkingsList;
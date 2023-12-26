import "./ParkingPage.sass"
import {Dispatch, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {iParkingsMock, requestTime} from "../../Consts";
import {Parking} from "../../Types";
import mockImage from "/src/assets/mock.png"

const ParkingPage = ({selectedParking, setSelectedParking}: {
    selectedParking: Parking | undefined,
    setSelectedParking: Dispatch<Parking | undefined>
}) => {

    const {id} = useParams<{ id: string }>();

    const [isMock, setIsMock] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    if (id == undefined) {
        return;
    }

    const fetchData = async () => {

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/parkings/${id}`, {
                method: "GET",
                signal: AbortSignal.timeout(requestTime)
            });

            if (!response.ok) {
                CreateMock()
                return;
            }

            const service: Parking = await response.json()

            setSelectedParking(service)

            setIsMock(false)

        } catch {
            CreateMock()
        }

    };

    const CreateMock = () => {
        setSelectedParking(iParkingsMock.find((service: Parking) => service?.id == parseInt(id)))
        setIsMock(true)
    }

    const img = `http://127.0.0.1:8000/api/parkings/${id}/image/`

    if (!selectedParking) {
        return (
            <div className="page-details-wrapper">

            </div>
        )
    }

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={isMock ? mockImage : img} alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{selectedParking?.name}</h2>

                    <br/>

                    <span>Адрес: {selectedParking?.address}</span>

                    <br/>

                    <br/>

                    <span>Количество мест: {selectedParking?.places_count}</span>

                    <br/>

                </div>

            </div>

        </div>
    )
}

export default ParkingPage;
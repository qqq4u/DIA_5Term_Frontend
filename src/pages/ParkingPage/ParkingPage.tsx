import "./ParkingPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useParking} from "../../hooks/parkings/useParking";

const ParkingPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {parking, fetchParking} = useParking()
    
    useEffect(() => {
        id && fetchParking(id)
    }, [])

    if (parking == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/parkings/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2>{parking.name}</h2>

                    <br />

                    <span>Адресс: {parking.address}</span>

                    <br />

                    <span>Количество мест: {parking.places_count}г</span>

                </div>

            </div>

        </div>
    )
}

export default ParkingPage;
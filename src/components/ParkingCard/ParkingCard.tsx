import "./ParkingCard.sass"
import {Parking} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useTicket} from "../../hooks/tickets/useTicket";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useParkings} from "../../hooks/parkings/useParkings";

const ParkingCard = ({ parking }: {parking:Parking}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {ticket, is_draft, addParkingToTicket, deleteParkingFromTicket} = useTicket()

    const {searchParkings} = useParkings()

    const handleAddParking = async (e) => {
        e.preventDefault()
        await addParkingToTicket(parking)
        await searchParkings()
    }

    const handleDeleteParking = async (e) => {
        e.preventDefault()
        await deleteParkingFromTicket(parking)
        await searchParkings()
    }

    const is_chosen = ticket?.parkings.find(g => g.id == parking.id)

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={parking.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {parking.name} </h3>

                </div>

                <div className="content-bottom">
                    <Link to={`/parkings/${parking.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && location.pathname.includes("parkings") &&
                        <CustomButton onClick={handleAddParking} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("parkings") &&
                        <CustomButton onClick={handleDeleteParking} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("tickets") &&
                        <CustomButton onClick={handleDeleteParking} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ParkingCard;
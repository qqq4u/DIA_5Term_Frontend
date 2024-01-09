import {useEffect} from "react";
import {useTicket} from "../../hooks/tickets/useTicket";
import {useNavigate, useParams} from "react-router-dom"
import ParkingCard from "../../components/ParkingCard/ParkingCard";
import "./TicketPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import {pluralDeliveryDate} from "../../utils/plural";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

const TicketPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {ticket, fetchTicket, saveTicket, sendTicket, deleteTicket, setTicket} = useTicket()

    useEffect(() => {
        id && fetchTicket(id)
        
        return () => {
            setTicket(undefined)
        };
    }, [])

    if (id == undefined || ticket == undefined)
    {
        return (
            <div className="ticket-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendTicket = async() => {
        await saveTicket()
        await sendTicket()
        navigate("/tickets")
    }

    const onDeleteTicket = async () => {
        await deleteTicket()
        navigate("/parkings")
    }

    const cards = ticket.parkings.map(parking  => (
        <ParkingCard parking={parking} key={parking.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={onSendTicket} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteTicket} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = ticket.status == 1

    const completed = [3, 4].includes(ticket.status)

    return (
        <div className="ticket-page-wrapper">

            <div className="ticket-parkings-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новый абонемент" : "Абонемент №" + ticket.id}</h3>
                </div>

                <div className="ticket-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == ticket.status).name}</span>
                    <span>Дата создания: {moment(ticket.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(ticket.status) && <span>Дата формирования: {moment(ticket.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(ticket.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Пользователь: {ticket.owner.name}</span> }
                    {[2, 3, 4].includes(ticket.status) && <span>Время заезда на парковку: {ticket.entry_time ? moment(ticket.entry_time).locale(ru()).format("D MMMM HH:mm"): "Нет"}</span>}
                </div>

                <div className="title">
                    <h3>Парковки</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default TicketPage
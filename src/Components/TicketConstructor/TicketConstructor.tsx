import "./TicketConstructor.sass"
import {useTicket} from "../../hooks/tickets/useTicket";
import {Link} from "react-router-dom";

const TicketConstructor = () => {

    const {ticket} = useTicket()

    if (ticket == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новый абонемент</span>
            </div>
        )
    }

    return (
        <Link to={`/tickets/${ticket.id}`} className="constructor-container">
            <span className="title">Новый абонемент</span>
            {ticket.parkings.length > 0 && <span className="badge">{ticket.parkings.length}</span>}
        </Link>
    )
}

export default TicketConstructor
import TicketsTable from "./TicketsTable/TicketsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const TicketsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/parkings")
        }
    }, [])

    return (
        <div>
            <TicketsTable />
        </div>
    )
}

export default TicketsPage;


import "./NavMenu.sass"
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../hooks/users/useAuth";
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import CustomButton from "../../CustomButton/CustomButton.tsx";
import {variables} from "../../../utils/consts.ts";

const NavMenu = () => {

    const {is_authenticated, is_moderator, auth, user_name, logOut} = useAuth()

    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        auth()
    }, [])

    const doLogOut = async () => {

        await logOut()

        navigate("/")
    }


    return (
        <div>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/parkings" className="menu-item" onClick={(e) => {
                    setIsOpen(false)
                }}>
                    <span>Парковки</span>
                </Link>

                {is_moderator &&
                    <Link to="/parkings_table" className="menu-item" onClick={(e) => {
                        setIsOpen(false)
                    }}>
                        <span>Таблица парковок</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/tickets" className="menu-item" onClick={(e) => {
                        setIsOpen(false)
                    }}>
                        <span>Абонементы</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/profile" className="menu-item" onClick={(e) => {
                        setIsOpen(false)
                    }}>
                        <span>{user_name}</span>
                    </Link>
                }

                {is_authenticated &&
                    <Link to="/" className="menu-item" onClick={doLogOut}>
                        <span>Выйти</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/login" className="menu-item" onClick={(e) => {
                        setIsOpen(false)
                    }}>
                        <span>Вход</span>
                    </Link>
                }

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen}/>

        </div>
    )
}

export default NavMenu;
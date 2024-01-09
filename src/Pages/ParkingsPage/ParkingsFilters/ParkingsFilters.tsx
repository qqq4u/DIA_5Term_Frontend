import "./ParkingsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useParkings} from "../../../hooks/parkings/useParkings";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const ParkingsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useParkings()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="parkings-filters">

            <h2>Поиск парковок</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/parkings/add" bg={variables.primary}>
                        Добавить парковку
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default ParkingsFilters
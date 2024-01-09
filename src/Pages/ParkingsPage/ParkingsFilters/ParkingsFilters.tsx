import "./ParkingsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useParkings} from "../../../hooks/parkings/useParkings";

const ParkingsFilters = () => {

    const {query, setQuery, fetchParkings} = useParkings()

    const handleSubmit = () => fetchParkings()

    return (
        <div className="parkings-filters">

            <h2>Поиск парковок</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default ParkingsFilters
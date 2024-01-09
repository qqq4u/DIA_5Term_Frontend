import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import ParkingsFilters from "../../ParkingsFilters/ParkingsFilters";

const ParkingsTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Кол-во мест",
            accessor: "places_count",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (parking_id) => {
        navigate(`/parkings/${parking_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <ParkingsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default ParkingsTable
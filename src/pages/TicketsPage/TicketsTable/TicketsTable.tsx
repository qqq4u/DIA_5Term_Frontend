import React from "react";
import "./TicketsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useTickets} from "../../../hooks/tickets/useTickets";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import TicketsFilters from "../TicketsFilters/TicketsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";

const TicketsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchTickets} = useTickets()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Пользователь",
            accessor: "owner",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Время заезда на парковку",
            accessor: "entry_time",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }

                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptTicket(cell.row.values.id)}>Принять</CustomButton>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissTicket(cell.row.values.id)}>Отклонить</CustomButton>
            )
        })
    }

    const acceptTicket = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        console.log(access_token)

        const response = await api.put(`tickets/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissTicket = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`tickets/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["tickets"],
        () => searchTickets(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (ticket_id) => {
        navigate(`/tickets/${ticket_id}`)
    }

    return (
        <div className="tickets-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <TicketsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default TicketsTable
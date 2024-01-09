import "./ParkingEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useParking} from "../../hooks/parkings/useParking";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const ParkingEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        parking,
        fetchParking,
        setName,
        setAddress,
        setPlacesCount,
        setImage
    } = useParking()

    useEffect(() => {
        id && fetchParking(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveParking = async() => {
        let form_data = new FormData()

        form_data.append('name', parking.name)
        form_data.append('address', parking.address)
        form_data.append('places_count', parking.places_count)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`parkings/${parking.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/parkings/")
        }
    }

    const deleteParking = async () => {

        const response = await api.delete(`parkings/${parking.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/parkings/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (parking == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={parking.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={parking.name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={parking.address} setValue={setAddress} />

                    <CustomInput placeholder="Количество мест" value={parking.places_count} setValue={setPlacesCount} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveParking}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteParking}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ParkingEditPage
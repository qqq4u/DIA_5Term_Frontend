import "./ParkingAddPage.sass"
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import mock from "/src/assets/default.png"
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const ParkingAddPage = () => {

    const {access_token} = useToken()

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [places_count, setPlacesCount] = useState("")

    const [imgFile, setImgFile] = useState<File | undefined>()
    const [imgURL, setImgURL] = useState<string | undefined>(mock)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImgFile(img)
            setImgURL(URL.createObjectURL(img))
        }
    }

    const addParking = async () => {

        const response = await api.post(`parkings/create/`, {}, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200){
            const parking_id = response.data["id"]
            await updateParking(parking_id)
        }

    }

    const updateParking = async (parking_id) => {

        const form_data = new FormData()

        form_data.append('name', name)
        form_data.append('address', address)
        form_data.append('places_count', places_count)

        if (imgFile != undefined) {
            form_data.append('image', imgFile, imgFile.name)
        }

        const response = await api.put(`parkings/${parking_id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200){
            navigate("/parkings/")
        }
    }


    return (
        <div className="add-page-wrapper">
            <div className="left">

                <img src={imgURL} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={address} setValue={setAddress} />

                    <CustomInput placeholder="Количество мест" value={places_count} setValue={setPlacesCount} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={addParking}>
                            Создать
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ParkingAddPage
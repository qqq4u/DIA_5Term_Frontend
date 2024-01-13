import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import { useState } from 'react'
import Header from "./Components/Header/Header";
import {Parking} from "./Types";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import ParkingPage from "./Pages/ParkingPage/ParkingPage";
import ParkingsList from "./Pages/ParkingsList/ParkingsList";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {

    const [selectedParking, setSelectedParking] = useState<Parking | undefined>(undefined)

    return (
        <BrowserRouter basename="/DIA_5Term_Frontend">

            <div className="App">

                <div className="wrapper">

                    <Header />

                    <div className="content-wrapper">

                        <Breadcrumbs selectedParking={selectedParking} setSelectedParking={setSelectedParking}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/parkings" replace />} />

                            <Route path="/profile" element={<ProfilePage />} />

                            <Route path="/parkings" element={<ParkingsList />} />

                            <Route path="/parkings/:id" element={<ParkingPage selectedParking={selectedParking} setSelectedParking={setSelectedParking} />} />

                        </Routes>

                    </div>

                </div>

            </div>

        </BrowserRouter>
    )
}

export default App

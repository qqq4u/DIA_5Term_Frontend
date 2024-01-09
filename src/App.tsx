import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import ParkingPage from "./pages/ParkingPage/ParkingPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import ParkingsPage from "./pages/ParkingsPage/ParkingsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import TicketConstructor from "./components/TicketConstructor/TicketConstructor";
import TicketPage from "./pages/TicketPage/TicketPage";
import TicketsPage from "./pages/TicketsPage/TicketsPage";
import ParkingEditPage from "./pages/ParkingEditPage/ParkingEditPage";
import ParkingAddPage from "./pages/ParkingAddPage/ParkingAddPage";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("parkings") && <TicketConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/bmstu">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/parkings" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/parkings" element={<ParkingsPage />} />

                                    <Route path="/parkings/add" element={<ParkingAddPage />} />

                                    <Route path="/parkings/:id" element={<ParkingPage />} />

                                    <Route path="/parkings/:id/edit" element={<ParkingEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/tickets/:id" element={<TicketPage />} />

                                    <Route path="/tickets" element={<TicketsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App

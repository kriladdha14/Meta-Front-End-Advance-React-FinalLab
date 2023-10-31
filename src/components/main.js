import React, { useReducer } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Booking from "./booking";
import ConfirmedBooking from "./confirmedBooking";
import Header from "./header";
import { submitAPI,fetchAPI } from '../utilities/dataApi';


const Main = () => {


    const initialState = {availableTimes:  fetchAPI(new Date())}
    const [state, dispatch] = useReducer(updateTimes, initialState);

    function updateTimes(state, date) {
        return {availableTimes: fetchAPI(new Date(date))}
    }
    const navigate = useNavigate();
    function submitForm (formData) {
        if (submitAPI(formData)) {
            navigate("/confirmed")
        }
    }

    return(
        <main className="main">
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/booking" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm}/>} />
                <Route path="/confirmed" element={<ConfirmedBooking/> } />
            </Routes>
        </main>


    )
}

export default Main;
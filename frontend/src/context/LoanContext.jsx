import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";




export const LoanContext = createContext();


export const LoanProvider = ({children}) => {


    const navigate = useNavigate();

    const {authToken} = useContext(UserContext);

    const [loans, setLoan] = useState([]);




    // ===========Loans=======
        useEffect(() => {
            fetch('http://127.0.0.1:5000/history', {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setLoan(data.loans); // Updated to match the backend response
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }, []);
        













    const data = {
        loans

    };
    return(
        <LoanContext.Provider value={data}>
            {children}
        </LoanContext.Provider>

    );
}
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";



export const AdminContext = createContext();


export const AdminProvider = ({children}) => {

    const navigate = useNavigate();
    const {authToken} = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [loanDetails, setLoanDetails] = useState([]);


    // All members
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/members`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setMembers(response.members || []);
        })
        .catch((error) => console.error("Error fetching members:", error));
    }, [loading]);



    // Brodcasting notification
    const brodcastNitification = (title, message, type) =>{
        toast.loading("Sending ...");
        fetch("http://127.0.0.1:5000/broadcast",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`, 
            },
            body: JSON.stringify({
                title,
                message,
                type
            }),
        })
        .then((resp) => resp.json())
        .then((response) =>{
            console.log(response);

            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                navigate("/admin-dashboard");
                setLoading(!loading);
            } else if (response.error){
                toast.dismiss();
                toast.error(response.error)
            }else {
                toast.dismiss();
                toast.error("Failed to send")
            }
        })
    }



    // =====sending notification==
    const sendNotification = (recipient_username, title, message, type) =>{
        toast.loading("Sending ...");
        fetch("http://127.0.0.1:5000/send",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`, 
            },
            body: JSON.stringify({
                recipient_username,
                title,
                message,
                type
            }),
        })
        .then((resp) => resp.json())
        .then((response) =>{
            console.log(response);

            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                navigate("/");
                setLoading(!loading);
            } else if (response.error){
                toast.dismiss();
                toast.error(response.error)
            }else {
                toast.dismiss();
                toast.error("Failed to send")
            }
        })
    }



    // all loans details plus repeyment history
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/loans-repayments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setLoanDetails(response.loans || []);
        })
        .catch((error) => console.error("Error fetching loans:", error));
    }, [loading]);
    












    const data = {
        members,
        brodcastNitification,
        sendNotification,
        loanDetails
    };

    return(
        <AdminContext.Provider value={data}>
            {children}
        </AdminContext.Provider>
    )
}
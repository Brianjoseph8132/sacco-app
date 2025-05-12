import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";





export const  AccountContext = createContext();


export const  AccountProvider = ({children}) => {

    const navigate = useNavigate();

    const { authToken } = useContext(UserContext);

    const [balance, setBalance] = useState(0)
    const [transactions, setTransactions] = useState([]);
    const [onChange, setOnChange] = useState(true);
    const [hasAccount, setHasAccount] = useState(null);
    // const [is_fully_paid, setIsFullyPaid] = useState(false);



    // =============Dashboard==============
    useEffect(() => {
        fetch('http://127.0.0.1:5000/balance', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setBalance(response.balance);
        });
    }, [onChange]);


     // =========Transaction History======
     useEffect(() => {
        fetch('http://127.0.0.1:5000/transaction_history', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            if (Array.isArray(response.transactions)) {
                setTransactions(response.transactions);
            } else {
                setTransactions([]); // fallback to an empty array
                console.warn("No transactions found or invalid response:", response);
            }
        });        
    }, []);

    // // =========Transaction=========

    const addTransactions = (amount, action,pin) => {
        toast.loading("Transacting...");
        fetch("http://127.0.0.1:5000/transaction",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                amount, action, pin
            }),
        })
        .then((resp) => resp.json())
        .then((response) =>{
            console.log(response);

            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                navigate("/dashboard");
            } else if (response.error){
                toast.dismiss();
                toast.error(response.error)
            }else {
                toast.dismiss();
                toast.error("Failed to add")
            }
        })

    }

    // ===========Create Account=====
    const createAccount = (initial_deposit,pin, phone, occupation, id_number) => {
        toast.loading("Creating Account...");
        fetch("http://127.0.0.1:5000/create_account",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                initial_deposit,
                pin,
                phone,
                occupation,
                id_number
            }),
        })
        .then((resp) => resp.json())
        .then((response) =>{
            console.log(response);

            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                navigate("/dashboard");
            } else if (response.error){
                toast.dismiss();
                toast.error(response.error)
            }else {
                toast.dismiss();
                toast.error("Failed to create")
            }
        })

    }


    // ==========Check if the current user if has an account=======
    useEffect(() => {
        fetch('http://127.0.0.1:5000/has_account', {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((response) => response.json())
        .then((response) => {
            setHasAccount(response.has_account);
        });
    }, []);


    // ========LOan Application
    const loanApplication = (amount, purpose, term_months, guarantor_username) => {
        toast.loading("Transacting...");
        fetch("http://127.0.0.1:5000/loan",{
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                amount,
                purpose,
                term_months,
                guarantor_username
            }),
        })
        .then((resp) => resp.json())
        .then((response) =>{
            console.log(response);

            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                navigate("/home");
            } else if (response.error){
                toast.dismiss();
                toast.error(response.error)
            }else {
                toast.dismiss();
                toast.error("Failed to Apply")
            }
        })

    }
    
    // Check if the loan is fully paid
    // useEffect(() => {
    //     fetch(`http://127.0.0.1:5000/check-loan-status/${loan_id}`, {
    //         method: "GET",
    //         headers: {
    //             'Content-type': 'application/json',
    //             Authorization: `Bearer ${authToken}`,
    //         },
    //     })
    //     .then((response) => response.json())
    //     .then((response) => {
    //         setIsFullyPaid(response.is_fully_paid);
    //     });
    // }, [onChange]);
     

    
    


    const data ={
        balance,
        hasAccount,
        transactions,

        createAccount,
        addTransactions,
        loanApplication
    };

    return(
        <AccountContext.Provider value={data}>
            {children}
        </AccountContext.Provider>
    );


}



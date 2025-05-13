import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify"; 




export const LoanContext = createContext();


export const LoanProvider = ({children}) => {


    const navigate = useNavigate();

    const {authToken} = useContext(UserContext);

    const [loans, setLoan] = useState([]);
    const [repayments, setRepayments] = useState([]);
    const [loanDetails, setLoanDetails] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState([])
    const [unreadCount, setUnreadCount] = useState(0);
   




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
                setLoan(data.loans); 
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
        }, [loading]);




        // Repayment
        const addRepayment = (loan_id,amount, payment_method) => {
                toast.loading("Transacting...");
                fetch(`http://127.0.0.1:5000/repayments/${loan_id}`,{
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({
                        amount,
                        payment_method
                    }),
                })
                .then((resp) => resp.json())
                .then((response) =>{
                    console.log(response);
        
                    if (response.success) {
                        toast.dismiss();
                        toast.success(response.success);
                        navigate("/history");
                    } else if (response.error){
                        toast.dismiss();
                        toast.error(response.error)
                    }else {
                        toast.dismiss();
                        toast.error("Failed to Repay")
                    }
                })
        
        }


        // =====Repayment History
        const fetchRepaymentHistory = async (loan_id) => {
            setLoading(true);
            setError(null);
        
            try {
              const response = await fetch(`http://127.0.0.1:5000/history/${loan_id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authToken}`,
                },
              });
        
              if (!response.ok) {
                throw new Error("Failed to fetch repayment history");
              }
        
              const data = await response.json();
        
              // ✅ Set repayments list
              setRepayments(data.repayments);
        
              // ✅ Set loan details (same for every row)
              setLoanDetails({
                loan_amount: data.loan_amount,
                interest_rate: data.interest_rate,
                loan_total_with_interest: data.loan_total_with_interest,
              });
        
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
        };



        //   ===============Notification=============
        useEffect(() => {
            fetch(`http://127.0.0.1:5000/notifications`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => response.json())
            .then((response) => {
                setNotification(response.notifications || []); // Ensure it's always an array
            })
            .catch((error) => console.error("Error fetching notifications:", error));
        }, [loading]);


        // ==> Delete Notification
        const deleteNotification = (notification_id) => {
            toast.loading("Deleting Notification...");
            fetch(`http://127.0.0.1:5000/notification/${notification_id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`, 
                },
            })
            .then((resp) => resp.json())
            .then((response) => {
                toast.dismiss();
                
                if (response.message === "Notification deleted successfully") {
                    toast.success(response.message);
                    setLoading(!loading); 
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("Error deleting notification");
                console.error("Delete Notification Error:", error);
            });
        };

        // ===> Mark as read
        const markAsRead = (notification_id) => {
            toast.loading("marking as Read ...");
            fetch(`http://127.0.0.1:5000/read/${notification_id}`,{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((resp) => resp.json())
            .then((response) =>{
                toast.dismiss();
                
                if (response.message) {
                    toast.success(response.message); 
                    setLoading(!loading);
                }
                else if (response.error){
                    toast.error(response.error);
                }
                else {
                    toast.error("Failed to mark as read");
                }
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("An error occurred while marking as read");
                console.error("Error:", error);
            });
        };



        // ====>fetch count notification
        useEffect(() => {
            if (!authToken) {
                console.warn("No auth token available.");
                return;
            }
        
            fetch("http://127.0.0.1:5000/unread-count", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error(`HTTP error! Status: ${resp.status}`);
                }
                return resp.json();
            })
            .then((response) => {
                setUnreadCount(response.unread_notifications || 0); // Extract count
            })
            .catch((error) => {
                console.error("Error fetching unread notifications:", error);
            });
        }, [authToken,loading]);


        // ===> Mark  all as read 
        const markAllAsRead = () => {
            toast.loading("marking as Read ...");
            fetch("http://127.0.0.1:5000/read-all",{
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((resp) => resp.json())
            .then((response) =>{
                toast.dismiss();
                
                if (response.message) {
                    toast.success(response.message); 
                    setLoading(!loading);
                }
                else if (response.error){
                    toast.error(response.error);
                }
                else {
                    toast.error("Failed to mark as read");
                }
            })
            .catch((error) => {
                toast.dismiss();
                toast.error("An error occurred while marking as read");
                console.error("Error:", error);
            });
        };

        


    const data = {
        loans,
        repayments,

        addRepayment,
        fetchRepaymentHistory,
        loanDetails,

        notification,
        deleteNotification,
        markAsRead,
        unreadCount,
        markAllAsRead

    };
    return(
        <LoanContext.Provider value={data}>
            {children}
        </LoanContext.Provider>

    );
}
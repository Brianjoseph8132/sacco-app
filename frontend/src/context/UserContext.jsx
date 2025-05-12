import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

export const UserContext = createContext()


export const  UserProvider = ({children}) => {
    const navigate = useNavigate()
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"))
    const [current_user, setCurrentUser] =useState(null)

    console.log("Current user:", current_user);


    // LOGIN
    const login = (email, password) => 
        {
            toast.loading("Logging you in ... ")
            fetch("http://127.0.0.1:5000/login",{
                method:"POST",
                headers: {
                    'Content-type': 'application/json',
                  },
                body: JSON.stringify({
                    email, password
                })
            })
            .then((resp)=>resp.json())
            .then((response)=>{
                if(response.access_token){
                    toast.dismiss()
    
                    sessionStorage.setItem("token", response.access_token);
    
                    setAuthToken(response.access_token)
    
                    fetch('http://127.0.0.1:5000/current_user',{
                        method:"GET",
                        headers: {
                            'Content-type': 'application/json',
                            Authorization: `Bearer ${response.access_token}`
                        }
                    })
                    .then((response) => response.json())
                    .then((response) => {
                      if(response.email){
                              setCurrentUser(response)
                            }
                    });
    
                    toast.success("Successfully Logged in")
                    navigate("/")
                }
                else if(response.error){
                    toast.dismiss()
                    toast.error(response.error)
    
                }
                else{
                    toast.dismiss()
                    toast.error("Failed to login")
    
                }
              
                
            })
        };

        // LOGOUT
    const logout = () => 
        {
    
            toast.loading("Logging out ... ")
            fetch("http://127.0.0.1:5000/logout",{
                method:"DELETE",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${authToken}`
                  },
           
            })
            .then((resp)=>resp.json())
            .then((response)=>{
               console.log(response);
               
                if(response.success)
                {
                    sessionStorage.removeItem("token");
    
                    setAuthToken(null)
                    setCurrentUser(null)
    
                    toast.dismiss()
                    toast.success("Successfully Logged out")
    
                    navigate("/login")
    
                }
            })
    
        };

        // Fetch current user
    useEffect(()=>{
        fetchCurrentUser()
    }, [])
    const fetchCurrentUser = () => 
    {
        console.log("Current user fcn ",authToken);
        
        fetch('http://127.0.0.1:5000/current_user',{
            method:"GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
          if(response.email){
           setCurrentUser(response)
          }
        });
    };


    // Add User
    const addMember = (first_name, last_name, username, email, raw_password) => {
        toast.loading("Registering ... ");
        fetch("http://127.0.0.1:5000/members", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                first_name,
                last_name,
                username,
                email,
                password: raw_password
            })
        })
        .then((resp) => resp.json())
        .then((response) => {
            console.log(response);
            if (response.success) {
                toast.dismiss();
                toast.success(response.success);
                navigate("/login");
            } else if (response.error) {
                toast.dismiss();
                toast.error(response.error);
            } else {
                toast.dismiss();
                toast.error("Failed to Add Member");
            }
        });
    };
    









    const data = {
        login,
        authToken,
        current_user,
        logout,
        addMember,
        fetchCurrentUser
    };

    return(
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )

}


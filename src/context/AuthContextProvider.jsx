import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";




export   let authContext = createContext()

export default function AuthContextProvider( {children} ) {

    const [token, setToken] = useState(null)


  const [userId, setuserId] = useState(null)



    // console.log(token);
    

    useEffect( function(){


    let tokenFromLocal = localStorage.getItem("token")

    if(tokenFromLocal!= null ){

        setToken(tokenFromLocal)

        const tokenAfterDecoded = jwtDecode(tokenFromLocal)

        setuserId(tokenAfterDecoded.user)

        console.log("tokenAfterDecoded", tokenAfterDecoded);
        
    }

        
    } , [] )



  return <authContext.Provider value={      {  token , setToken ,userId }     }>
  
  
  {children}
  
  
  
  
  </authContext.Provider>
}

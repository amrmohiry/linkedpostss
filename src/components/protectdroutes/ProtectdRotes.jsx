import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContextProvider'
import { h1 } from 'framer-motion/client'
import { Navigate, useNavigate } from 'react-router-dom'


export default function ProtectdRotes({children}) {


const {token} = useContext(authContext)


if( !token ){

    return <Navigate to={"/login"}/>


}


  return <>
    
    {children}
    
    </>

  
   
 
}

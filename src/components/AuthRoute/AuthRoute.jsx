import React, { useContext } from 'react'
import { authContext } from '../../context/AuthContextProvider'
import { Navigate } from 'react-router-dom'

export default function AuthRoute({children}) {


const {token} = useContext(authContext)

if(token){

    return <Navigate to={"/home"}/>

}



  return <>
  
  {children}
  </>
}

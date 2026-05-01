import React, { useContext } from "react";
import { counterContext } from "../../../context/CounterContext";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";

import {Link, useNavigate} from "react-router-dom"
import { authContext } from "../../../context/AuthContextProvider";

export default function MyNavbar() {


const {token , setToken} = useContext(authContext)

console.log(token);


let nav =useNavigate()


function handelLogOut(){

localStorage.removeItem("token")
setToken(null)
nav("/login")

}





  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">linked post</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">


{token && <>
          <NavbarItem>
            <Link color="foreground" to ={"/home"}>
              Home
            </Link>
          </NavbarItem>

          
          <NavbarItem isActive>
            <Link  aria-current="page" to ={"/profile"}>
              profile
            </Link>
          </NavbarItem>
</>}

        </NavbarContent>
        <NavbarContent justify="end">


            { token ? <NavbarItem >

            <Button className="hidden lg:flex bg-red-500 p-1.5 rounded-xl text-white" onClick={handelLogOut}>logout</Button>

          </NavbarItem> : <>
          
          
          <NavbarItem className="hidden lg:flex">


            {}

            <Link to={"/login"}>Login</Link>

          </NavbarItem>

          <NavbarItem>


            <Button as={Link} color="primary" to={"/signup"} variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
          
          
          
          
          </> }






          
        </NavbarContent>
      </Navbar>
    </>
  );
}

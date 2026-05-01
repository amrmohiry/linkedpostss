import { useForm } from "react-hook-form"
import { data, Link } from "react-router-dom";

import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { authContext } from "../../../context/AuthContextProvider";
// import { schema } from './../../../../node_modules/@hookform/resolvers/ajv/src/__tests__/__fixtures__/data';


let schema = z.object({
  email:z.email("invailed email"),
  password :z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,"invalid pass"),
})




export default function Login() {
  


 let {handleSubmit , register,formState,watch} =  useForm({
  defaultValues : {
    email : "",
    password : "",


  },resolver:zodResolver(schema)

 })

  console.log(formState.errors);
  
  const navigate = useNavigate();



   let {setToken} =  useContext(authContext)



  const [successMsg, setSuccessMsg] = useState(null)

  const [errorMsg, setErrorMsg] = useState(null)

  const [loding, setLoding] = useState(null)
  

  async function myHandleSubmit(  values  ){
    console.log( values );

    

    

      try{

        setLoding(true)

          const {data} = await axios.post("https://route-posts.routemisr.com/users/signin",values)
    
    console.log(data);

    setSuccessMsg(data.message)

          setToken(data.data.token)

          localStorage.setItem("token" , data.data.token )


    setTimeout(() => {
          setSuccessMsg(null)

    }, 900);
    setTimeout(() => {
      navigate("/");
    }, 1000);
    
      }catch(error){
        console.log(error.response.data.errors);
        setErrorMsg(error.response.data.errors)
        setLoding(false);
      }
    
  }

  

  return<>
  
  <div className=' bg-green-100 p-5 py-12 rounded-xl '>

  <h1 className='text-5xl font-bold animate-bounce mb-5'>LogIn Now</h1>

      { errorMsg &&  <p className="bg-red-600 p-4 text-white text-xl rounded-2xl"> {errorMsg} </p> }

      { !errorMsg &&  successMsg &&  <p className="bg-green-500 p-4 text-white text-xl rounded-2xl"> {successMsg} </p>  }

  <form onSubmit={ handleSubmit(  myHandleSubmit  ) }>



    <div className='flex flex-col'>

      <label htmlFor="Email" className='m-1 font-medium text-l'>Email <span className='text-red-600'>*</span> </label>
      <input {...register("email")} id='Email' placeholder='xxxxxxxxxxxxx@gmail.com' type="email" className=' border rounded-xl py-2 px-2' />
      
            {formState.errors.email && <p className="bg-red-500 text-white text-md p-2 rounded-xl mt-0.5">{formState.errors.email?.message}</p> }

    </div>

    <div className='flex flex-col'>

      <label htmlFor="password" className='m-1 font-medium text-l'>password <span className='text-red-600'>*</span> </label>
      <input {...register("password")} id='password' placeholder='Your password' type="password" className=' border rounded-xl py-2 px-2' />

              {formState.errors.password && <p className="bg-red-500 text-white text-md p-2 rounded-xl mt-0.5">{formState.errors.password?.message}</p> }

    </div>










{loding ?<button disabled className='bg-blue-700 p-3 mt-3 flex justify-center items-center rounded-2xl my-2 text-xl  text-amber-50 font-bold cursor-pointer w-full'><DNA
visible={true}
height="40"
width="40"
ariaLabel="dna-loading"
wrapperStyle={{}}
wrapperClass="dna-wrapper"
/></button> :
    <button className='bg-blue-700 p-3 mt-3 rounded-2xl my-2 text-xl  text-amber-50 font-bold cursor-pointer w-full'>LogIn Now</button> }


      



  </form>

  </div>
  
  
  
  </>
}

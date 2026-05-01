import React from 'react'

export default function Profile() {

        const token = localStorage.getItem("token")



    async function myProfile(){

        const {data} = await axios.post( `https://route-posts.routemisr.com/users//profile`, {} , {
                // headers : localStorage.getItem(`token`)
                headers: {
            Authorization: `Bearer ${token}`
        }
            })
            console.log(data);
            

    }






  return (
    <>
    

                    <title>Profile Page</title>

    
    
    <div>Profile page</div>
    
    
    
    </>
  )
}

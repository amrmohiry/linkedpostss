import React, { useContext, useEffect, useState } from 'react'
import PostCard from '../post/PostCard'
import { data, useParams } from 'react-router-dom'
import axios from 'axios'
import { authContext } from '../../context/AuthContextProvider'
import PostLoding from '../post/PostLoding'
import { useQuery } from '@tanstack/react-query'

export default function PostData() {


    const {postId} = useParams()
    const {token} = useContext(authContext)
    // const [post, setPost] = useState(null)
    // const [loding, setLoding] = useState(true)

    function getPostData(){

        return axios.get(`https://route-posts.routemisr.com/posts/${postId}`, {
            headers: {
            Authorization: `Bearer ${token}`
        }
        })

        // console.log(data);

        // setPost(data.data.post)
        // setLoding(false)
        
    }



            const{ data ,isError ,isFetched  ,isLoading , error }= useQuery({
            queryFn: getPostData ,
            queryKey: ["postData", postId]
        })
            


        if(isLoading){

            return <PostLoding/>

        }

        if(isError){

            return <h1>error 404</h1>

        }

    // useEffect( function(){
    //     getPostData()
    // } ,[])
    

  return <>
  
  <PostCard post={data.data.data.post}/> 

  
  
  
  
  
  
  
  </>
}

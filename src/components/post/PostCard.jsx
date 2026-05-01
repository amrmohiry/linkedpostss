import React, { useContext, useRef } from 'react'

import { authContext } from '../../context/AuthContextProvider'
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button, Image, User} from "@heroui/react";
import { AiOutlineLike } from 'react-icons/ai';
import { FaComment, FaShare } from 'react-icons/fa';
import PostComment from './PostComment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@heroui/react";
import { BsThreeDots } from 'react-icons/bs';



export default function PostCard({post}) {




        const commentInput = useRef(null)
        const token = localStorage.getItem("token")

        const {userId} =useContext(authContext)

        async function creatComment(){

            const commentData ={
                content: commentInput.current.value , 
            }
            console.log(commentData);
            

            const {data} = await axios.post( `https://route-posts.routemisr.com/posts/${post._id}/comments`, commentData , {
                // headers : localStorage.getItem(`token`)
                headers: {
            Authorization: `Bearer ${token}`
        }
            })

            console.log(data);
            

        }



    
  return<>
  
  
  
  
  
   <Card className="max-w-3xl my-3 mx-auto">

      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={post.user.photo}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{post.user.name}</h4>

            <Link to={`/postData/${post._id}`}>
            
            <h5 className="text-small tracking-tight text-default-400">{new Date(post.createdAt).toLocaleString("en-eg",{
              year :"numeric",
              month :"short" ,
              day : "numeric" ,
              hour : "numeric",
              minute : "2-digit"
            })}</h5>

            </Link>
            
          </div>
        </div>
        
            {   post.user._id == userId ? <Dropdown>
                            <DropdownTrigger>
                                <Button  variant="light"> <BsThreeDots/> </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Static Actions">
                                <DropdownItem key="edit">Edit post</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">
                                Delete post
                                </DropdownItem>
                            </DropdownMenu>
                    </Dropdown> : ""    }

                     



      </CardHeader>

      <CardBody className="px-3 py-0 text-small ">
        <p>{post.body}</p>
        {post.image &&  <Image
      alt={post.alt}
      // width={300}
      // height={300}
      src={post.image}
      
    />}
      </CardBody>

      <CardFooter className="block">

        <div className='gap-3 flex justify-around'>
          <div className='flex items-center cursor-pointer'>
          <p className='m-1'><AiOutlineLike className='text-blue-700' /></p>
          <p>like</p>
        </div>
        <div className='flex  items-center  cursor-pointer'>
          <p className='m-1'><FaComment /></p>
          <p>comment</p>
        </div>
        <div className='flex  items-center  cursor-pointer'>
          <p className='m-1'><FaShare /></p>
          <p>share</p>
        </div>
        </div>

        <div className='flex items-center gap-2 w-full'>

            <input type="text" ref={commentInput} className='w-full border rounded-2xl p-3  my-2' placeholder='enter your comment' />

            <Button onClick={creatComment} className='bg-sky-600 text-white'> Comment </Button>
            
        </div>

        <div className='comments'>

          {post.topComment && ( <PostComment key={post.topComment._id}  post={post}/>  )}

        </div>
        
      </CardFooter>

    </Card> 
  
  
  
  
  
  
  
  
  
  
  
  
  </>
}

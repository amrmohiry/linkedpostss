import React, { useContext, useEffect, useRef, useState } from 'react'
import Test from '../test/Test'
import axios from 'axios'
import PostCard from '../post/PostCard'
import { authContext } from '../../context/AuthContextProvider'
import PostLoding from '../post/PostLoding'
import { useQuery } from '@tanstack/react-query'
// import{imageUrl} from `../../assets/react.svg`
// import {Post}  from './../../../node_modules/react-router/dist/development/index.d';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  toast,
} from "@heroui/react";
import { Helmet } from 'react-helmet'


export default function Home() {

const {isOpen, onOpen, onOpenChange} = useDisclosure();

let {token} =  useContext(authContext)


const PostBoudyInput = useRef(null)


const imageInput = useRef(null)

  const [imageUrl, setImageUrl] = useState(null)


  function clearImage(){

    setImageUrl(null)

    imageInput.current.value = ""


  }

function handleImagePreview (){

const imageFile = imageInput.current.files[0]

console.log(imageFile);

const imagePath = URL.createObjectURL(imageFile)

console.log(imagePath);

setImageUrl(imagePath)


}






useEffect(function() {
  console.log("Token value:", token) 
  getAllPosts()
}, [])




function getAllPosts(){





      return axios.get("https://route-posts.routemisr.com/posts" , {
    
      headers :{
              Authorization: `Bearer ${token}`
      } 
    })
    

    
    // console.log(data.data.posts);
    
    // setPosts(data.data.posts)

    // setLoding(false)
  
// } catch (error) {
  
//   console.log(error);
  

// }




}

const {  data, isLoading , isError , isFetching  ,error ,refetch   } =useQuery(    {

  queryFn : getAllPosts ,
  queryKey : "posts"

}       )


async function creatPost(){

  // console.log(PostBoudyInput.current.value);
  // console.log(imageInput.current.files);

  const formData = new FormData()

  if(PostBoudyInput.current.value){
    
    formData.append("body", PostBoudyInput.current.value )

  }
  if(imageInput.current.files[0]){
    
    formData.append("image", imageInput.current.files[0] )

  }

  const {data} =await axios.post("https://route-posts.routemisr.com/posts",formData , {
        
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
            // Authorization: `Bearer ${token}`
        }

  })

  console.log(data);
  
  if(data.message == `post created successfully`){
    clearImage()
    PostBoudyInput.current.value = ""

    // toast.success("Post Add")
    onOpenChange(false)

    refetch()
  }


}



    if(isLoading) {

      return <PostLoding/>

    }

    if(isError){

      return <h1>errrror</h1>

    }




  return <>
  
                  {/* <Helmet> */}

                    <title>Home Page</title>

                  {/* </Helmet> */}

      <Button onPress={onOpen} className='w-9/12  mx-auto block '>What is your mind</Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">creat post</ModalHeader>

              <ModalBody>


                <textarea name="" ref={PostBoudyInput} rows={5} className='shadow border rounded-2xl p-2' placeholder='enter your post body' id=""></textarea>
                
                <input ref={imageInput} onChange={ handleImagePreview } type="file" id='fileInput' className='hidden' />
                <label htmlFor="fileInput" className='bg-gray-200 p-3 w-fit rounded-2xl cursor-pointer'>upload photo</label>
                
                {imageUrl ? <div className='relative'>
                  <button onClick={clearImage} className=' bg-red-600 text-white cursor-pointer p-1 rounded-2xl absolute top-5 right-5'> X </button>
                  <img src={imageUrl} alt="" />
                </div> : ""}


              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={creatPost}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    


  {/* {loding? <PostLoding/> : posts.map((post)=> <PostCard key={post._id}  post={post} />  )} */}

      {data.data.data.posts.map((post)=> <PostCard key={post._id}  post={post} />)}


  
  
  
  
  
  </>
}

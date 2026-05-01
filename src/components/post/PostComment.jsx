import { User } from '@heroui/react'
import React from 'react'

export default function PostComment({post}) {



    
    
  return<>
  
  
  
  
  
  
  <div className='comment bg-gray-100 p-3 rounded-2xl my-3'>
              <User
                avatarProps={{
                  src: post.topComment.commentCreator.photo,
                }}
                description={post.topComment.content}
                name={post.topComment.commentCreator.name}
              />
      </div>
  
  
  
  
  
  
  
  
  </>
}

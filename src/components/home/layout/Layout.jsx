import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../navbar/Navbar'

export default function Layout() {




  return<>
  
  <Navbar/>


  <div className='container bg-blue-100 rounded-2xl mx-auto p-5  max-w-5xl '>

  <Outlet/>
  
  </div>


  <footer> footer</footer>
  
  </>
}

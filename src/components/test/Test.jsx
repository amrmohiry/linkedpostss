import React, { useContext } from 'react'
import { counterContext } from '../../context/CounterContext'

export default function Test({children}) {

    let x = useContext(counterContext)
    console.log(x);
    
    
  return (
    <div>
        Test
        
    </div>
  )
}

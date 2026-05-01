import React, { createContext, useState } from 'react'


export let counterContext = createContext()


export default function CounterContextProvider({children}) {

const [counter, setCounter] = useState(10)



function incCounter(){

    setCounter( counter +1)
}

  return <> 
  
    <counterContext.Provider value={       { number : counter , inc : incCounter   }        }>
        {children}
    </counterContext.Provider>
  
  
  
  </>
}


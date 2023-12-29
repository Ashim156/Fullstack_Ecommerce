import { useEffect } from 'react';
import { useState } from 'react'

import { Audio } from  'react-loader-spinner'
import { useNavigate,useLocation } from 'react-router-dom';

const Spinner = ({path="/login"}) => {
    const [count,setCount]= useState(5);
    const navigate=useNavigate()
    const location = useLocation()

 useEffect(()=>{
   const interval=setInterval(()=>{
    setCount((prevValue)=>--prevValue)
   },1000);
   count=== 0 && navigate(`/${path}`,{state:location.pathname})
   return ()=> clearInterval(interval)

    },[count,navigate,location,path])
  return (
    
<>

  <div className='  text-3xl w-[100vw] h-[100vh] mx-auto max-w-7xl  flex flex-col justify-center items-center'>

    <h1>Redirecting To You In {count} second...</h1>
  <Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  /></div>



  </>
  )
}

export default Spinner

import { useEffect } from 'react';
import { useState } from 'react'

import { Audio } from  'react-loader-spinner'
import { useNavigate,useLocation } from 'react-router-dom';

const Spinner = ({path="/login"}) => {
    const [count,setCount]= useState(2);
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
{count}
<Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'green'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
  </>
  )
}

export default Spinner

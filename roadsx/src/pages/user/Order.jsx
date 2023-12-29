
import Layout from '../../components/layout/Layout'


import { useAuth } from '../../context/Auth'
import UserMenu from '../../components/layout/UserMenu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'


const Order = () => {
  const[auth,setAuth]=useAuth()
  const [order,setOrder]=useState([])


  const orders=async()=>{
    try {
     const {data}=await axios.get("http://localhost:8080/api/v1/auth/orders")
      setOrder(data)
    } catch (error) {
     console.log("error")
    }
  }
  useEffect(()=>{
    if(auth?.token)orders()
  },[auth?.token])
  return (
    <Layout>

      <div className='grid grid-cols-3 mt-7 '>
       
      <UserMenu/>
    
<div className='grid col-span-2 mr-44 ss:-ml-32 md:-ml-48 -z-50 '>
    <h1 className='text-4xl ss:text-2xl font-serif text-center mb-7 '>ORDERS</h1>
    
  {order?.map((orders,index)=>{
      return(
        <>
      <div className='ss:w-[30rem] sm:w-[30rem] md:w-[44rem] flex  border justify-evenly  text-black bg-gray-200 shadow-inner  shadow-gray-300 rounded-full '>
    <div className='flex flex-col'>
    <h1 className='text-bold ss:text-xl sm:text-xl text-3xl font-serif '>S.N</h1>
    <h1 className='text-bold ss:text-xl sm:text-xl text-2xl font-serif text-bold '>{`${index+1}.`}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='ss:text-xl sm:text-xl text-bold text-3xl font-serif text-bold '>Buyer</h1>
    <h1 className='ss:text-xl sm:text-xl text-bold text-2xl font-serif '>{orders?.buyer?.name}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='ss:text-xl sm:text-xl text-bold text-3xl font-serif text-bold '>Payment</h1>
    <h1 className='ss:text-xl sm:text-xl text-bold text-2xl font-serif '>{orders?.payment?.success?"success":"failed"}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='ss:text-xl sm:text-xl text-bold text-3xl font-serif text-bold '>Time</h1>
    <h1 className=' ss:text-sm sm:text-xl text-bold text-2xl font-serif '>{moment(orders?.createdAt).fromNow()}</h1>
    </div>
    <div className='flex flex-col '>
    <h1 className='ss:text-xl sm:text-xl text-bold text-3xl font-serif text-bold  '>Stauts</h1>
    <h1 className='ss:text-xl sm:text-xl text-bold text-2xl font-serif '>{orders?.status}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='ss:text-xl sm:text-xl text-bold text-3xl font-serif text-bold '>Items</h1>
    <h1 className='ss:text-xl sm:text-xl text-bold text-2xl font-serif '>{orders?.products?.length}</h1>
    </div>
   
   </div>
   <div className=" h-full grid grid-cols-3  mt-7 mb-6">
        <div className="grid col-span-2">
          <div >{orders?.products?.map((p)=>(
          <>
          <div className=" flex gap-7 shadow-xl mb-7 rounded-br-3xl ">
         <img className="h-[150px] ml-6 ss:h-14" src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}  alt={p.name}/>
         <div className="font-serif flex flex-col">

            <div>Name: {p.name}</div>
            <div>Price: {`$${p.price}`}</div>
            <div>Description:
              <br /> {p.description.substring(0,100)}...</div>
           
            </div>
            
         </div>
         

           
 
          
          </>))}</div>

        

        </div>
        </div>
    


    
        

        </>
      )
    })}
    

  </div>
  

   </div>
   

    </Layout>
  )
}

export default Order

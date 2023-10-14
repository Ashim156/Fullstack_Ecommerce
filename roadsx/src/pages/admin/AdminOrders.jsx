
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'

import { useAuth } from '../../context/Auth'
import { Select } from 'antd'
import { Option } from 'antd/es/mentions'
const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Process",
        "Processing",
        "Shipped",
        "deliverd",
        "cancel",
      ]);
      const [changeStatus, setCHangeStatus] = useState("");
    const[auth,setAuth]=useAuth()
    const [order,setOrder]=useState([])
  
    const orders=async()=>{
      try {
       const {data}=await axios.get("http://localhost:8080/api/v1/auth/all-orders")
        setOrder(data)
      } catch (error) {
       console.log("error")
      }
    }
    useEffect(()=>{
      if(auth?.token)orders()
    },[auth?.token])

    const handleChange = async (orderId, value) => {
        try {
          const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
            status: value,
          });
          orders();
        } catch (error) {
          console.log(error);
        }
      };

  return (
   <>
 
   <Layout>
    <div className='grid grid-cols-3 mt-7 '>
      <AdminMenu/>
      <div className='grid col-span-2 mr-44 '>
    <h1 className='text-4xl font-serif text-center mb-7 '>All ORDERS</h1>

  <div>
  {order?.map((orders,index)=>{
      return(
        <>
              <div className='flex  border justify-evenly  text-black bg-gray-200 shadow-inner shadow-gray-300 rounded-full '>
    <div className='flex flex-col'>
    <h1 className='text-bold text-3xl font-serif '>S.N</h1>
    <h1 className='text-bold text-2xl font-serif text-bold '>{`${index+1}.`}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='text-bold text-3xl font-serif text-bold '>Buyer</h1>
    <h1 className='text-bold text-2xl font-serif '>{orders?.buyer?.name}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='text-bold text-3xl font-serif text-bold '>Payment</h1>
    <h1 className='text-bold text-2xl font-serif '>{orders?.payment?.success?"success":"failed"}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='text-bold text-3xl font-serif text-bold '>Time</h1>
    <h1 className='text-bold text-2xl font-serif '>{moment(orders?.createdAt).fromNow()}</h1>
    </div>
    <div className='flex flex-col'>
    <h1 className='text-bold text-3xl font-serif text-bold '>Stauts</h1>
     <Select size='large'
                          bordered={false}
                          onChange={(value) => handleChange(orders._id, value)}
                          defaultValue={orders?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
    </div>
    <div className='flex flex-col'>
    <h1 className='text-bold text-3xl font-serif text-bold '>Items</h1>
    <h1 className='text-bold text-2xl font-serif '>{orders?.products?.length}</h1>
    </div>
   
   </div>
   <div className=" h-full grid grid-cols-3  mt-7 mb-6">
        <div className="grid col-span-2">
          <div >{orders?.products?.map((p)=>(
          <>
          <div className=" flex gap-7 shadow-xl mb-7 rounded-br-3xl ">
         <img className="h-[150px] ml-6 " src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}  alt={p.name}/>
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
 
   </div>
    </Layout>

   </>
  )
}

export default AdminOrders

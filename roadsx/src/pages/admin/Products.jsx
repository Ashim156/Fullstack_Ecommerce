import { useEffect, useState } from "react"

import AdminMenu from "../../components/layout/AdminMenu"
import Layout from "../../components/layout/Layout"

import toast  from "react-hot-toast"
import axios from "axios"
import { Link } from "react-router-dom"


const Products = () => {
    const [products,setProducts]=useState([])
   const getAllProducts=async()=>{
    try {
        const {data}= await axios.get("http://localhost:8080/api/v1/product/get-product")
        
        if(data?.success){
          setProducts(data.product)
          console.log("dataa",data)
        }
       } catch (error) {
        toast.error("error")
       
        
       }

    }
    useEffect(()=>{
      getAllProducts()
    },[])
  
  return (<>
    <Layout>

    <div className='grid grid-cols-3 h-full w-[95%] bg-white '>
   <AdminMenu/>
<div className='  text-center grid col-span-2 place-content-center text-6xl text-green-900 '> 
<h1 className="text-[4rem] font-serif text-black">Products List</h1>
<div className="grid grid-cols-3 gap-2">
{products?.map((p)=>(


<>
<Link to={`/dashboard/admin/update-product/${p.slug}`} key={p._id} >
<div className="w-full bg-white border  shadow-2xl    rounded-lg">
<div className="flex justify-center">
                <img className="p-8 rounded-t-lg object-fit h-52 w-full mb-3 " src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </div>
                <div className="px-5 pb-5 text-center mb-3">
        
                    <h5 className="text-xl mb-2 font-bold  text-black">{p.name}</h5>
                    <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">{`${p.description.substring(0,45)}...`}</span>
                   
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl mt-3 mb-3 font-bold text-gray-700">{`$${p.price}`}</span>
                   
                </div>
                </div>



</div>

</Link>
</>




   ))}
    


    </div>
 
</div>
 </div>
 


 </Layout>
 </>
)
}

export default Products

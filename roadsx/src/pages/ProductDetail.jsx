import { useEffect, useState } from "react"
import Layout from "../components/layout/Layout"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from "../context/cart";


const ProductDetail = () => {
    const params=useParams()
    const [product,setProduct]=useState({});
    const [similar,setSimilar]=useState([])
    const [cart,setCart]=useCart([])
    const navigate=useNavigate()

    const getSimilarProduct=async(pid,cid)=>{
 try {
  const {data}=await axios.get(`http://localhost:8080/api/v1/product/get-similar/${pid}/${cid}`)
setSimilar(data?.products)

 } catch (error) {
  console.log(error)
  
 }

  
    }
    


    const getProducts=async()=>{
        try {
            const {data}=await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.singleProduct)
            getSimilarProduct(data?.singleProduct._id, data?.singleProduct.category._id)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        if(params?.slug) getProducts()
    },[params?.slug])

  

  return (
    <div>
      <Layout>


  
      
       <h1 className='text-2xl font-serif text-center flex pt-4 justify-center'>Product Details</h1>
       <div className="grid grid-cols-3 " >
        <div className='bg-white min-h-[45vh]  '>
            <img className="ml-4" src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt="" />
            
        </div>
        <div className='bg-white border-x-4 col-span-2 '>
            <h1 className="text-lg ml-5 font-bold mt-3">Name: <br />
            </h1>
            <h6 className="text-2xl font-serif ml-8">{product.name}</h6>
            <h1 className="text-lg ml-5 font-bold mt-3 ">Description: <br />
            </h1>
            <h6 className="text-sm font-serif  w-[70%] ml-8">{product.description}</h6>
            <h1 className="text-lg font-bold ml-5 mt-3">Price:<br />
            </h1>
            <h6 className="text-4xl font-serif ml-8">{`$${product.price}`}</h6>
            <button className='text-black border-black border-y-2 rounded-full hover:bg-black hover:text-white hover:rounded-full px-3 py-1 text-lg font-base mb-2 ml-6' onClick={()=>{setCart([...cart,product])
                   localStorage.setItem('cart',JSON.stringify([...cart,product]))}}>
                      <FaShoppingCart size={25} />
                    </button>
          
       </div>
       </div>
       <hr />
    
        
      
       <div className="text-center font-serif   mt-5 mb-5 text-2xl">Similar Products</div>
        <div className="flex gap-3">
           
            <div>{similar.length<1 && ( <p>no similar product was found</p> )}</div>
        {similar?.map(p=>(
        <>
         <div  key={p._id} >
        <div  className="w-full bg-white border  shadow-2xl  rounded-lg">
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
                <div  className='flex gap-3 cursor-pointer'>
                 
                  <button className='text-black border-black border-y-2 rounded-full hover:bg-black hover:text-white hover:rounded-full px-3 py-1 text-lg font-base mb-2' onClick={()=>{setCart([...cart,p])
                   localStorage.setItem('cart',JSON.stringify([...cart,p]))}}>
                      <FaShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
        </div>
        </>
        
        ))}
      </div> 

      </Layout>
    </div>
  )
}

export default ProductDetail

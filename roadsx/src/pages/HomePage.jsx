
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox,Radio } from 'antd';
import { price } from '../components/Price';
import useCategories from '../Hooks/useCategories';
import { useCart } from '../context/cart';
import { FaShoppingCart } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import Marquee from "react-fast-marquee";
import lambo from '../assets/lambo.png'
import fer from '../assets/ferrari.jpg'
import ford from '../assets/ford.jpg'
import jaguar from '../assets/jaguar.png'
import mercedes from '../assets/mercedes.png'
import toyota from '../assets/toyota.png'
import offer1 from '../assets/offer1.jpg'
import offer2 from '../assets/offer2.jpg'
import offer4 from '../assets/offer3.jpg'

import { Carousel } from 'antd';
// import { useGlobalState } from '../context/validation';



const HomePage = () => {
//   const [isLoggedIn]=useGlobalState("isLoggedIn")
//   const[loadings]=useGlobalState("loading")
// useEffect(()=>{
//   const iniloggedIn = localStorage. getItem("isLoggedIn");
//   const loggedIn = iniloggedIn
//   == null ? false: true
//   setGlobalState("isLoggedIn", loggedIn);
//   const data = localStorage. getItem("data");
//   const finalData = data !== null ? JSON.parse (data) : {};
//   setGlobalState("currentUser", {
//   ...finalData });
//   setGlobalState ("loading", false)
// },[])
  const navigate=useNavigate()
  // const[globalState,setGlobalState]=useGlobalState()
  const categories=useCategories();
  const[product,setProduct]=useState([]);
  const [category,setCategory]=useState([]);
  const [checked,setChecked]=useState([])
  const [radio,setRadio]=useState([]);
  const[total,setTotal]=useState(0)
const[page,setPage]=useState(1)
const [loading,setLoading]=useState(false)
const [cart,setCart]=useCart([])


  const getAllCategory=async()=>{
    try {
     const {data}=await axios.get("http://localhost:8080/api/v1/category/get-category")
     if(data?.success){
       setCategory(data.category)
      
       
     }
    } catch (error) {
     toast.error("something went wrong")
     
    }
   }
   useEffect(()=>{
    getAllCategory()
    getTotal()
    },[total])



  const getProducts=async()=>{
    try {
      setLoading(true)
      const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
      setLoading(false)
    setProduct(data?.pagination)
      
    } catch (error) {
      setLoading(false)
      console.log(error)
      
    }

    }
   
    // filter by category
    const filterC=(value,id)=>{
      let all= [...checked]
      if(value){
        all.push(id)

      }
      else{
        all=all.filter((c)=>c!==id)
      }
setChecked(all);    
    }
    useEffect(()=>{
      if(!checked.length || !radio.length) getProducts()
     },[checked.length,radio.length])
     useEffect(()=>{
       if(checked.length || radio.length) filterProduct()
       
      },[checked,radio])


    // get filtered product
const filterProduct=async()=>{
try {
  const {data}=await axios.post("http://localhost:8080/api/v1/product/filter-product",{checked,radio});
setProduct(data?.product)

} catch (error) {
  console.log(error)
  
}
}


//total
const getTotal=async()=>{
  try {
    const {data}=await axios.get("http://localhost:8080/api/v1/product/product-count")
  setTotal(data?.total)
    
  } catch (error) {
    console.log(error)
    
  }
  
}
//loadmore

const load=async()=>{
  try {
    setLoading(true)
    const {data}=await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`)
    setLoading(false);
   
    setProduct([...product, ...data?.pagination])
  setTotal(data?.total)
    
  } catch (error) {
    setLoading(false)
    console.log(error)
    
  }
}
useEffect(()=>{
  if (page===1) return;
  load()
  
},[page])

  return (
  <>
  <Layout >
      <Carousel autoplay className='max-w-7xl mx-auto mb-20 shadow-lg shadow-black'>
      <img className='h-[600px]' src={offer2} alt="Partner" />
          <img className='h-[600px]' src={offer1} alt="Partner" />
     
      <img className='h-[600px]' src={offer4} alt="Partner" />
  
  </Carousel>
          <div className='text-4xl mb-12 text-gray-600 font-serif text-center'>Our Partners</div>

    <Marquee className='mb-12'>
       <img className='h-40' src={lambo} alt="Partner" />
      <img className='h-40' src={ford} alt="Partner" />
      <img className='h-40' src={fer} alt="Partner" />
      <img className='h-40' src={jaguar} alt="Partner" />
      <img className='h-40' src={mercedes} alt="Partner" />
      <img className='h-40' src={toyota} alt="Partner" />
    </Marquee>
    <div className=' w-full bg-white grid grid-cols-4 '>
      <div className='grid grid-rows-2 z-10 max-h-[128vh]  '>
        <div className='bg-white  w-full '>
       <div className='flex gap-2 justify-start mt-14'> <BiCategory size={30}/>  <h1 className='text-2xl '>Category</h1>
       </div><hr />
          {/* <div>{categories.map(c=> (<><div>
            {c.name}
          </div> </>))}</div> */}
          {/* {JSON.stringify(checked,null,4)} */}
          <div >
          
              {category?.map(c=>(
                <>
                <Checkbox className='flex flex-row text-lg hover:translate-x-2 ml-8 mt-6' key={c._id} onChange={((e)=>filterC(e.target.checked,c._id))}>
                 
                  {c.name}
                  
                  

                </Checkbox>
                <hr className='m-3' />
                </>

              ))}
            

          </div>

        </div>
        <div className='w-full  bg-white'>
        <div className='flex gap-2 justify-start mt-14'> <BiCategory size={30}/>  <h1 className='text-2xl '>Price Range</h1>
       </div><hr />
        {/* {JSON.stringify(radio,null,4)} */}
        <div >
    
          
        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                {price?.map(p=>(
                 <>
                 
                  <div className='flex flex-row text-[20px] mt-6 ml-8' key={p._id}>
                 <Radio  value={p.value}  >
                  {p.name}
                  
                 </Radio>
                 
              
                 </div>
                
              
                 </>
                 
                ))}
               
                </Radio.Group>

            

          </div>
          <div className="relative left-14">
         <button  className='text-white bg-black border-black border-y-2 rounded-full hover:bg-white hover:text-black  hover:rounded-full px-3 py-1 text-lg mt-7 font-base mb-2 w-24 'onClick={()=>window.location.reload()}>Reset</button>
        </div>
        </div>
      
        
      </div>
      <div className='grid sm:overflow-hidden col-span-3  text-black'>
  
      <div className="grid gap-3 grid-cols-1 lg:grid-cols-3 justify-items-stretch">
        {product?.map(p=>(
        <>
        <div  key={p._id} >
        <div  className="w-full bg-white border  shadow-2xl    rounded-lg">
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
                  <button className='text-black border-black border-y-2  rounded-full hover:bg-black hover:text-white  hover:rounded-full px-3 py-1 font-base mb-2 text-lg'  onClick={()=>navigate(`product/${p.slug}`)}>More Info</button>
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
     <div className='text-center'>
      {product && product.length < total &&(
      <button className='text-white bg-black border-black border-y-2 rounded-full hover:bg-white hover:text-black  hover:rounded-full px-3 py-1 text-lg mt-7 font-base mb-2 w-32 ' onClick={(e)=>{e.preventDefault();
        setPage(page+1)
        
      }}

      >
      {loading?"Loading...":"Loadmore"}
      </button> )}
      </div>
      </div>
    </div>

  </Layout>
</>
  )
}

export default HomePage

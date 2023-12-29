
import axios from 'axios';
import Layout from '../components/layout/Layout';
import { useEffect, useState } from 'react';
import toast  from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Checkbox,Divider,Radio } from 'antd';
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
import ParticlesLoader from '../components/particles/ParticlesLoader';
import { TbCategory2 } from "react-icons/tb";

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
const [drop, setDrop]=useState(false)


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
   
    // eslint-disable-next-line no-unsafe-optional-chaining
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
useEffect(() => {
  window.addEventListener('popstate', (e) => {

    window.history.go(1);
    
  });
}, []);

  return (
  <>
  <Layout >
  
      <Carousel autoplay className='max-w-7xl mx-auto mb-20 -z-10 shadow-lg shadow-black h-full ss:h-[5rem] ss:w-[20rem] ss:mb-[33rem] sm:w-[33rem] sm:h-[13rem] sm:mb-[27rem] md:w-[45rem] lg:w-[60rem]'>
     
      <img className='h-[600px] ss:h-[35rem]' src={offer2} alt="Partner" />
          <img className='h-[600px] ss:h-[35rem]' src={offer1} alt="Partner" />
     
      <img className='h-[600px] ss:h-[35rem]' src={offer4} alt="Partner" />
  
  </Carousel>

  
          <div className='text-4xl mb-12 ss:mb-2 sm:mb-2 text-gray-600 font-serif text-center ss:text-3xl sm:text-3xl'>Our Partners</div>

    <Marquee className='mb-12 ss:h-[8rem] sm:h-[8rem]'>
       <img className='h-40 sm:h-[6rem] ss:h-[6rem]' src={lambo} alt="Partner" />
      <img className='h-40 ss:h-[6rem] sm:h-[6rem]' src={ford} alt="Partner" />
      <img className='h-40 ss:h-[6rem] sm:h-[6rem]' src={fer} alt="Partner" />
      <img className='h-40 ss:h-[6rem] sm:h-[6rem]' src={jaguar} alt="Partner" />
      <img className='h-40 ss:h-[6rem] sm:h-[6rem]' src={mercedes} alt="Partner" />
      <img className='h-40 ss:h-[6rem] sm:h-[6rem]' src={toyota} alt="Partner" />
    </Marquee>


    
    <div className='relative'>
       <div className='flex justify-start items-center  text-lg font-inter font-bold lg:hidden xl:hidden md:hidden 2xl:hidden'><TbCategory2 size={'3rem'} className='cursor-pointer' onClick={()=>{setDrop(!drop)}}/> <h1 className=' text-gray-400'>Add Filter</h1></div> 
        {drop && (<>
            <div className='bg-white  w-[80%] lg:hidden xl:hidden md:hidden 2xl:hidden '>
            <div className='flex gap-2 justify-start'>  <h1 className='text-2xl '>Category</h1>
            </div><hr />
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
             <div className='flex gap-2 justify-start mt-14 lg:hidden xl:hidden md:hidden 2xl:hidden'> <BiCategory size={30}/>  <h1 className='text-2xl lg:hidden xl:hidden md:hidden 2xl:hidden '>Price Range</h1>
            </div><hr />
             {/* {JSON.stringify(radio,null,4)} */}
             <div >
         
               
             <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                     {price?.map(p=>(
                      <>
                      
                       <div className='flex flex-row text-[20px] mt-6 ml-8 lg:hidden xl:hidden md:hidden 2xl:hidden' key={p._id}>
                      <Radio  value={p.value}  >
                       {p.name}
                       
                      </Radio>
                      
                   
                      </div>
                     
                   
                      </>
                      
                     ))}
                    
                     </Radio.Group>
     
                 
     
             
               </div>
               <div className="relative left-14">
              <button  className='text-white bg-black border-black border-y-2 rounded-full hover:bg-white hover:text-black  hover:rounded-full px-3 py-1 mt-3 mb-3 font-base w-24 text-sm lg:hidden xl:hidden md:hidden 2xl:hidden'onClick={()=>window.location.reload()}>Reset</button>
             </div>
             </div>
           
             
           </>
        )}

        </div>
    <div className=' w-full ss:flex sm:flex grid grid-cols-4   '>
  
      <div className='grid grid-rows-2 z-10 max-h-[128vh] ss:hidden sm:hidden  '>
       
        <div className='bg-white  w-full h-full '>
       <div className='flex gap-2 justify-start mt-14'> <BiCategory size={30}/>  <h1 className='text-2xl '>Category</h1>
       </div><hr />
          {/* <div>{categories.map(c=> (<><div>
            {c.name}
          </div> </>))}</div> */}
          {/* {JSON.stringify(checked,null,4)} */}
          <div>
      
          
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
        <div className='w-full bg-white'>
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
   
      <div className='grid sm:overflow-hidden col-span-3  text-black ss:flex ss:flex-col  '>
  
      <div className="grid gap-3  grid-cols-3 ss:grid-cols-1 sm:grid-cols-1 justify-items-stretch">
        {product?.map(p=>(
        <>
        <div  key={p._id} >
        <div  className="w-full ss:w-[18rem] ss:h-[26rem] ss:ml-9  sm:w-[24rem] sm:h-[26rem] sm:ml-40  bg-white border  shadow-2xl    rounded-lg">
          <div className="flex justify-center">
                <img className="p-8 rounded-t-lg  h-52 w-full mb-3 " src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </div>
        
            <div className="px-5 pb-5 text-center mb-3">
        
                    <h5 className="text-xl mb-2 font-bold  text-black">{p.name}</h5>
                    <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">{`${p.description.substring(0,45)}...`}</span>
                   
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl mt-3 mb-3 font-bold text-gray-700">{`Rs.${p.price}`}</span>
                   
                </div>
                <div  className='flex gap-3 cursor-pointer'>
                  <button className='text-black border-black border-y-2  rounded-full hover:bg-black hover:text-white  hover:rounded-full px-3 py-1 font-base mb-2 text-lg md:h-8 md:text-sm'  onClick={()=>navigate(`product/${p.slug}`)}>More Info</button>
                  <button className='text-black border-black border-y-2 rounded-full hover:bg-black hover:text-white hover:rounded-full px-3 py-1 text-lg font-base mb-2' onClick={()=>{setCart([...cart,p])
                   localStorage.setItem('cart',JSON.stringify([...cart,p]));toast.success(`${p.name} added to cart`);}}>
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
      <button className='ss:w-24 ss:text-sm sm:w-24 sm:text-sm text-white bg-black border-black border-y-2 rounded-full hover:bg-white hover:text-black  hover:rounded-full px-3 py-1 text-lg mt-7 font-base mb-2 w-32 ' onClick={(e)=>{e.preventDefault();
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

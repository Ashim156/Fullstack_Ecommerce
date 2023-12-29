import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import{useSearch} from '../context/Search'

import { useCart } from '../context/cart';
import { FaShoppingCart } from 'react-icons/fa';

const SearchPage = () => {
    const[values,setValues]=useSearch()
const [cart,setCart]=useCart([])
  return (
    <>
   <Layout>
   <h1 className='text-2xl capitalize text-center'> {values?.result.length < 1?"No Result Found":`Found ${values?.result.length} Results`}</h1>
   <div className="grid gap-3 grid-cols-3 ss:grid-cols-2 sm:grid-cols-2">
        {values?.result.map(p=>(
        <>
        <Link  key={p._id} >
        <div className="w-full bg-white border  shadow-2xl    rounded-lg">
<div className="flex justify-center ">
                <img className="p-8 rounded-t-lg object-fit h-52 w-full mb-3 " src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                </div>
                <div className="px-5 pb-5 text-center mb-3 ss:h-32 sm:h-32">
        
                    <h5 className="text-xl mb-2 font-bold  text-black">{p.name}</h5>
                    <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-700">{`${p.description.substring(0,45)}...`}</span>
                   
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-2xl mt-3 mb-3 font-bold text-gray-700">{`$${p.price}`}</span>
                   
                </div>
                </div>
                <div  className='flex gap-3 cursor-pointer'>
                 
                  <button className='text-black ml-12 border-black border-y-2 rounded-full hover:bg-black hover:text-white hover:rounded-full px-3 py-1 text-lg font-base mb-2' onClick={()=>{setCart([...cart,p])
                   localStorage.setItem('cart',JSON.stringify([...cart,p]))}}>
                      <FaShoppingCart size={18} />
                    </button>
                </div>



</div>
        </Link>
        </>
        
        ))}
      </div>

   </Layout>
    </>
  )
}

export default SearchPage

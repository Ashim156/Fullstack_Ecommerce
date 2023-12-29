import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout"
import { useAuth } from "../context/Auth"
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast  from "react-hot-toast";

const CartPage = () => {
  const [cart,setCart]=useCart()
  const [auth]=useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const [pay,setPay]=useState(false)

const removeCart=(id)=>{
try {
  let myCart=[...cart]
  let index= myCart.findIndex((item)=> item._id===id);
  myCart.splice(index,1)
  
setCart(myCart)
localStorage.setItem('cart',JSON.stringify(myCart))
  
} catch (error) {
  console.log(error)
}

}

//total

const total=()=>{
try {
  let sum=0;
  cart?.map(i=>sum=sum+i.price);
  return sum.toLocaleString("en-US",{
    style:"currency",
    currency:"USD"
  })
} catch (error) {
  console.log(error)
  
}
}
 //get payment gateway token
 const getToken = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/v1/product/braintree/token");
    setClientToken(data?.clientToken);
  } catch (error) {
    console.log(error);
  }
};
useEffect(() => {
  getToken();
}, [auth?.token]);

//handle payment
const handlePayment = async () => {
  try {
    setLoading(true);
    const { nonce } = await instance.requestPaymentMethod();
    const { data } = await axios.post("http://localhost:8080/api/v1/product/braintree/payment", {
      nonce,
      cart,
    });
    setLoading(false);
    localStorage.removeItem("cart");
    setCart([]);
    navigate("/dashboard/user/order");
    toast.success("Payment Completed Successfully ");
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

  return (
    <Layout className=''>
      <div className="min-h-[100vh]">
<div className="w-full max-w-7xl mx-auto ">
      <div className=" text-center">
        <h1 className="font-bold text-2xl font-serif">Hello,{auth?.token && auth?.user?.name}</h1>
      <h2 className="font-bold font-serif text-base">{cart.length>0?`You Have ${cart.length} Items In Your Cart. ${auth?.token ?"":"Please Login To View Your Cart"}`:"There Is No Items In Your Cart"}</h2>
      </div>

      <div className=" h-full grid grid-cols-3  mt-7 ">
        <div className="grid col-span-2 ">
          <div className="ss:w-64 " >{cart.map((p)=>(
          <>
          {auth?.token?  <div className=" grid shadow-lg grid-cols-3 mb-8 ss:w-52 sm:w-80">
         <img className="h-[150px] sm:h-[120px] ss:h-[120px] ml-6 ss:ml-0 " src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}  alt={p.name}/>
         <div className="font-serif flex flex-col ml-12">

            <div>Name: {p.name}</div>
            <div>Price: {`$${p.price}`}</div>
            <div className="ss:hidden sm:hidden">Description:
              <br /> {p.description.substring(0,100)}...</div>
              <button className='w-24 mt-4 mb-2 rounded-full bg-red-600 text-white ss:w-20 ss:text-sm sm:w-20 sm:text-sm' onClick={()=>{removeCart(p._id);
              toast.success(`${p.name} Removed`);}}>Remove</button>
            </div>
            
         </div>:""}
         

           
 
          
          </>))}</div>

        

        </div>
        <div className="flex flex-col h-36  font-serif   ">

    
            <h1 className="ss:text-lg sm:text-lg text-center font-extrabold text-2xl ">
            CART SUMMARY</h1>

            <h1 className="text-center text-3xl ss:text-lg sm:text-lg font-mono">
            
            {total()}</h1>

              {auth?.user?.address?(<>
              <div className="flex flex-col items-center">
                <h1  className="text-center text-lg  font-semibold">CURRENT ADDRESS</h1>
                <h1 className="text-center text-lg font-semibold">{auth?.user?.address}</h1>
                  <button  className='bg-blue-600 text-white hover:bg-teal-500 rounded-full h-10 w-32 ss:w-24 ss:text-sm sm:w-24 sm:text-sm ss:h-7 sm:h-7' onClick={() => navigate("/dashboard/user/profile ")}>Update Profile</button>
                </div>
              </>) : (<div>
                {auth?.token ? (<button  onClick={() => navigate("/dashboard/user/profile")}>Update Profile</button>
                ) : (<>   <h1 className="text-2xl font-serif ss:w-24 ss:text-sm  sm:w-24 sm:text-sm">Please login...</h1>
                  <button className="text-2xl text-white ss:w-24 ss:text-sm sm:w-24 sm:text-sm bg-blue-500 w-32 rounded-full hover:bg-blue-900 " onClick={() => navigate("/login",{state:"/cart"})}>Login</button>
                  </>)}
              </div>
              )}
                <div className="mt-2 ml-3 flex flex-col items-center lg:hidden md:hidden 2xl:hidden  ">
                  <button onClick={()=>{setPay(!pay)}} className="rounded-full bg-blue-600 text-white hover:bg-teal-500 w-24 h-7 mr-2">Check Out</button>
               <div className={!pay?"hidden":'flex'}>
               {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                  <div className="flex flex-col relative right-20 mt-5">
                    <DropIn 
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className=" rounded-full bg-blue-600 text-white hover:bg-teal-500 w-32 h-10 ml-32 "
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                    </div>
                  </>
                )}

               </div>
              </div>

               <div className="mt-2 ml-3 flex flex-col items-center ss:hidden sm:hidden  ">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn 
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className=" rounded-full bg-blue-600 text-white hover:bg-teal-500 w-32 h-10 ml-3"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>

        </div>
      
          
        </div>
      </div>
      </div>
 
      
   
    </Layout>
  )
}

export default CartPage

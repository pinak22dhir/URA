import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'




const PlaceOrder = () => {

  const{navigate,backendUrl,token,cartItems,setCartItems,getCartamount,delivery_fee,products} = useContext(ShopContext);

  const [method,setMethod ]= useState('cod');
  const [formData,setFormData] = useState({
   name:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    phone:''
  })

  const onChangeHandler =(e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData({...formData,[name]:value})



  }

  const initPay = (order) => {
    const options = {
      key:`${import.meta.env.VITE_RAZORPAY_KEY_ID}`, // Replace with your Razorpay Key
      amount: order.amount, 
      currency: order.currency,
      name: "order payemnt",
      description: "Order Payment",
      order_id: order.id,
      receipt : order.receipt,
      handler: async (response) => {
        // Handle payment success
        console.log("Payment successful", response);
       
        try {
          const { data } = await axios.post(backendUrl + "/api/order/verifyRazorpay", response, { headers: { token } });
         

          if(data.success){
            navigate("/orders");
          
            setCartItems({});
          }
        } catch (error) {
          console.error("Error verifying Razorpay payment:", error);
          toast.error("Failed to verify payment. Please contact support.");
          
        }
      }
      
    };
  
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
   
  
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const itemInfo = products.find((product) => product._id === itemId);
          if (itemInfo) {
            orderItems.push({
              ...itemInfo,
              quantity: cartItems[itemId],
            });
          }
        }
      }
  
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartamount() + (delivery_fee || 0),
      };
  
      switch (method) {
        case "cod":
          const response = await axios.post(backendUrl + "/api/order/place", orderData, { headers: { token } });
          if (response.data.message === "Order Placed Successfully") {
            setFormData({
              name: "",
              email: "",
              street: "",
              city: "",
              state: "",
              zipcode: "",
              phone: "",
            });
            setMethod("cod");
            navigate("/orders");
            setCartItems({});
          } else {
            toast.error(response.data.message);
          }
          break;
  
        case "stripe":
          const responseStripe = await axios.post(backendUrl + "/api/order/stripe", orderData, { headers: { token } });
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
  
          case "razorpay":
            try {
              const responseRazorpay = await axios.post(
                backendUrl + "/api/order/razorpay",
                orderData,
                { headers: { token } }
              );
              console.log(responseRazorpay); // Log the response
              if (responseRazorpay.data.success) {
                initPay(responseRazorpay.data.order);
              } else {
                toast.error(responseRazorpay.data.message || "Failed to initialize Razorpay payment.");
              }
            } catch (error) {
              console.error("Error in Razorpay API call:", error); // Log the error
              toast.error("Failed to connect to Razorpay. Please try again.");
            }
            break;
          
  
        default:
          toast.error("Invalid payment method selected.");
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      toast.error("Failed to place the order. Please try again.");
    }
  };
  
  return (
          <form onSubmit={onSubmitHandler}>
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-2xl'>
          <h1 className='font-semibold text-center'>SHIPPING DETAILS</h1>
        </div>
  
        <div className='flex flex-col gap-4'>
          <input required onChange={onChangeHandler} name='name' value={formData.name}  className='border px-2 py-1' type='text' placeholder='Full Name'></input>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone}  className='border px-2 py-1' type='text' placeholder='Phone Number'></input>
          <input required onChange={onChangeHandler} name='email' value={formData.email}  className='border px-2 py-1' type='text' placeholder='Email'></input>
          <input required onChange={onChangeHandler} name='street' value={formData.street} id className='border px-2 py-1' type='text' placeholder='Address'></input>
          <input required onChange={onChangeHandler} name='city' value={formData.city} className='border px-2 py-1' type='text' placeholder='City'></input>
          <input required onChange={onChangeHandler} name='state' value={formData.state}  className='border px-2 py-1' type='text' placeholder='State'></input>
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border px-2 py-1' type='text' placeholder='Zip Code'></input>
        </div>
      </div>


      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')}  className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full  ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt=" "></img>
            </div>
            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} alt=" "></img>
            </div>
            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div  className='w-full text-end mt-8'>
            <button type='submit'  className='bg-red-500 text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
         
        </div> 
      </div>
      
    </div>
    </form>
  )
}

export default PlaceOrder

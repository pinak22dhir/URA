import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";


const currency = 'usd'
const deliveryCharge =10
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async(req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'COD',
            payment:false,
            date:Date.now(),

        }
        console.log("items",orderData.items);
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.status(200).json({message:"Order Placed Successfully"})




    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
        
    }

}

const placeOrderStripe = async(req,res)=>{
    try {
        const {userId,items,amount,address} = req.body;
        const {origin} = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:'Stripe',
            payment:false,
            date:Date.now(),

        }
        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item) =>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name,
                    
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity,
        }))

        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:"Delivery fee",
                    
                },
                unit_amount:deliveryCharge*100,
            },
            quantity:1,
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success = true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success = false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
        })

        res.json({success:true,session_url:session.url});
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Internal Server Error"})
        

    }

}
//verify stripe 
const verifyStripe = async(req,res)=>{
    const {orderId,success,userId} = req.body;
    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true}); 
            await userModel.findByIdAndUpdate(userId,{cartData:{}});
            res.json({success:true,message:"Payment Success"});

        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment Failed"});
        }
    } catch (error) {
        res.json({success:false,message:"Internal Server Error"});
        
    }
}

const placeOrderRazorpay = async(req,res)=>{

}
const allOrders = async(req,res)=>{

    try {
        const orders = await orderModel.find({});
        res.json({success:true,orders});
    } catch (error) {
        res.json({success:false,message:"Internal Server Error"})
        
    }
}

const userOrders = async(req,res)=>{
    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true,orders});



        
    } catch (error) {
        res.json({success:false,message:"Internal Server Error"})
        
    }

}

const updateStatus = async(req,res)=>{

}

export {verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus};
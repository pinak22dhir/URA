import express from 'express';
import {verifyStripe,placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus} from '../controllers/orderController.js';
import { verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';

import authUser from '../middleware/Auth.js';



const orderRouter = express.Router();


orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/user',authUser,userOrders);
orderRouter.post('/status',adminAuth,updateStatus);

orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);

orderRouter.post('/verifyStripe',authUser,verifyStripe);
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay);

export default orderRouter;




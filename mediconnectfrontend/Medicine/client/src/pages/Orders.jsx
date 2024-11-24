import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { toast } from 'react-toastify';
import axios from 'axios';

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        toast.error('User is not logged in. Please log in to view orders.');
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/user`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['date'] = order.date;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            allOrdersItem.push(item);
          });
        });

        setOrderData(allOrdersItem.reverse()); // Latest orders first
      } else {
        toast.error(response.data.message || 'No orders found.');
      }
    } catch (error) {
      console.error('Error loading order data:', error);
      toast.error('Failed to load orders. Please try again.');
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY " text2="ORDERS" />
      </div>
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-500 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.image[0]} // Ensure `image` is an array
                  alt="Product"
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-500">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                  <p className="mt-2">
                    Date:{' '}
                    <span className="text-gray-300">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-400"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="bg-red-500 border px-4 py-2 text-sm font-medium text-white rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">
            No orders found. Start shopping!
          </p>
        )}
      </div>
    </div>
  );
};

export default Orders;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../../../client/src/App';
import { assets } from '../../../client/src/assets/frontend_assets/assets';

const Orders = ({ token }) => {
  const [orderData, setOrderData] = useState([]);

  const fetchOrders = async () => {
    if (!token) {
      toast.error('Please login first');
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      console.log(response.data);
      if (response.data.success) {
        setOrderData(response.data.orders);
      } else {
        toast.error('No orders found');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-bold text-gray-700 mb-6">Orders</h3>
      {orderData.length === 0 ? (
        <p className="text-gray-500 text-center">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderData.map((order, index) => (
            <div
              key={index}
              className="bg-blue-100 border rounded-lg shadow-md p-4 flex flex-col justify-between"
            >
              <div className="flex items-center mb-4">
                <img
                  src={assets.profile_icon}
                  alt="Profile Icon"
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-semibold text-gray-700">{order.address.name}</h4>
                  <p className="text-sm text-gray-500">
                    {order.address.city}, {order.address.state}
                  </p>
                </div>
              </div>
              <div className="mb-4">
                <h5 className="font-semibold text-gray-600 mb-2">Order Details:</h5>
                {order.items.map((item, idx) => (
                  <p key={idx} className="text-gray-600">
                    {item.name} x {item.quantity} {item.size && <span>({item.size})</span>}
                    {idx !== order.items.length - 1 && ','}
                  </p>
                ))}
              </div>
              <div className="mb-4">
                <p className="text-gray-700">
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <p className="text-gray-700">
                  <strong>Status:</strong> {order.status}
                </p>
                <p className="text-gray-700">
                  <strong>Total:</strong> {order.currency} {order.amount}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="border rounded-lg p-2 bg-gray-50 w-full"
                  defaultValue={order.status}
                >
                  <option value="Placed">Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

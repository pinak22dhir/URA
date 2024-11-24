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
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
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
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orderData.map((order, index) => {
            return (
              <div key={index}>
                <img src={assets.profile_icon} alt="Profile Icon" />
                <div>
                  <div>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return (
                          <p key={index}>
                            {item.name} x {item.quantity} <span>{item.size}</span>
                          </p>
                        );
                      } else {
                        return (
                          <p key={index}>
                            {item.name} x {item.quantity} <span>{item.size}</span>,
                          </p>
                        );
                      }
                    })}
                  </div>
                  <p>{order.address.name}</p>
                  <div>
                    <p>
                      {order.address.city}, {order.address.state}
                    </p>
                  </div>
                </div>

                <div>
                  <p>{order.paymentMethod}</p>
                  <p>{order.payment}</p>
                  <p>{order.status}</p>
                </div>
                <p>{order.currency} {order.amount}</p>
                <select>
                  <option value="Placed">Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            );
          })
      
        }
      </div>
    </div>
  );
};

export default Orders;

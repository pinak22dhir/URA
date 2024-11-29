import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        toast.error("User not authenticated.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/user`,
        {},
        { headers: { token } }
      );

      console.log("API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.orders)) {
        let allOrdersItem = [];
        // response.data.orders.forEach((order) => {
        //   if (Array.isArray(order.items)) {
        //     order.items.forEach((item) => {
        //       item["status"] = order.status;
        //       item["date"] = order.date;
        //       item["payment"] = order.payment;
        //       item["paymentMethod"] = order.paymentMethod;
        //       allOrdersItem.push(item);
        //     });
        //   }
        // });
        response.data.orders.forEach(order => {
          const options = {
            status: order.status,
            date: order.date,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            image:order.image ? `${backendUrl}/${order.image}` : "",
          }
          allOrdersItem.unshift(options)
        });
        console.log("Some: ", allOrdersItem)
        console.log(allOrdersItem.length)
        console.log(allOrdersItem)
        if (allOrdersItem.length > 0) {
          console.log("Working")
          // allOrdersItem = allOrdersItem.reverse();
          setOrderData([...allOrdersItem]);
          // setOrderData(prev => {
          //   return allOrdersItem
          // })
        } else {
          toast.error("No orders found.");
        }
      } else {
        toast.error("No orders found.");
      }
    } catch (error) {
      console.error("Error loading order data:", error);
      toast.error("Failed to fetch orders.");
    }
  };
<<<<<<< HEAD
=======
  

  useEffect(() =>{
    loadOrderData()
  },[token]);
>>>>>>> b0bc51d95bfcb025867a9969d6f82bc552627e08

  useEffect(() => {
    if (token) {
      loadOrderData();
    }
  }, [token]);

  useEffect(()=> {
    console.log("Order: ", orderData)
  }, [orderData])

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY "} text2={"ORDERS"} />
      </div>
      <div className="">
        {orderData.length === 0 ? (
          <p className="text-center text-gray-500">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-500 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.image}
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
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
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
                  onClick={() => toast.info(`Tracking order: ${item.name}`)}
                  className="bg-red-500 border px-4 py-2 text-sm font-medium text-white rounded-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

// src/components/customer/CustomerDashboard.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const CustomerDashboard = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // Fetch customer data
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    // Implementation will come when we connect with API
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>
      
      {/* Recent Orders */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${order.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
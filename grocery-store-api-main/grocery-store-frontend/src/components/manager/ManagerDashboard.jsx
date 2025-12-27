// src/components/manager/ManagerDashboard.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const ManagerDashboard = () => {
  const [inventoryStats, setInventoryStats] = useState({
    lowStock: [],
    recentUpdates: [],
  });

  useEffect(() => {
    // Fetch inventory stats
    fetchInventoryStats();
  }, []);

  const fetchInventoryStats = async () => {
    // Implementation will come when we connect with API
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manager Dashboard</h1>
      
      {/* Low Stock Alerts */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Low Stock Alerts</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryStats.lowStock.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{item.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Low Stock
                    </span>
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

export default ManagerDashboard;
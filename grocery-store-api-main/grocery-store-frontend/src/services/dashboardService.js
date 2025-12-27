// src/services/dashboardService.js
import axiosInstance from '../utils/axios';

const dashboardService = {
  getAdminDashboardData: async () => {
    try {
      const [users, products, categories, orders] = await Promise.all([
        axiosInstance.get('/users/'),
        axiosInstance.get('/products/'),
        axiosInstance.get('/products/categories/'),
        axiosInstance.get('/orders/')
      ]);

      // Calculate statistics
      console.log(users.data);
      console.log(products.data);
      console.log(categories.data);
      console.log(orders.data);
      const stats = {
        totalUsers: users.data.count || 0,
        totalProducts: products.data.count || 0,
        totalOrders: orders.data.count || 0,
        revenue: orders.data.results.reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0)
      };

      console.log(stats);

      // Format orders for chart data
      const salesData = processSalesData(orders.data);

      // Get recent orders
      const recentOrders = orders.data.results
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5);

      return {
        stats,
        salesData,
        recentOrders
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      throw error;
    }
  }
};

// Helper function to process sales data
const processSalesData = (orders) => {
  const monthlyData = {};
  const today = new Date();
  
  // Initialize last 6 months with zero values
  for (let i = 5; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    monthlyData[monthYear] = {
      revenue: 0,
      orders: 0
    };
  }

  // Process orders
  orders.results.forEach(order => {
    const date = new Date(order.created_at);
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
    
    if (monthlyData[monthYear]) {
      monthlyData[monthYear].revenue += parseFloat(order.total_amount || 0);
      monthlyData[monthYear].orders += 1;
    }
  });

  return Object.entries(monthlyData).map(([month, data]) => ({
    month,
    ...data
  }));
};

export default dashboardService;
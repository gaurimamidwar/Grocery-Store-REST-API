// src/services/productService.js
import axios from '../utils/axios';

const productService = {
  // Category Services
  getAllCategories: async () => {
    const response = await axios.get('/products/categories/');
    return response.data.results;
  },

  getCategoryById: async (id) => {
    const response = await axios.get(`/products/categories/${id}/`);
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await axios.post('/products/categories/', categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await axios.put(`/products/categories/${id}/`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    await axios.delete(`/products/categories/${id}/`);
    return id;
  },

  // Product Services
  getAllProducts: async (params = {}) => {
    const { 
      page = 1, 
      search = '', 
      category = '', 
      min_price = '', 
      max_price = '' 
    } = params;

    let url = `/products/?page=${page}`;
    if (search) url += `&search=${search}`;
    if (category) url += `&category=${category}`;
    if (min_price) url += `&min_price=${min_price}`;
    if (max_price) url += `&max_price=${max_price}`;

    const response = await axios.get(url);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await axios.get(`/products/${id}/`);
    return response.data;
  },

  createProduct: async (productData) => {
    try {
      const response = await axios.post('/products/', productData);
      return response.data;
    } catch (error) {
      console.error('Create product error:', error.response);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await axios.put(`/products/${id}/`, productData);
      return response.data;
    } catch (error) {
      console.error('Update product error:', error.response);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    await axios.delete(`/products/${id}/`);
    return id;
  },

  searchProducts: async (query) => {
    const response = await axios.get(`/products/search/?query=${query}`);
    return response.data;
  },

  getProductsByCategory: async (categoryId) => {
    const response = await axios.get(`/products/?category=${categoryId}`);
    return response.data;
  }
};

export default productService;
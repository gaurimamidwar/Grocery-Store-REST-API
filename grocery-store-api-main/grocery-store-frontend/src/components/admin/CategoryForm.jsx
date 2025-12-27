// src/components/admin/CategoryForm.jsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory, updateCategory } from '../../features/products/productSlice';

const CategoryForm = ({ category, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: category?.name || '',
    description: category?.description || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (category) {
        await dispatch(updateCategory({ id: category.id, ...formData })).unwrap();
      } else {
        await dispatch(createCategory(formData)).unwrap();
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 
                   hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 
                   focus:ring-gray-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                   disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : (category ? 'Update' : 'Create')}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
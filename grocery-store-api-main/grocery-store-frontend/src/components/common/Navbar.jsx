// src/components/common/Navbar.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Grocery Store
            </Link>
            
            {user && (
              <div className="ml-10 flex space-x-4">
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                )}
                {user.role === 'admin' && (
                    <Link to="/admin/products" className="text-gray-600 hover:text-gray-900">
                    Products
                  </Link>
                )}
                {user.role === 'admin' && (
                    <Link to="/admin/orders" className="text-gray-600 hover:text-gray-900">
                        Orders
                  </Link>
                )}

                {user.role === 'manager' && (
                  <Link to="/manager/dashboard" className="text-gray-600 hover:text-gray-900">
                    Dashboard
                  </Link>
                )}
                
                {user.role === 'customer' && (
                  <Link to="customer/cart" className="text-gray-600 hover:text-gray-900">
                    Cart
                  </Link>
                )}

                {user.role === 'customer/orders' && (
                    <Link to="/orders" className="text-gray-600 hover:text-gray-900">
                        Orders
                    </Link>
                )}
                
              </div>
            )}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
// src/components/common/RoleBasedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBasedRoute = ({ children, roles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default RoleBasedRoute;
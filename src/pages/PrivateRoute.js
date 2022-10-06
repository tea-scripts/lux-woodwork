import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default PrivateRoute;

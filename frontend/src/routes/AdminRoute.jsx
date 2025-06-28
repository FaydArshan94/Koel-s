import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser || !currentUser.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;

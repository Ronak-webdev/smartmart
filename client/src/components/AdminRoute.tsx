import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const AdminRoute = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && (!user || !user.isAdmin)) {
      toast.error("Unauthorized: Admin access required.");
    }
  }, [user, loading]);

  if (loading) return null;

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;

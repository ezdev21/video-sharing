import { useAuthStore } from "@/store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const loggedIn = useAuthStore(state => state.loggedIn)
  return loggedIn ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;
import { lazy, Suspense } from "react";
import Fallback from "./Fallback";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = lazy(() => import("./AuthLayout"));

const Wrapper = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <Navigate to="/login" />;

  return (
    <Suspense fallback={<Fallback />}>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </Suspense>
  );
};

export default Wrapper;

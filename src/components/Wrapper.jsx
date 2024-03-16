import { lazy, Suspense } from "react";
import Fallback from "./Fallback";
import { Outlet } from "react-router-dom";

const AuthLayout = lazy(() => import("./AuthLayout"));

const Wrapper = () => {

  return (
    <Suspense fallback={<Fallback />}>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </Suspense>
  );
};

export default Wrapper;

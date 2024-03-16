import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { paths } from "./path";
import Wrapper from "../components/Wrapper";
import Fallback from "../components/Fallback";
import PageNotFound from "../pages/PageNotFound";

import Login from "../pages/Login";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: paths.login,
      element: (
        <Suspense fallback={<Fallback />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/", // Parent route for common layout
      element: <Wrapper />,
      children: [
        // Nested routes with content-specific components
        {
          path: paths.home,
          element: <Home />,
        },
        // ... other routes
      ],
    },
    {
      path: paths.home, // Parent route for common layout
      element: <Wrapper />,
      children: [
        // Nested routes with content-specific components
        {
          path: "/products/:id",
          element: <ProductDetail />,
        },
        // ... other routes
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;

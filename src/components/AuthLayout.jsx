import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { initFlowbite } from "flowbite";
const AuthLayout = ({ children }) => {
  useEffect(() => {
    initFlowbite();

    return () => {
      // destroyFlowbite();
    };
  });
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  );
};

export default AuthLayout;

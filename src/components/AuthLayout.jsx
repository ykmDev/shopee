import Footer from "@/components/Footer";
import { useEffect } from "react";
const AuthLayout = ({ children }) => {
  useEffect(() => {
    return () => {};
  });
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;

import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { useEffect } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import Logo from "@/assets/images/loginLogo.jpg";
import { FaTruckLoading } from "react-icons/fa";
// import "assets/styles/login.css";

const LoginForm = ({ form, onSubmit, isLoading }) => {
  useEffect(() => {
    const fieldErrorsExists = Object.keys(form.errors).length > 0;

    if (fieldErrorsExists) {
      Object.entries(form.errors).forEach(([key, value]) => {
        toast.error(value);
      });
      form.clearErrors();
    }
  }, [form.errors]);

  return (
    <div className="login-blk">
    <div className="login-logo">
      <img src={Logo} alt="logo"/>
    </div>
    <div className="login-container">
      <form id="login-form"
      onSubmit={form.onSubmit((value) => onSubmit(value))}
      >
        
        <h2 className="login-ttl">Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username"
          {...form.getInputProps("username")}
          required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password"
          {...form.getInputProps("password")}
          required/>
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? <Spinner /> : "Login"}</button>
      </form>
    </div>
  </div>
  );
};

export default LoginForm;

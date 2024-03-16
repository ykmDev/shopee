import { useEffect } from "react";
import toast from "react-hot-toast";

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
    <div className="sp-center">
      <div className="login-blk">
        <div className="login-logo">
          <i className="fa-solid fa-store"></i>
          <span>Shop</span>
        </div>
        <div className="login-container">
          <form
            id="login-form"
            onSubmit={form.onSubmit((value) => onSubmit(value))}
          >
            <h2 className="login-ttl">Login</h2>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                {...form.getInputProps("username")}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                {...form.getInputProps("password")}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

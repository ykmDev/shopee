import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { paths } from "../routes/path";
import { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
    // validate: {
    //   admin_id: (value) =>
    //     value && /^\d{4}$/.test(value) ? null : "Invalid AdminID",
    //   password: (value) =>
    //     value && value.length > 3
    //       ? null
    //       : "Password must be grater than 3 characters",
    // },
  });

  const onSubmitHandler = async (value) => {
    setIsLoading(true);
    // Get the csrf cookie
    // await axiosInstance.get("/sanctum/csrf-cookie");

    // Try to login and store the user obj in redux store
    try {
      console.log(value);
      // start only Local
      const data =
        {
          "id": 15,
          "username": value.username,
          "email": value.username+"@qq.com",
          "firstName": "Jeanne",
          "lastName": "Halvorson",
          "gender": "female",
          "image": "https://robohash.org/Jeanne.png?set=set4",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMDU2OTgzMCwiZXhwIjoxNzEwNTczNDMwfQ.--aauMtLvPfPgtc2pBDru2l3xH08DLbsYgtgT1NbZAU"
      };
      localStorage.setItem("user", JSON.stringify(data));
      toast.success("Login Success!");
      dispatch(setUser(data));
      setIsLoading(false);
      // end only Local

      // const res = await axiosInstance.post("/auth/login", value);
      // toast.success(res.data.payload.message);
      // dispatch(setUser(res.data.payload.user));

      // localStorage.setItem("user", JSON.stringify(res.data.payload.user));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // toast.error(error.response.data.message);
      return;
    }

    navigate(paths.home);
  };

  return (
    <LoginForm form={form} onSubmit={onSubmitHandler} isLoading={isLoading} />
  );
};

export default Login;

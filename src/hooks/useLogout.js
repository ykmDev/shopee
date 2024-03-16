import { useDispatch } from "react-redux";
import { clearUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("api/v1/logout");

      dispatch(clearUser());

      localStorage.removeItem("user");

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return () => {
    Swal.fire({
      title: "အကောင့်ထွက်မည်",
      background: "#fafafa",
      text: "သေချာပါသလား။",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မထွက်သေးပါ။",
    }).then((result) => {
      if (result.isConfirmed) {
        handleLogout();
      }
    });
  };
};

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import config from "../config/config";
import { paths } from "../routes/path";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const handleUnBanUser = async (id) => {
    try {
      await axiosInstance.delete(`${config.baseUrl}blacklists/${id}`);

      toast.success("လုပ်ဆောင်ချက်အောင်မြင်ပါသည်။");
      navigate(paths.yawgi);
    } catch (error) {
      console.error("UnBanUser error:", error);
      history.back();
    }
  };

  return (id) => {
    Swal.fire({
      background: "#fafafa",
      text: "သေချာပါသလား။",
      title: "မကန့်သတ်တော့မှာ",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မသေချာပါ",
    }).then((result) => {
      if (result.isConfirmed) {
        handleUnBanUser(id);
      }
    });
  };
};

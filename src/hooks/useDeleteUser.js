import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/path";

export default () => {
  // Soft delete the yawgi
  const navigate = useNavigate()
  const handleDeleteYawgi = async (userID) => {
    try {
      await axiosInstance.delete(`${config.baseUrl}users/${userID}`);

      toast.success("အသုံးပြုသူအား ဖျက်လိုက်ပါပြီ");
      navigate(paths.deleted_yawgi_list)
    } catch (error) {
      console.error("Delete user error:", error);
      toast.error("တစ်ခုခုမှားယွင်းသွားပါသည်။ ပြန်လုပ်ကြည့်ပါ။");
      history.back();
    }
  };

  return (userID) => {
    Swal.fire({
      title: "ဖျက်ရန်",
      background: "#fafafa",
      text: "သေချာပါသလား။",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#991B1B",
      cancelButtonColor: "#166534",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မဖျက်တော့ပါ။",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteYawgi(userID);
      }
    });
  };
};

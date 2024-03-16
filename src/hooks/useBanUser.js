import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/path";

export default () => {
  const navigate = useNavigate();
  const handleBanUser = async (id, reason) => {
    try {
      await axiosInstance.post(`${config.baseUrl}blacklists`, {
        user_id: id,
        reason,
      });
      toast.success("အသုံးပြုသူအား ပိတ်ပင်လိုက်ပါပြီ");
      navigate(`${paths.black_list}`);
    } catch (error) {
      console.error("BanUser error:", error);
      history.back();
    }
  };

  return (id, reason) => {
    Swal.fire({
      title: "ပိတ်ပင်ရန်",
      background: "#fafafa",
      text: "သေချာပါသလား။",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မပိတ်ပင်တော့ပါ",
    }).then((result) => {
      if (result.isConfirmed) {
        handleBanUser(id, reason);
      }
    });
  };
};

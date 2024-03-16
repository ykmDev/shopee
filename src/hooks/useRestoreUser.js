import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import config from "../config/config";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/path";
import { useQueryClient } from "@tanstack/react-query";

export default () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleRestoreUser = async (id) => {
    try {
      await axiosInstance.put(`${config.baseUrl}users/restore/${id}`);

      toast.success("လုပ်ဆောင်ချက်အောင်မြင်ပါသည်။");
      queryClient.invalidateQueries({ queryKey: ["deletedUsers"] });
      navigate(`${paths.deleted_yawgi_list}`);
    } catch (error) {
      console.error("RestoreUser error:", error);
      history.back();
    }
  };

  return (id) => {
    Swal.fire({
      title: "မဖျက်တော့မှာ",
      background: "#fafafa",
      text: "သေချာပါသလား။",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မသေချာပါ",
    }).then((result) => {
      if (result.isConfirmed) {
        handleRestoreUser(id);
      }
    });
  };
};

import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";

export default (id) => {
  const handleApproveUser = async () => {
    try {
      // await axiosInstance.post("api/v1/");

      toast.success("အသုံးပြုသူအား ခွင့်ပြုလိုက်ပါပြီ");
    } catch (error) {
      console.error("ApproveUser error:", error);
    }
  };

  return () => {
    Swal.fire({
      title: "ခွင့်ပြုရန်",
      background: "#fafafa",
      text: "သေချာပါသလား။",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မခွင့်ပြုတော့ပါ",
    }).then((result) => {
      if (result.isConfirmed) {
        handleApproveUser();
      }
    });
  };
};

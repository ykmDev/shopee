import Swal from "sweetalert2";
import toast from "react-hot-toast";
import axiosInstance from "../axios/axiosInstance";
import config from "../config/config";
import { useQueryClient } from "@tanstack/react-query";

export default () => {
  const queryClient = useQueryClient();

  const handleRemoveUserFromEvent = async (eventID, userID) => {
    try {
      await axiosInstance.delete(
        `${config.baseUrl}events/${eventID}/users/${userID}`
      );
      toast.success("အသုံးပြုသူအား တရားစခန်းပွဲမှဖယ်လိုက်ပါပြီ");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    } catch (error) {
      console.error("Remove user from event error:", error);
      toast.error("Somethin went wrong");
    }
  };

  return (eventID, userID, username) => {
    Swal.fire({
      title: `${username} အား ယခုတရားစခန်းပွဲမှဖယ်ရှားရန်`,
      background: "#fafafa",
      text: "သေချာပါသလား။",
      icon: "warning",
      iconColor: "#806331",
      showCancelButton: true,
      confirmButtonColor: "#166534",
      cancelButtonColor: "#991B1B",
      confirmButtonText: "သေချာပါသည်။",
      cancelButtonText: "မဖယ်တော့ပါ။",
    }).then((result) => {
      if (result.isConfirmed) {
        handleRemoveUserFromEvent(eventID, userID);
      }
    });
  };
};

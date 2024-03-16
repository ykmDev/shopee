import { FaSpinner } from "react-icons/fa";
const GlobalLoading = () => {
  return (
    <div className="p-3 rounded-md bg-white/70 fixed z-50 bottom-10 right-10">
      <FaSpinner className="animate-spin w-5 h-5 text-black" />
    </div>
  );
};

export default GlobalLoading;

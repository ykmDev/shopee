import Lottie from "lottie-react";

import Loading from "../assets/loading.json";

const Fallback = ( fullHeight = true ) => {
  return (
    <div
      className={`w-full flex justify-center items-center ${
        fullHeight ? "h-screen" : "h-full"
      }`}
    >
      <Lottie className="w-[200px]" animationData={Loading} />
    </div>
  );
};

export default Fallback;
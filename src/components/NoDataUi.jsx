import React from "react";

const NoDataUi = ({ message }) => {
  return (
    <div className="w-full h-[200px] flex items-center justify-center bg-neutral-200 border-neutral-300 rounded-md border-2">
      <span className="text-xl text-bold text-neutral-500 ">{message}</span>
    </div>
  );
};

export default NoDataUi;

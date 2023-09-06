import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
  return (
    <div className="spinDiv">
      <AiOutlineLoading3Quarters className="spinner" />
    </div>
  );
};

export default Spinner;

import React from "react";
import StackedBarChart from "./StackedBarChart";

const Week: React.FC = () => {
  return (
    <>
      <StackedBarChart />
      <div className="flex justify-between">
        <button>
          <i className="fa-solid fa-angle-left text-white fa-2x"></i>
        </button>
        <h3 className="text-white font-bold">2024-09-22 - 2024-09-28</h3>
        <button>
          <i className="fa-solid fa-angle-right text-white fa-2x"></i>
        </button>
      </div>
    </>
  );
};

export default Week;

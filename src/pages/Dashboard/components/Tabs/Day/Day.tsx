import React from "react";
import CustomPieChart from "./CustomPieChart";

import allData from "../../../mocks/expense.json";

const Day: React.FC = () => {
  const day = "2023-02-16";

  const expensesData = allData.filter(({ date }) => date === day);

  return (
    <div className="">
      <CustomPieChart data={expensesData} />
      <div className="flex justify-between items-center">
        <button>
          <i className="fa-solid fa-angle-left text-white fa-2x"></i>
        </button>
        <h3 className="text-white font-bold">2023-02-16</h3>
        <button>
          <i className="fa-solid fa-angle-right text-white fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Day;

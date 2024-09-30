// src/Tabs.tsx

import React, { useState } from "react";
import Day from "./Day/Day";
import Week from "./Week/Week";
import Month from "./Month/Month";
import { useAppContext } from "../../../../context/AppContext";

const Tabs: React.FC = () => {
  const { state, dispatch } = useAppContext();

  // ToDo: Removed the Unused Variables
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeType, setType] = useState<"expense" | "income">("expense");

  const handleTabClick = (tab: "day" | "week" | "month") => {
    dispatch({ type: "CHANGE_VIEW", payload: tab });
  };

  // ToDo: Removed the unused variable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTypeClick = (type: "expense" | "income") => {
    setType(type);
  };

  return (
    <div className="rounded-lg text-white">
      {/* ToDo: Remove the unused codes */}
      {/* <div className="flex justify-evenly bg-primary-dark text-white rounded font-medium my-4">
        {["expense", "income"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTypeClick(tab as "expense" | "income")}
            className={`grow py-1 px-4 transition duration-300 ease-in-out rounded ${
              activeType === tab ? "bg-white text-primary" : ""
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div> */}
      <div className="flex justify-between bg-primary text-white rounded bg-primary-dark font-medium">
        {["day", "week", "month"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab as "day" | "week" | "month")}
            className={`m-2 py-1 px-4 transition duration-300 ease-in-out rounded ${
              state.expenseView === tab ? "bg-white text-primary" : ""
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-2 transition-opacity duration-300 ease-in-out">
        {state.expenseView === "day" && <Day />}
        {state.expenseView === "week" && <Week />}
        {state.expenseView === "month" && <Month />}
      </div>
    </div>
  );
};

export default Tabs;

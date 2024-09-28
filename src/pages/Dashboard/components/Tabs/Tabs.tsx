// src/Tabs.tsx

import React, { useState } from "react";
import Day from "./Day/Day";
import Week from "./Week/Week";

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"day" | "week" | "month">("day");

  const [activeType, setType] = useState<"expense" | "income">("expense");

  const handleTabClick = (tab: "day" | "week" | "month") => {
    setActiveTab(tab);
  };

  const handleTypeClick = (type: "expense" | "income") => {
    setType(type);
  };

  return (
    <div className="rounded-lg text-white">
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
      <div className="flex justify-evenly bg-primary text-white border-2 border-white rounded font-medium">
        {["day", "week", "month"].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab as "day" | "week" | "month")}
            className={`m-2 py-1 px-4 transition duration-300 ease-in-out rounded ${
              activeTab === tab ? "bg-white text-primary" : ""
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="mt-4 transition-opacity duration-300 ease-in-out">
        {activeTab === "day" && <Day />}
        {activeTab === "week" && <Week />}
        {activeTab === "month" && (
          <div className="p-4">Content for Month Tab</div>
        )}
      </div>
    </div>
  );
};

export default Tabs;

import React from "react";

// Define the type for the Day object
type Day = {
  amount: number;
  day: string; // Assuming this will be a date string in 'YYYY-MM-DD' format
};

// Define the type for the props of the Calendar component
interface CalendarProps {
  days: Day[];
}

const Calendar: React.FC<CalendarProps> = ({ days }) => {
  // Calculate the maximum amount to scale the circle sizes
  const maxAmount = Math.max(...days.map((day) => day.amount));

  // Helper function to get the size of the circle based on the amount
  const getCircleSize = (amount: number) => {
    const minSize = 20; // Min circle size (in pixels)
    const maxSize = 60; // Max circle size (in pixels)
    return (amount / maxAmount) * (maxSize - minSize) + minSize;
  };

  return (
    <>
      <div className="grid grid-cols-7 gap-x-6 gap-y-1 p-2 pt-1">
        {days.map((day) => {
          const circleSize = getCircleSize(day.amount);
          return (
            <div
              key={day.day}
              className="flex flex-col justify-center items-center"
            >
              {/* Tooltip wrapper */}
              <div className="relative group">
                {/* Circle for the day */}
                <div
                  className="rounded-full flex items-center justify-center transition-all duration-300 ease-in-out"
                  style={{
                    width: `${circleSize}px`,
                    height: `${circleSize}px`,
                    background: `rgba(255, 255, 255, ${circleSize / 60})`,
                  }}
                >
                  <span className="text-xs font-bold" style={{ color: "#666" }}>
                    {new Date(day.day).getDate()}
                  </span>
                </div>

                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block p-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg z-10">
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(day.day).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Amount:</strong> ₹{day.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid grid-cols-7 gap-x-7 gap-y-1 p-2 pt-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((val) => (
          <span className="font-medium" style={{ color: "#666" }} key={val}>
            {val}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button>
          <i className="fa-solid fa-angle-left text-white fa-2x"></i>
        </button>
        <h3 className="text-white font-bold">September 2024</h3>
        <button>
          <i className="fa-solid fa-angle-right text-white fa-2x"></i>
        </button>
      </div>
    </>
  );
};

const Month: React.FC = () => {
  const days = [
    { amount: 8893, day: "2024-10-01" },
    { amount: 13689, day: "2024-10-02" },
    { amount: 3243, day: "2024-10-03" },
    { amount: 5393, day: "2024-10-04" },
    { amount: 11979, day: "2024-10-05" },
    { amount: 12381, day: "2024-10-06" },
    { amount: 8479, day: "2024-10-07" },
    { amount: 12972, day: "2024-10-08" },
    { amount: 12827, day: "2024-10-09" },
    { amount: 2049, day: "2024-10-10" },
    { amount: 14762, day: "2024-10-11" },
    { amount: 10700, day: "2024-10-12" },
    { amount: 7378, day: "2024-10-13" },
    { amount: 13927, day: "2024-10-14" },
    { amount: 3205, day: "2024-10-15" },
    { amount: 14245, day: "2024-10-16" },
    { amount: 8578, day: "2024-10-17" },
    { amount: 9898, day: "2024-10-18" },
    { amount: 11846, day: "2024-10-19" },
    { amount: 6476, day: "2024-10-20" },
    { amount: 9528, day: "2024-10-21" },
    { amount: 8966, day: "2024-10-22" },
    { amount: 9235, day: "2024-10-23" },
    { amount: 4247, day: "2024-10-24" },
    { amount: 4625, day: "2024-10-25" },
    { amount: 1719, day: "2024-10-26" },
    { amount: 11813, day: "2024-10-27" },
    { amount: 9911, day: "2024-10-28" },
    { amount: 1936, day: "2024-10-29" },
    { amount: 2824, day: "2024-10-30" },
    { amount: 10612, day: "2024-10-31" },
  ];
  return <Calendar days={days} />;
};

export default Month;

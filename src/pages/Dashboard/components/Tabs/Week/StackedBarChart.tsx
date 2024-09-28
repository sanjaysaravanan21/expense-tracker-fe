import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const StackedBarChart: React.FC = () => {
  const data = [
    {
      amount: 130,
      date: "2024-09-29",
      weekDay: "Sun",
    },
    {
      amount: 50,
      date: "2024-09-23",
      weekDay: "Mon",
    },
    {
      amount: 75,
      date: "2024-09-24",
      weekDay: "Tue",
    },
    {
      amount: 100,
      date: "2024-09-25",
      weekDay: "Wed",
    },
    {
      amount: 125,
      date: "2024-09-26",
      weekDay: "Thu",
    },
    {
      amount: 90,
      date: "2024-09-27",
      weekDay: "Fri",
    },
    {
      amount: 520,
      date: "2024-09-28",
      weekDay: "Sat",
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="weekDay"
          tick={{
            strokeWidth: 1,
            fontWeight: 400,
          }}
        />
        <YAxis hide />
        <Bar dataKey="amount" stackId="a" fill="#fff">
          <LabelList dataKey="amount" position="top" fill="#fff" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StackedBarChart;

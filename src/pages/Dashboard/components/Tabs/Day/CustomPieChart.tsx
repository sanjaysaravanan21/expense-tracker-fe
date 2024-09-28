import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { convertDashedToCapitalized } from "../../../../../utils";
import colors from "../../../mocks/colors.json";

interface Expense {
  category: string;
  amount: number;
}

interface PieChartProps {
  data: Expense[];
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
  const { cx, cy, midAngle, value, name } = props;
  const radius = 120;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        fontSize={12}
        fontWeight={600}
        textAnchor={x > cx ? "start" : "end"}
      >
        {`${convertDashedToCapitalized(name)}`}
      </text>
      <text
        x={x}
        y={y + 15}
        fontSize={14}
        fontWeight={600}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
      >
        {`₹ ${value}`}
      </text>
    </>
  );
};

const CustomPieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        style={{ height: 300 }}
        className="flex flex-col place-content-center place-items-center absolute text-white font-medium text-xs"
      >
        <span>Total Amount</span>
        <b className="text-lg">₹ 8000</b>
      </div>
      <ResponsiveContainer height={300}>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={{ strokeWidth: 1, stroke: "white" }}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index]}
                strokeWidth={2}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;

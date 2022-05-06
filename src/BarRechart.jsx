import React from "react";
import { XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

export default function BarRechart(props) {
  const { dimensions, fruits } = props;

  const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dy={14}
        fontSize="11"
      >
        {value}
      </text>
    );
  };

  return (
    <div>
      <BarChart
        width={dimensions.width}
        height={dimensions.height}
        data={fruits}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="count"
          fill="#8884d8"
          barSize={50}
          label={renderCustomBarLabel}
        />
        />
      </BarChart>
    </div>
  );
}

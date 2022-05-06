import React, { useState, useEffect } from "react";
import fruits from "./fruits.json";
import BarChart from "./BarChart";
import BarRechart from "./BarRechart";
import LineChart from "./LineChart";

const dimensions = {
  width: 800,
  height: 400,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};

export default function App() {
  console.log(fruits);

  return (
    <div
      style={{
        paddingTop: "50px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <h1>Bar Chart - d3</h1>
        <BarChart dimensions={dimensions} fruits={fruits} />
      </div>
      <div>
        <h1>Bar Chart - Recharts</h1>
        <BarRechart dimensions={dimensions} fruits={fruits} />
      </div>
      <div>
        <h1>Line Chart - d3</h1>
        <LineChart dimensions={dimensions} fruits={fruits} />
      </div>
    </div>
  );
}

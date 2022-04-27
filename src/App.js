import React, { useState, useEffect } from "react";
import fruits from "./fruits.json";
import BarChart from "./BarChart";

const dimensions = {
  width: 800,
  height: 400,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};

export default function App() {
  console.log(fruits);

  return (
    <div style={{ paddingTop: "50px" }}>
      <BarChart dimensions={dimensions} fruits={fruits} />
    </div>
  );
}

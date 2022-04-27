import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import data from "./temperature.csv";
import BarChart from "./BarChart";

const dimensions = {
  width: 800,
  height: 400,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};

export default function App() {
  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    d3.csv(data).then((data) => setTempData(data));
  }, []);

  console.log(tempData instanceof Array);

  return (
    <div style={{ paddingTop: "50px" }}>
      {tempData instanceof Array && (
        <BarChart dimensions={dimensions} tempData={tempData} />
      )}
    </div>
  );
}

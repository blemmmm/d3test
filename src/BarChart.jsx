import React, { useEffect } from "react";
import * as d3 from "d3";

export default function BarChart(props) {
  const { dimensions, tempData } = props;
  const boundedWidth = dimensions.width - dimensions.margin.right;
  const boundedHeight = dimensions.height - dimensions.margin.bottom;

  const parseDate = d3.timeParse("%Y-%m-%d");
  const temperatures = tempData.map((temp) => +temp.temperature);
  const dates = tempData.map((temp) => parseDate(temp.date));

  console.log();

  useEffect(() => {
    const svg = d3.select("svg");
    svg.attr("width", dimensions.width).attr("height", dimensions.height);

    const xScale = d3
      .scaleTime()
      .domain([0, d3.max(dates)])
      .range([0, boundedWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(temperatures))
      .nice()
      .range([dimensions.height, 0]);

    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${boundedHeight})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("fill", "violet")
      .selectAll("rect")
      .data(tempData.splice(0, tempData.length - 1))
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 30)
      .attr("y", (d) => yScale(d.temperature))
      .attr("height", (d) => boundedHeight - yScale(d.temperature))
      .attr("width", 25);
  }, [tempData, dimensions]);

  return <svg></svg>;
}

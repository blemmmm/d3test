import React, { useEffect } from "react";
import * as d3 from "d3";

export default function BarChart(props) {
  const { dimensions, fruits } = props;
  const boundedWidth = dimensions.width - dimensions.margin.right;
  const boundedHeight = dimensions.height - dimensions.margin.bottom;

  console.log();

  useEffect(() => {
    const svg = d3.select("svg");
    svg.attr("width", dimensions.width).attr("height", dimensions.height);

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(fruits, (d) => d.count)])
      .range([dimensions.margin.left, boundedWidth])
      .interpolate(d3.interpolateRound);

    const yScale = d3
      .scaleBand()
      .domain(fruits.map((d) => d.name))
      .range([dimensions.margin.top - 7, boundedHeight])
      .padding(0.1)
      .round(true);

    const xAxis = d3.axisTop(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg
      .append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(fruits)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(0))
      .attr("y", (d) => yScale(d.name))
      .attr("height", yScale.bandwidth())
      .attr("width", 0)
      .attr(
        "transform",
        `translate(0, ${dimensions.margin.bottom - dimensions.margin.top})`
      )
      .transition()
      .duration(1500) //time in ms
      .delay((d, i) => i * 250)
      .attr("width", (d) => xScale(d.count) - xScale(0));

    svg
      .append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 11)
      .selectAll("text")
      .data(fruits)
      .enter()
      .append("text")
      .attr("x", (d) => xScale(d.count))
      .attr("y", (d) => yScale(d.name) + yScale.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -5)
      .text((d) => d.count);

    svg
      .append("g")
      .attr("transform", `translate(0, ${dimensions.margin.top})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${dimensions.margin.left}, 0)`)
      .call(yAxis);
  }, [fruits, dimensions]);

  return <svg></svg>;
}

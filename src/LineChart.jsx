import React, { useEffect } from "react";
import * as d3 from "d3";

export default function LineChart(props) {
  const { dimensions, fruits } = props;
  const boundedWidth = dimensions.width - dimensions.margin.right;
  const boundedHeight = dimensions.height - dimensions.margin.bottom;

  useEffect(() => {
    const svg = d3.select(".linechart");
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

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const tooltip = d3
      .select(".svg")
      .append("div")
      .style("position", "absolute")
      .style("opacity", 0)
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px");

    const line = svg
      .append("path")
      .datum(fruits)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr(
        "d",
        d3
          .line()
          .x((d) => xScale(d.count))
          .y((d) => yScale(d.name))
      )
      .attr("height", yScale.bandwidth())
      .attr("width", 0)
      .attr(
        "transform",
        `translate(0, ${dimensions.margin.bottom - dimensions.margin.top})`
      );

    const length = line.node().getTotalLength();

    line
      .attr("stroke-dasharray", length)
      .attr("stroke-dashoffset", length)
      .transition()
      .duration(2000)
      .attr("stroke-dashoffset", 0)
      .ease(d3.easeLinear);

    svg
      .append("g")
      .selectAll("dot")
      .data(fruits)
      .enter()
      .append("circle")
      .attr("cx", (d) => xScale(d.count))
      .attr("cy", (d) => yScale(d.name))
      .attr("r", 10)
      .attr("fill", "#69b3a2")
      .on("mouseover", (event, d) => {
        return tooltip.style("opacity", 1).html(`${d.name}: ${d.count}`);
      })
      .on("mousemove", (event, d) => {
        console.log(event);
        return tooltip
          .html(`${d.name} <br> count: ${d.count}`)
          .style("top", `${event.pageY}px`)
          .style("left", `${event.pageX + 10}px`);
      })
      .on("mouseout", (event, d) => {
        return tooltip.style("opacity", 1);
      });

    svg
      .append("g")
      .attr(
        "transform",
        `translate(0, ${dimensions.height - dimensions.margin.bottom})`
      )
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${dimensions.margin.left}, 0)`)
      .call(yAxis);
  }, [fruits, dimensions]);

  return (
    <div className="svg">
      <svg className="linechart"></svg>
    </div>
  );
}

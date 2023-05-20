import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, max, format, extent, scaleBand, nest, scaleOrdinal } from 'd3';
import ReactDropdown from 'react-dropdown';
import { useData } from './useData';
import { AxisBottom } from './AxisBottom';
import { AxisLeft } from './AxisLeft';
import { Marks } from './Marks';
import { Dropdown } from './Dropdown';
import { getAttributes} from '/getAttributes';

const width = 960;
const menuHeight = 80;
const height = 500 - menuHeight;
const margin = { top: 20, right: 30, bottom: 65, left: 280};
const xAxisLabelOffset = 50;
const yAxisLabelOffset = 45;

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

const siFormat = format('.2s');
const xAxisTickFormat = tickValue => tickValue; // siFormat(tickValue).replace('G', 'B');

const attributes = getAttributes();

const getLabel = value => {
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].value === value) {
      return attributes[i].label;
    }
  }
};
const types = ['casual', 'member'];
//const quarters = ['1', '2', '3', '4'];
//const year = ['2021','2022'];
const App = () => {
  const data = useData();
  const [userType, setUserType] = useState(types[0]);
  //const [quarter, setQuarter] = useState(quarters[0]);
  //const [yearType, setYear] = useState(year[0]);

  //const initialXAttribute = null;
  //const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d['count'];
  const yValue = d => d['start_station_name'];
  //const xAxisLabel = getLabel(xAttribute);

  if (!data) {
    return <pre>Loading...</pre>;
  }
  
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;  

  const filteredData = data.filter(d => d.member_casual === userType).slice(0,10);

  console.log(filteredData);
  
  const yScale = scaleBand()
    .domain(filteredData.map(yValue))
    .range([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(filteredData, xValue)])
    .range([0, innerWidth]);
  
console.log("xScale: ", xScale);
 return (
    <>
      <div className="menus-container">
        <span className="dropdown-label">Member Type</span>
        <ReactDropdown
          options={types}
          value={userType}
          onChange={({ value }) => setUserType(value)}
   			
        />
      </div>
  <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickFormat={xAxisTickFormat}
        />
        <AxisLeft yScale={yScale} />
        <text
          className="axis-label"
          x={innerWidth / 2}
          y={innerHeight + xAxisLabelOffset}
          textAnchor="middle"
        >
          Number of Rides
        </text>
        <Marks
          data={filteredData}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
    </>
  );
  };
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

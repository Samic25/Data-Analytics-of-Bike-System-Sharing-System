import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

//const csvUrl = 'https://gist.githubusercontent.com/Samic25/89e36e8fe4cf3526365b3dbc2daed5bd/raw/gistfile1.txt';
const csvUrl = 'https://gist.githubusercontent.com/Samic25/4a4edd6988d257d29b92cfdcde2cd5ff/raw/endstation.txt'
export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
     d.count = +d.count;
      return d;
    };
    
    csv(csvUrl, row).then(setData);
  }, []);
  
  //return data ? data.filter(d => d.IngredientCount != 0) : null;
  return data;
};
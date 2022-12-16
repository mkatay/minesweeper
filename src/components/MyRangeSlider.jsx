import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';

export const MyRangeSlider = ({color,minv,maxv,set}) => {
//console.log(minv,maxv)
  const [ value, setValue ] = useState(+minv); 
  const handleChange=(e)=>{
    setValue(e.target.value)
    set(e.target.value)
  }

  return (
    <RangeSlider
      value={value}
      onChange={handleChange}
      tooltipPlacement='bottom'
      tooltip='on'
      min={+minv}
      max={+maxv}
      variant={color}
    />
  );

};
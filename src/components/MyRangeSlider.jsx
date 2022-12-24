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
//console.log(value)
  return (
    <div className="d-flex align-items-center">
    <RangeSlider
      value={value}
      onChange={handleChange}
      tooltip='off'
      min={+minv}
      max={+maxv}
      variant={color}
    />
    <div style={{width:'10px'}}>{value}</div>
    </div>
    
  );

};
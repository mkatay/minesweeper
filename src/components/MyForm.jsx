import React, { useState, useContext } from "react";
import { MyGlobalContext } from "../GlobalState";
import { Input, Form, FormGroup, Label, Col } from "reactstrap";
import { MyRangeSlider } from "./MyRangeSlider";

export const MyForm = () => {
  const [state, dispatch] = useContext(MyGlobalContext);
  const [width, setWidth] = useState(6);
  const [height, setHeight] = useState(6);
  const [mines, setMines] = useState(6);

  const handleClick = () => {
    const dim = { x: width, y: height, minesNr: mines };
    dispatch({ type: "SETUP_DIM", dim });
  };
  //console.log(state)
  return (
    <div className="container-fluid mb-1 ">
      <Form className="container-fluid shadow rounded form-holder">
        <div className="m-1 " >
          <Label>Width:</Label>
          <MyRangeSlider color="primary" minv="6" maxv="15" set={setWidth} />
        </div>
        <div className="m-1 " >
          <Label>Height:</Label>
          <MyRangeSlider color="info" minv="6" maxv="15" set={setHeight} />
        </div>
        <div className="m-1 " >
          <Label>Mines:</Label>
          <MyRangeSlider
            color="danger"
            minv="6"
            maxv={Math.floor((width * height) / 4)}
            set={setMines}
          />
        </div>
        <div className="m-1 align-self-end" >
            <Input type="button"  onClick={handleClick}  value="New Game"   />
          </div>
      </Form>
    </div>
  );
};

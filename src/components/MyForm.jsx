import React,{useState} from "react";
import {Input, Form, FormGroup, Label,Col } from "reactstrap";
import { MyRangeSlider } from "./MyRangeSlider";
import {Board } from "./Board";
import { GameState } from './classes'

const state=new GameState()

export const MyForm = ({board,setBoard}) => {
  const [width,setWidth]=useState(6)
  const [height,setHeight]=useState(6)
  const [mines,setMines]=useState(9)
  
  const handleClick=() => {
       state.initialize(width,height,mines)    
       setBoard(state.board)
    }

  return (
    <div className="container-fluid mb-1 ">
      <Form className="container-fluid shadow rounded form-holder">
        <FormGroup row className="pt-2 pb-1 ">
          <Label sm={2}>Width:</Label>
          <Col sm={10}>
            <MyRangeSlider color="primary" minv="6" maxv="15" set={setWidth}/>
          </Col>
        </FormGroup>
        <FormGroup row className="pt-1 pb-1 ">
          <Label sm={2}>Height:</Label>
          <Col sm={10}>
            <MyRangeSlider color="info" minv="6" maxv="15" set={setHeight}/>
          </Col>
        </FormGroup>
        <FormGroup row className="pt-1 pb-1">
          <Label sm={2}>Mines:</Label>
          <Col sm={10}>
            <MyRangeSlider color="danger" minv="6" maxv={Math.floor(width*height/4)} set={setMines}/>
          </Col>
        </FormGroup>

         <FormGroup row className="justify-content-center mt-4">
            <Input type="button" className="w-50 " onClick={handleClick} value="New Game" />
          </FormGroup>
      </Form>
      {board.length>0 && <Board  width={width} height={height} mines={mines} board={board} setBoard={setBoard} />}
    </div>
  );
};

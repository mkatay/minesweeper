import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MyForm } from "./components/MyForm";
import React, { useContext } from "react";
import {  MyGlobalProvider } from "./GlobalState";
import {Board} from './components/Board';


function App() {
  
  return (
    <MyGlobalProvider >
      <div className="container-fluid app">
        <h4 className="text-center">Minesweeper</h4>
        <MyForm />
        <Board />

      </div>
    </MyGlobalProvider>
  );
}

export default App;

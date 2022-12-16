import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyForm } from './components/MyForm';
import React,{useState} from 'react';


function App() {
  const [board,setBoard]=useState([])

  return (
    <div className="container-fluid app">
      <h4 className="text-center">Minesweeper</h4>
      <MyForm  board={board} setBoard={setBoard}/>
     
    </div>
  );
}

export default App;

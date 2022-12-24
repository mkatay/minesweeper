import React,{useContext,useEffect,useState} from 'react'
import { MyGlobalContext } from "../GlobalState";
import { MyModal } from './MyModal';

export const Board=()=> {
  const [state,dispatch]=useContext(MyGlobalContext)
  const [modal, setModal] = useState(false);
  const [revealAll, setRevealAll] = useState(false)

  useEffect(() => {
    //console.log('useEffect:',state.stage);
    state.stage==1 && setRevealAll(false)
    state.stage==2 && setModal(true);
    dispatch({type:'CHECK_VICTORY'})
  }, [state]);

  const handleClick=(y,x,state)=>{
    console.log(x,y)
    const position={x:x,y:y}
    state==0 && dispatch({type:'REVEAL_FIELD',position})
   
  }
   const gameOver=()=>{
    console.log('on close')
    setModal(false)
    dispatch({type:'REVEAL_ALL'})
    setRevealAll(true)
   }
   const handleRightClick=(e,y,x,state)=>{
    e.preventDefault()
    console.log('on right click:',x,y)
    const position={x:x,y:y}
    state==0 && dispatch({type:'SET_FLAG',position}) 
    state==2 && dispatch({type:'REMOVE_FLAG',position})
   }
   const resetGame=() => {
    console.log('reset game')
   }
   console.log(state)
  return (
    <div className="mx-auto mt-1">
      
      {state.board.map((row,i)=>(
        <div className="d-flex justify-content-center" key={i} >{row.map((f,j)=>
          <div key={j} className="p-0  border bg-secondary shadow box d-flex justify-content-center align-items-center"  
              onContextMenu={(e)=>handleRightClick(e,i,j,f.state)}
              onClick={(e)=>handleClick(i,j,f.state)}>{
              f.state==0 ? ' ' :
              f.state==1 && f.mineNeighbors==0 && !f.isMine ? <i className="fa-regular fa-circle"></i>:
              f.state==1 && f.isMine ? <i className="fa-sharp fa-solid fa-bomb"></i> :
              f.state==1 && f.mineNeighbors>0 ? f.mineNeighbors :
              f.state==2 ? <i className="fa-solid fa-flag text-danger"></i> :
              f.state==3 ? <i className="fa-sharp fa-solid fa-bomb text-danger"></i> :'err'
          }</div>)} 
        </div>))}
        {state.stage==2 && !revealAll  && 
          <MyModal modal={modal} setModal={setModal} title="Vége..." msg="Sajnos ez most nem sikerült! ☹️"
                 handleClose={gameOver}/>}
         {state.stage==3  && 
          <MyModal modal={modal} setModal={setModal} title="Gratulálok!" msg="Sikerült! 😍"
                 handleClose={resetGame}/>}
        {/*<div className="btn btn-danger btn-xs"
          onClick={gameOver}
        >VÉGE</div>*/}
   </div>
  )
}

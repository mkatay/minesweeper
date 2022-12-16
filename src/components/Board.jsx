import React,{useState,useEffect,useRef} from 'react'


export const Board=({board,setBoard})=> {
   const [dim,setDim]=useState(Math.min(50,(Math.floor(window.innerWidth-48)/board[0].length)))
   const refs = useRef([])
  
   refs.current = []; 

   useEffect(() => {
    setDim(Math.min(50,(Math.floor(window.innerWidth-48)/board[0].length)))
    refs.current.map(ref => {
      console.log(ref)
      ref.style.width=dim+'px'
      ref.style.height=dim+'px'
    })
  }, [refs,board,dim])

  const addToRefs = el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
   };

  console.log(dim)
  return (
    <div className="mx-auto mt-1">
      {board.map((row,i)=>(
        <div className="d-flex justify-content-center" key={i}>{row.map((f,j)=>
          <div key={j} className="p-0  border bg-secondary shadow" ref={addToRefs}>{
              f.state==0 ? ' ' :
              f.state==1 && f.mineNeighbors==0 && !f.isMine ? `<i className="fa-regular fa-circle"></i>` :
              f.state==1 && f.isMine ? `<i className="fa-sharp fa-solid fa-bomb"></i>` :
              f.state==1 && f.mineNeighbors>0 ? f.mineNeighbors :
              f.state==2 ? `<i className="fa-solid fa-flag text-danger"></i>` :
              f.state==3 ? `<i className="fa-sharp fa-solid fa-bomb text-danger"></i>` :'err'
          }</div>)} 
        </div>))}
   </div>
  )
}

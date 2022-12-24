import React,{createContext,useReducer} from 'react'

const initialState={
    //a felhasználó által megadott adatok:x,y,minesNr kerül majd be a dim objektumba
    dim:{},
    field:{
        isMine:false,
        state: 0,//state: 0-felfedetlen, 1-felfedett, 2-zászló,3-felfedett és felrobbant
        mineNeighbors:0
    },
    board:[],
    stage:0//0-nincs elindítva a játék, 1- a játék folyik, 2- vége:felrobbant , 3- vége:győzelem

}
//létrehozzuk a globális state-t
export const MyGlobalContext =createContext(initialState)
//a global state-en a komponensek különböző tipusú műveleteket hajthatnak végre, definiálni kell
// a lehetséges műveleteket, egy olyan fg-t kell létrehozni melynek 2 bemenő paramétere van:
//a current state és az action obj.(ez írja le h hogyan lehet módosítani a state-t)
const MyReducer=(state, action)=>{
    let newBoard=[]
    switch(action.type) {
        case 'SETUP_DIM':
            newBoard=[]
            const {x,y,minesNr}=action.dim
            for(let i=0;i<y;i++){
                    newBoard[i]=[]//első sor lesz a mátrixban
                    for(let j=0;j<x;j++)
                        newBoard[i][j]={ isMine:false,state:0,mineNeighbors:0}
                }
                //< a bombák véletlenszerű elhelyezése:
                for(let i=0;i<minesNr;i++){
                    let randX,randY
                    do{
                        randX = Math.floor(Math.random() *x);
                        randY = Math.floor(Math.random() *y);
                        if(newBoard[randY] && newBoard[randY][randX] && !newBoard[randY][randX].isMine)
                            break
                    }while (true)
                    newBoard[randY][randX].isMine=true
                    //ha leraktuk a bombát a szomszédoknak 1-el növelni kell a mineNeighbors attribútumát
                    for (let i = -1; i <= 1; i++) 
                        for (let j = -1; j <= 1; j++)
                            if (newBoard[i + randY] && newBoard[i + randY][j + randX] && !newBoard[i + randY][j + randX].isMine)
                                newBoard[i + randY][j + randX].mineNeighbors++;        
                }//a bombák véletlenszerű elhelyezése >
                return {...state,  dim: action.dim ,board:newBoard, stage:1}   
       /* case 'INITIALIZE_BOARD':*/
            
        case 'REVEAL_FIELD':
            return reveal(state,action.position)
        case 'REVEAL_ALL':
            //console.log('felfed mind')
            newBoard=state.board
            for(let row of newBoard)
               for(let f of row)
                    if(f.state==0) f.state=1
            //console.log(newBoard)
            return {...state,board:newBoard}
        case 'SET_FLAG':        
            const field=state.board[action.position.y][action.position.x];
            field.state=2
            newBoard=state.board
            return  {...state,board:newBoard}
        case 'REMOVE_FLAG':        
            const field_r=state.board[action.position.y][action.position.x];
            field_r.state=0
            newBoard=state.board
            return  {...state,board:newBoard}
        case 'CHECK_VICTORY':
            if (state.stage !== 1) return state;
            const victory = state.board.every(row => 
                    row.every(field =>field.state==1 || field.state === 2))
            return victory? {...state,stage:3} : state
        default:
            return state
    }
}

//ahhoz, h a többi komponens hozzáférjen a globális state-hez szükséges egy Provider(szolgáltató) komponens:
//mely továbbítja a globális állapotot az összes alárendelt összetevőnek
export const MyGlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(MyReducer,initialState)

     return(
        <MyGlobalContext.Provider value={[state,dispatch]}> 
            {children}
        </MyGlobalContext.Provider>
    )
}

const reveal=(state,position)=>{
    let newBoard=[]
    const {x,y}=position
    const field=state.board[y][x]
    if(field.state==1) 
        return state//nem történik semmi ha olyanra kattintunk ami már fel van fedve
    else if(field.isMine) {
        field.state=3
        newBoard=state.board
        //newBoard[y][x]=field
        console.log('vége')
        return {...state,board:newBoard,stage:2}//vége a játéknak
    }else{
        field.state=1
        newBoard=state.board
        //newBoard[y][x]=field  
    //fel kell fedni az összes szomszédost ha üres-rekurzióval
        if (field.mineNeighbors === 0) {//nincs olyan szomszéd ahol bomba lenne, ezért fel kell fedni az összes szomszédot
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) 
                    if (state.board[y + j] && state.board[y + j][x + i]) {
                        const newPos={x:x+i,y:y+j}
                        reveal({...state,board:newBoard},newPos);
                    }      
            }
            return {...state,board:newBoard}
  }}
}

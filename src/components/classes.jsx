class Field{
    isMine = false;//true v false
    state = 0;//state: 0-felfedetlen, 1-felfedett, 2-zászló,3-felfedett és felrobbant
    mineNeighbors =0
    }

export class GameState{
    x=0
    y=0
    board=[]
    stage=0//0-nincs elindítva a játék, 1- a játék folyik, 2- vége a játéknak, felrobbant , 3- győzelem

    initialize(x,y,mineNr){
        this.x=x;
        this.y=y;
        this.board=[]//erre azért van itt szükség, h új játék gombra kattintáskor is jól működjön
        for(let i=0;i<y;i++){
            this.board[i]=[]//első sor lesz a mátrixban
            for(let j=0;j<x;j++)
                this.board[i][j]=new Field()
        }
        //a bombák véletlenszerű elhelyezése:
        for(let i=0;i<mineNr;i++){
            let randX,randY
            do{
                randX = Math.floor(Math.random() * this.x);
                randY = Math.floor(Math.random() * this.y);
                if(this.board[randY] && this.board[randY][randX] && !this.board[randY][randX].isMine)
                    break
            }while (true)
            this.board[randY][randX].isMine=true
            //ha leraktuk a bombát a szomszédoknak 1-el növelni kell a mineNeighbors attribútumát
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (this.board[i + randY] && this.board[i + randY][j + randX] && !this.board[i + randY][j + randX].isMine)
                        this.board[i + randY][j + randX].mineNeighbors++;
                }
            }
        }
        this.stage=1//a játék folyamatban
    }
    //egy mező felfedése:
    reveal(x,y){
        const field=this.board[y][x]
        if(field.state!=0) return//nem történik semmi ha olyanra kattintunk ami már fel van fedve
        
        if (field.isMine) {
            field.state=3
            this.stage=2//vége a játéknak
            return
        }
        field.state=1
        //fel kell fedni az összes szomszédost ha üres-rekurzióval
        if (field.mineNeighbors === 0) {//nincs olyan szomszéd ahol bomba lenne, ezért fel kell fedni az összes szomszédot
            for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) 
                if (this.board[y + j] && this.board[y + j][x + i]) 
                this.reveal(x + i, y + j);
            }
      }
    }
    //összes mező felfedése:
    revealAll() {
        for (const row of this.board) {
          for (const field of row) {
            field.state = 1;
          }
        }
    }
//toggle-flag
toggleFlag(x,y){
    const field=this.board[y][x];
    console.log(field)
    if(field.state==2){
        field.state=0
        return
    }     
    field.state=2
}

//győzelem?
checkVictory(){
   if (this.stage !== 1) return;
   const victory = this.board.every(row => 
        row.every(field =>field.state==1 || field.state === 2)
    );
    if(victory) this.stage=3
}

}

var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;


function setGame() {
    board = [
                [' ', ' ', ' '],
                [' ', ' ', ' '],
                [' ', ' ', ' ']
            ]

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            let tile = document.createElement("div");
            tile.id = r + "-" + c;      // set id <div id='0-0'> then 0-1, 0-2, etc>
           
            tile.classList.add("tile");
            if (r == 0 || r == 1) {                             //to add lines for the game; same as create 9 divs
                tile.classList.add("horizontal-line");
            }                                                           
            if (c == 0 || c == 1) {
                tile.classList.add("vertical-line");
            }
            
            tile.innerText = " ";
            document.getElementById("board").appendChild(tile);
            tile.addEventListener("click", setTile);
            
        }
    }
}


function setTile(){
    if (gameOver) { //false
        return;
    }

    let coords = this.id.split("-");    //ex) "1-2" -> ["1", "2'"] //this refers to tile which is document.createElement('div')
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (board[r][c] != ' ') { 
        //already taken spot
        return;
    }
    
    board[r][c] = currPlayer; //mark the board
    this.innerText = currPlayer; //mark the board on html


    var Oturn=document.getElementById('Oturn')
    var Xturn=document.getElementById('Xturn')
    //change players
    if (currPlayer == playerO) {
        currPlayer = playerX;
        Xturn.innerText='My turn';
        Oturn.innerText='';
    }
    else {
        currPlayer = playerO;
        Oturn.innerText='Now me';
        Xturn.innerText='';
    }

    //check winner
    checkWinner();

winnerTile=document.getElementsByClassName('winner')
    if(winnerTile[0].innerText=='O'){
        Oturn.innerText='Yes sirr, I won ! ';
        Xturn.innerText='';
    }
    else{
        Xturn.innerText='Woo hoo! Ez win ! ';
        Oturn.innerText='';
    }
}



function checkWinner() {
    //horizontally, check 3 rows
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            //if we found the winning row
            //apply the winner style to that row
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //vertically, check 3 columns
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] ==  board[2][c] && board[0][c] != ' ') {
            //if we found the winning col
            //apply the winner style to that col
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + "-" + c.toString());                
                tile.classList.add("winner");
            }
            gameOver = true;
            return;
        }
    }

    //diagonally
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + "-" + i.toString());                
            tile.classList.add("winner");
        }
        gameOver = true;
        return;
    }

    //anti-diagonally
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        //0-2
        let tile = document.getElementById("0-2");                
        tile.classList.add("winner");

        //1-1
        tile = document.getElementById("1-1");                
        tile.classList.add("winner");

        //2-0
        tile = document.getElementById("2-0");                
        tile.classList.add("winner");
        gameOver = true;
        return;
    }
}


function reset(){
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    tile=document.querySelectorAll('.tile');
    tile.forEach(tile=>{
        tile.innerText=' ';
        tile.classList.remove('winner')
        // tile.addEventListener("click", setTile);
        gameOver = false;
        Oturn.innerText='Come again';
        Xturn.innerText='';
    });
    
     
}

// document.querySelector('#resetBtn').addEventListener('click', reStart);

setGame()






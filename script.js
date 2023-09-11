const board = document.querySelector(".board");
const rows = 8;
const columns = 8;
const mines = 10;
const numberOfCells = rows * columns;

const boardArray = [];
const flagArray = [];
const mineArray = [];


//crear tabla con celdas

for (let row = 0; row < rows; row++ ){
    const rowArray = [];
    for(let col = 0; col < columns; col++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", row);
        cell.setAttribute("data-column", col);
        cell.textContent = "";
        board.appendChild(cell);
        rowArray.push ({isMine: false, revealed: false });  

        cell.addEventListener("click",(event) => {
            clickOnCell(row, col, event);
        });
        cell.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            placeFlag(row, col);
        });
        
    };
    boardArray.push(rowArray);
    
}

//colocar bombas aleatorias

function placeMines(){
    while(mineArray.length < mines){
        const randomRow = Math.floor(Math.random() * rows);
        const randomColumn = Math.floor(Math.random() * columns);
        console.log(randomRow, randomColumn);
        if (!boardArray[randomRow][randomColumn].isMine) {
            boardArray[randomRow][randomColumn].isMine = true;
            mineArray.push({row: randomRow, column: randomColumn});
        }
    }
    
}


//click para bombas y click derecho para banderas

function clickOnCell(row, col, event){
    const cell = boardArray[row][col];
    const cellElement = document.querySelector(`[data-row= "${row}"][data-column="${col}]`);

    if (event.button === 2){
        placeFlag(row, col);
    }else if (cell.isMine){
        cellElement.innerHTML = "💣";
        mineArray.forEach(mine=>{
            const {row:mineRow, column:mineCol} = mine
            const mineCellElement = document.querySelector(`[data-row="${mineRow}"][data-column="${mineCol}"]`);
            mineCellElement.innerHTML = "💣";
        });
        alert("¡Has perdido!");

    }else{
        if(!cell.revealed){
            const adjacentMines = countAdjacentMines(row,col);
            if(adjacentMines>0){
                cellElement.innerHTML = adjacentMines;                
            }
            cell.revealed = true;
        };
    };
};

//contar las minas adyacentes a cada celda
function countAdjacentMines(row, col){
    let count = 0;
    for (let r = -1; r <= 1; r++){
        for(let c = -1; c <= 1; c++){
            const newRow = row + r;
            const newCol = col + c;
            if(newRow>=0 && newRow<rows && newCol>=0 && newCol<columns && boardArray[newRow][newCol].isMine){
                count++
            }
        }
    }
    return count;
}

//colocar banderas

function placeFlag(row, col){
    const cell = boardArray[row][col];
    const cellElement = document.querySelector(`[data-row="${row}"][data-column="${col}"]`);
    if(!cell.revealed){
        if(cellElement.innerHTML==""){
            cellElement.innerHTML="🚩";
            flagArray.push({row,col});
        }
    }
}

//comprobar banderas

//botón comprobar

//botón reiniciar

let state = [["", "", ""], ["", "", ""], ["", "", ""]];
let pos = 1;
let humanTurn = "X";
let AITurn = "O";

function loadTicTacToe(){
    state = [["", "", ""], ["", "", ""], ["", "", ""]];
    let container = document.getElementById("container");
    for(let i = 0; i < 3; i++){
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 3; j++){
            let div = document.createElement("div");
            
            div.addEventListener("click",  function() {
                addMark(humanTurn, `${i}${j}`);
            });

            div.classList.add("box");
            div.id = `${i}${j}`;
            
            if ( i == 0  || i == 1 ){
                div.classList.add("bottom");
            }
            
            if (i == 2 || i == 1 ){
                div.classList.add("top");
            }

            if ( j == 0 || j == 1 )  {
                div.classList.add("right");
            }

            if (j == 2 || j == 1 ) {
                div.classList.add("left");
            }

            row.appendChild(div);
        }
        container.appendChild(row);
    }
}


function resetBoard(){
    let rowItems = document.querySelectorAll('.row');
    rowItems.forEach((row) => {
        row.remove();
    });
    document.getElementById("result").textContent = "";
    loadTicTacToe();
}

async function addMark(currTurn, id){
    let mark = document.createElement("div");
    if (currTurn == "X"){
        mark.classList.add("cross");
    } else {
        mark.classList.add("circle");
    }

    clickedDiv = document.getElementById(`${id[0]}${id[1]}`);

    if (state[id[0]][id[1]] == "") {
        clickedDiv.appendChild(mark);
        state[id[0]][id[1]] = currTurn;
        if (await checkWinner(state, currTurn)) {
            document.getElementById("result").textContent = currTurn + " wins!";
        } else if (await checkDraw(state)){
            document.getElementById("result").textContent = "It's a Tie!"
        } 
        else if (currTurn == humanTurn) {
            let delayInput = document.getElementById("delayInput").value;
            if (!delayInput) {
                delayInput = 300;
            }
            let pBoards = document.querySelectorAll(".pBoard");

            pBoards.forEach((pBoard)=>{
                pBoard.remove();
            });

            pos = 1;

            await getBestMove(delayInput, pos);
        }
    }

}

function makePBoard(){
    let pBoard = document.createElement("div");
    pBoard.classList.add("pBoard");
    pBoard.id = pos;
    for(let i = 0; i < 3; i++){
        let row = document.createElement("div");
        row.classList.add("row");
        for (let j = 0; j < 3; j++){
            let div = document.createElement("div");

            div.classList.add("pBox");
            div.id = `${pos}${i}${j}`;
            
            if ( i == 0  || i == 1 ){
                div.classList.add("bottom");
            }
            
            if (i == 2 || i == 1 ){
                div.classList.add("top");
            }

            if ( j == 0 || j == 1 )  {
                div.classList.add("right");
            }

            if (j == 2 || j == 1 ) {
                div.classList.add("left");
            }

            if (state[i][j] == "X"){
                let cross = document.createElement("div");
                cross.classList.add("cross");
                div.appendChild(cross);
            } else if (state[i][j] == "O"){
                let circle = document.createElement("div");
                circle.classList.add("circle");
                div.appendChild(circle);
            }


            row.appendChild(div);
        }
        pBoard.appendChild(row);
    }

    let pContainer = document.getElementById("pContainer");
    pContainer.appendChild(pBoard);

    pos += 1;

    return pos - 1;
}

async function getBestMove(delayInput, pos) {
    let bestResult = -Infinity;
    let bestMove = [0, 0];
    let promises = [];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] == "") {
                let curPos = makePBoard();
                let newState = JSON.parse(JSON.stringify(state)); 
                newState[i][j] = AITurn;
                
                let pBox = document.getElementById(`${curPos}${i}${j}`);
                let circle = document.createElement("div");
                circle.classList.add("circle");
                circle.classList.add("currMove");
                pBox.appendChild(circle);

                // Push the promise returned by minimax to the promises array
                promises.push(minimax(newState, humanTurn, delayInput, curPos, true));
            }
        }
    }

    // Wait for all the promises to resolve
    await Promise.all(promises);

    // After all promises are resolved, find the best move and add the mark
    let tmpPos = 1;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (state[i][j] == "") {
                let newState = JSON.parse(JSON.stringify(state));
                newState[i][j] = AITurn;

                let result = await minimax(newState, humanTurn, delayInput, tmpPos, false);
                if (result > bestResult) {
                    bestResult = result;
                    bestMove = [i, j];
                }

                let board = document.getElementById(`${tmpPos}`);
                if (result == 1) {
                    board.classList.add("win");
                } else if (result == 0) {
                    board.classList.add("tie");
                } else {
                    board.classList.add("lose");
                }
                console.log(bestResult);
                tmpPos += 1;
            }
        }
    }

    addMark(AITurn,`${bestMove[0]}${bestMove[1]}`);
}

// --------------------------------------------------------- Mini Max

async function minimax(currState, currTurn, delayInput, pos, makeMarks){
    if (makeMarks){
        await sleep(delayInput);
    }

    if (await checkWinner(currState, AITurn)){
        return 1
    } else if (await checkWinner(currState, humanTurn)){
        return -1
    }

    // Check for Draw
    if (await checkDraw(currState)){
        return 0;
    }

    let result = 0
    if (currTurn == AITurn){
        result = -Infinity;
    } else {
        result = Infinity;
    }
    
    for(let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            let pBox = document.getElementById(`${pos}${i}${j}`);
            if (currState[i][j] == ""){
                if (currTurn == AITurn){
                    let circle = document.createElement("div");
                    if (makeMarks){
                        circle.classList.add("circle");
                        pBox.appendChild(circle);
                    }
                    
                    currState[i][j] = AITurn;
                    

                    result = Math.max(await minimax(currState,humanTurn, delayInput, pos, makeMarks), result);
                    
                    currState[i][j] = "";

                    if (makeMarks){
                        pBox.removeChild(circle);
                    }
                    
                } else {
                    let cross = document.createElement("div");
                    if (makeMarks){
                        cross.classList.add("cross");
                        pBox.appendChild(cross);
                    }
                    

                    currState[i][j] = humanTurn;
                    

                    result = Math.min(await minimax(currState, AITurn, delayInput, pos, makeMarks), result);
                    
                    currState[i][j] = "";
                    
                    if (makeMarks){
                        pBox.removeChild(cross);
                    }
                   
                }
            }
        }
    }
    return result;
}

async function checkWinner(currState, currTurn){
    // If Win == true, noWin == false

    // Check horizontal and vertical
    for (let i = 0; i < 3; i ++) {
        if (currState[i][0] == currTurn && currState[i][1] == currTurn && currState[i][2] == currTurn){
            return true;
        }

        if (currState[0][i] == currTurn && currState[1][i] == currTurn && currState[2][i] == currTurn){
            return true;
        }
    }

    // Check diagonal
    if (currState[0][0] == currTurn && currState[1][1] == currTurn && currState[2][2] == currTurn){
        return true;
    } else if (currState[0][2] == currTurn && currState[1][1] == currTurn && currState[2][0] == currTurn){
        return true;
    } else {
        return false;
    }


}

async function checkDraw(currState){
    // Draw == true, not Draw == false
    let draw = true;
    for(let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if (currState[i][j] === ""){
                draw = false;
            }
        }
    }
    return draw
}

// ------------------------------------------------------------------


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

loadTicTacToe();
let clear = true;

function makeInputBox() {
    let inputNumber = document.createElement("input");
    inputNumber.className = "numInput";
    inputNumber.type = "text";
    inputNumber.maxLength = "1";
    inputNumber.addEventListener("input", function() {
        var value = this.value;
        if (!/^[1-9]$/.test(value)) {
            this.value = "";
        }
    });
    return inputNumber;
}
function loadBoard() {
    let status = document.getElementById("status");
    status.textContent = "Hello, press the above button to run the program.";
    let board = document.getElementById("board");
    for(let i = 0; i < 9; i++) {
        for (let j = 0;j < 9;j++) {
            let newBox = document.createElement("div");
            newBox.id = `${i}${j}`;
            newBox.className = "sudokuBox";
            let inputNumber = makeInputBox();
            newBox.append(inputNumber);
            board.appendChild(newBox);
        }
    }
}
function restart() {
    if (!clear) return;
    let inputBoxes = document.querySelectorAll(`.sudokuBox`);
    inputBoxes.forEach((box)=>{
        box.remove();
    });
    loadBoard();
}
async function getBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill("."));
    for(let i = 0; i < 9; i++) {
        for (let j = 0;j < 9;j++) {
            let box = document.getElementById(`${i}${j}`);
            if (box.firstChild.value) {
                board[i][j] = `${box.firstChild.value}`;
            }
        }
    }
    let delayInput = document.getElementById("delayInput").value;
    if (!delayInput) {
        delayInput = 300;
    }
    clear = false;
    let status = document.getElementById("status");
    status.textContent = "Running";
    await sudokuSolver(board, delayInput);
    clear = true;
    status.textContent = "Finished";
}


// --------------------------------------------------- Sudoku Solver

async function sudokuSolver(board,delayInput) {
    for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9;j++) {
              if (board[i][j] === ".") {
                  for(let num = 1; num < 10;num++) {
                      let k = num.toString()
                      if (isValid(i,j,k,board)) {
                          await sleep(delayInput);
                          board[i][j] = k;
                          let box = document.getElementById(`${i}${j}`);
                          box.firstChild.value = k;
                          if (await sudokuSolver(board,delayInput)) {
                              return true;
                          }
                          board[i][j] = ".";
                          box.firstChild.value = ".";
                      }
                  }
  
                  return false;
              }
          }
      }
  
      return true;
  };


  function isValid(i,j,num,board) {
      // check if the number at row i and col j is valid
      // check row & col
      for (let index = 0;index < 9;index++) {
          if (board[i][index] === num) {
              return false;
          }
          if (board[index][j] === num) {
              return false;
          }
      }
      // check box
      let start_row = Math.floor(i/3) * 3;
      let start_col = Math.floor(j/3) * 3;
      for (let row = 0; row < 3;row++) {
          for (let col = 0; col < 3; col++) {
              tmp_row = start_row + row;
              tmp_col = start_col + col;
              if (board[tmp_row][tmp_col] === num) {
                  return false;
              }
          }
      }
      return true
  }

// --------------------------------------------------------------

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
loadBoard();
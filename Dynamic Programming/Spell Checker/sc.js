// ------------------------------------------ Spell Checker

async function spellChecker(target, word, delayInput){
    // compare the word to all the words in the list
    let n = target.length;
    let m = word.length;

    let dpContainer = document.getElementById('dpContainer');
    let row = createRow();

    let box = createBox();
    row.appendChild(box);
    
    for (let l = 0; l < n+1; l++){
        let box = createBox();

        if (l == 0) {
            box.textContent = "_";
        } else {
            box.textContent = target[l-1];
        }
        box.id = `0${l}`;
        row.appendChild(box);
    }
    
    dpContainer.appendChild(row);

    // Creating the 2D array
    let dp = [];
    for (let r = 0; r < m+1; r++){
        dp[r] = []

        let row = createRow();

        let box = createBox();
        if (r == 0){
            box.textContent = "_";
        } else {
            box.textContent = word[r-1];
        }
        box.id = `${r+1}0`;
        row.appendChild(box);
        

        for (let c = 0; c < n+1; c++){
            dp[r][c] = 0;

            
            let newBox = createBox();
            newBox.textContent = "0";
            newBox.id = `${r+1}${c+1}`;
            row.appendChild(newBox);
        }

        dpContainer.appendChild(row);
        
    }

    // fill the first row with 0-n
    for(let i = 0; i < n+1; i++){
        dp[0][i] = i;
        
        await sleep(delayInput);

        let box = document.getElementById(`1${i+1}`);
        box.textContent = i;
    }

    // fill the first column with 0-m
    for(let j = 0; j < m+1; j++){
        dp[j][0] = j;

        await sleep(delayInput);

        let box = document.getElementById(`${j+1}1`);
        box.textContent = j;
    }

    // Start the algorithm
    for(let r = 1; r < m+1; r++){
        let rowBox = document.getElementById(`${r+1}0`);
        rowBox.classList.add("check");

        for (let c = 1; c < n+1; c++){
            let cost = 0;
            if (word[r-1] != target[c-1]){
                cost = 1;
            }

            let colBox = document.getElementById(`0${c}`);
            colBox.classList.add("check");

            let insertBox = document.getElementById(`${r}${c+1}`);
            let deleteBox = document.getElementById(`${r+1}${c}`);
            let subBox = document.getElementById(`${r}${c}`);
            let currBox = document.getElementById(`${r+1}${c+1}`);

            insertBox.classList.add("boxCheck");
            deleteBox.classList.add("boxCheck");
            subBox.classList.add("boxCheck");
            currBox.classList.add("boxCheck");

            await sleep(delayInput);

            dp[r][c] = Math.min(
                dp[r-1][c] + 1, // Insertion
                dp[r][c-1] + 1, // Deletion
                dp[r-1][c-1] + cost // Substitution
            );

            currBox.textContent = dp[r][c];

            await sleep(delayInput);

            insertBox.classList.remove("boxCheck");
            deleteBox.classList.remove("boxCheck");
            subBox.classList.remove("boxCheck");
            currBox.classList.remove("boxCheck");

            await sleep(delayInput);

            colBox.classList.remove("check");
        }
        rowBox.classList.remove("check");
    } 

    // Display the result
    let result = document.getElementById("result");
    result.textContent = "Edit Distance: " + dp[m][n];

}

function createRow(){
    let row = document.createElement("div");
    row.classList.add("row");
    return row;
}

function createBox(){
    let box = document.createElement("div");
    box.classList.add("box");
    return box;
}


// --------------------------------------------------------\

async function startAlgo(){

    // Delete previous rows
    let rows = document.querySelectorAll(".row");
    rows.forEach((row) => {
        row.remove();
    });

    document.getElementById("result").textContent = "";

    let delayInput = document.getElementById("delayInput").value;
    if (!delayInput) {
        delayInput = 300;
    }

    let firstWord = document.getElementById("first").value;
    let secondWord = document.getElementById("second").value;

    await spellChecker(firstWord,secondWord,delayInput);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
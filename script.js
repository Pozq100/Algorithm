// When going each folders, redirect the user to the folder clicked
function redirect(clickedFolder) {
    //redirect the user to the respective folders pages
    let folderID = clickedFolder.id;
    
    if (folderID == "sorting") {
        window.location.href = "./Sorting/sorting.html";
    } else if (folderID == "dp") {
        window.location.href = "./Dynamic Programming/dp.html";
    } else if (folderID == "backtracking") {
        window.location.href = "./Backtracking/bt.html";
    }
}

// Redirect users to the cards algorithms
function redirectCard(clickedCard) {
    let cardID = clickedCard.id;
    // Sorting Algorithms
    if (cardID == "bubbleSort") {
        window.location.href = "./BubbleSort/bubblesort.html";
    }
    // Dynamic Programming
    else if (cardID == "spellchecker"){
        window.location.href = "./Spell Checker/sc.html"
    }
    // Backtracking Algorithms
    else if (cardID == "minimax") {
        window.location.href = "./Mini-Max/TicTacToe.html";
    } else if (cardID == "sudokusolver") {
        window.location.href = "./Sudoku_Solver/sudoku.html";
    }
}

// Return to the previous page
function histBack() {
    if (navigation.canGoBack) {
        history.back();
    }
}
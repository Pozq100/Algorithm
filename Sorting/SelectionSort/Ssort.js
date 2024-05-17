function makeInputBox(index) {
    let inputNumber = document.createElement("input");
    inputNumber.className = "eachIndex";
    inputNumber.id = index;
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

function loadArray(){
    let container = document.getElementById("container");
    
    for (let i = 0; i < 9; i++){
        let newInput = makeInputBox(i);
        container.appendChild(newInput);
    }
}

function clearInput(){
    for (let i = 0; i < 9; i++){
        let input = document.getElementById(i);
        if (input.classList.contains("correct")){
            input.classList.remove("correct");
        }
        input.value = "";
    }
}

// ------------------------------------------------------------------ Selection Sort
async function selectionSort(array, delayInput) {
    let n = array.length;
    for (let i = 0; i < n; i++) {
        let smallest = i;

        let box = document.getElementById(i);
        box.classList.add("smallest");
        
        await sleep(delayInput);
        
        for (let j = i; j < n; j++) {
            await sleep(delayInput);

            // Find the smallest in the array
            if (array[j] < array[smallest]){
                smallest = j;
            }
        }
        // Swap the current pos of i with the smallest int pos in the array
        await sleep(delayInput);

        let tmp = array[i];
        array[i] = array[smallest];
        array[smallest] = tmp;

        await sleep(delayInput);
    }

    console.log(array)
}


// --------------------------------------------------------------------------------
async function startSort(){
    // Get Desired delay in ms
    let delayInput = document.getElementById("delayInput").value;
    if (!delayInput) {
        delayInput = 300;
    }

    let array = [];
    for (let i = 0; i < 9; i++){
        let value = document.getElementById(i).value;
        if(!value){
            value = Math.round(Math.random() * 9);
            document.getElementById(i).value = value;
        }
        array.push(parseInt(value));
    }
    await sleep(delayInput);
    await selectionSort(array, delayInput);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


loadArray();
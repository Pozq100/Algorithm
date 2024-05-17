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

// ----------------------------------------------- Bubble Sort

async function bubbleSort(array, delay){
    for (let i = 0; i < array.length; i++){
        for (let j = 0; j < array.length - i - 1; j++){
            let left = document.getElementById(j);
            let right = document.getElementById(j+1);
            left.classList.add("compare");
            right.classList.add("compare");
            
            await sleep(delay);

            left.classList.remove("compare");
            right.classList.remove("compare");

            if (array[j] > array[j + 1]){
                left.classList.add("swap");
                right.classList.add("swap");

                await sleep(delay);

                // Swap
                let tmp = array[j];

                left.value = right.value;
                array[j] = array[j+1];

                right.value = tmp;
                array[j+1] = tmp;

                left.classList.remove("swap");
                right.classList.remove("swap");
            }
        }
        let correct = document.getElementById(8 - i);
        correct.classList.add("correct");
    }
}

// ----------------------------------------------------------------

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
    await bubbleSort(array, delayInput);

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

loadArray();
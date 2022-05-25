let inputVal = "";
let firstVal = 0;
let secondVal = 0;
let arrayValues = [];

function insert(inputVal) {
    document.querySelector("#display").insertAdjacentHTML("beforeend", `${inputVal}`);
}

function insertResult(result) {
    document.querySelector("#result").innerHTML = "=";
    document.querySelector("#result").insertAdjacentHTML("beforeend", `${result}`);
}

document.querySelector("#buttons").addEventListener('click', (e) => {
    //console.log(e.target);
    if (e.target.classList[1] === 'btn-num') {
        //arrayValues.push(e.target.innerText*1);
        insert(e.target.innerText);
    }
    if (e.target.classList[1] === 'btn-special' && e.target.classList[2] != 'btn-exp1') {
        // if (typeof(arrayValues[arrayValues.length - 1]) == "number" ) {
        //     //arrayValues.push(e.target.innerText);
            insert(e.target.innerText);
        // } else {
        //     //arrayValues.pop();
        //     //arrayValues.push(e.target.innerText);
            // insert(e.target.innerText);
        // }
    }
    if (e.target.classList[2] === 'btn-exp1') {
        insert('^(-1)');        
    }
})

const availableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '-', '(', ')', '.'];
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key == "Escape") {document.querySelector("#btn-AC").click();}
    else if (e.key == "Enter") {document.querySelector("#btn-equal").click();} 
    else if (e.key == 'Backspace') {document.querySelector("#Del").click();}
    else if (e.key == '*') {insert('x');}
    else if (availableChars.indexOf(e.key) > -1) {
        insert(e.key);
    }
})

document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValues = [];
    inputVal = "";
    strNums = "";
    strFuns = "";
    result = 0;
    // saveToHistorial();
    document.querySelector("#display").innerHTML = "";
    document.querySelector("#result").innerHTML = "=";
})

// Implement backspace button functionality:
document.querySelector("#Del").addEventListener('click', (e) => { 
    let content = document.querySelector("#display").textContent;
    inputVal = content.substring(0,content.length - 1);
    document.querySelector("#display").innerHTML = "";
    insert(inputVal);
})

let expression = "";
let result = 0;
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    expression = document.querySelector("#display").innerText; //Select the current math expression.
    // expression = expression.replace(/[^()-/\d\/x+.^]/g, ""); //Replace any text other than digits and math operators.
    expression = expression.replace(/x/g, "*"); //Replace symbol 'x' with multiplication operator.
    expression = expression.replace(/\^/g, "**"); //Replace symbol '^' with exponential operator.
    expression = expression.replace(/cos/g, "Math.cos");
    expression = expression.replace(/sin/g, "Math.sin");
    expression = expression.replace(/tan/g, "Math.tan");
    expression = expression.replace(/π/g, "Math.PI");
    expression = expression.replace(/log/g, "Math.log10");
    expression = expression.replace(/ln/g, "Math.log");
    expression = expression.replace(/e/g, "Math.E");
    let matchRegex = /(?<=√)[\w+x^()]+/g;
    let found = expression.match(matchRegex);
    //console.log(matchRegex, found);
    expression = expression.replace(/(?<=√)[\w+x^()]+/g, `(${found})`);
    expression = expression.replace(/√/g, "Math.sqrt");
    found = expression.match(/\d+(?=\()|\d+(?=M)/g);
    console.log(found);
    expression = expression.replace(/\d+(?=\()|\d+(?=M)/g, `(${found})*`);
    expression = expression.replace(/\)(?=\d+)/g, ")*");

    // expression = expression.replace(/(?<=√\d)/g, "(");
    // expression = expression.replace(/\d/g, "")
    console.log(expression);

    calculate(expression); //Eval the math expression.
    insertResult(result);
    saveToHistorial();

});

function calculate(expression) {
    try {
        result = eval(expression);
        return result
    }
    catch(err) {
        result = "Error";
        return result
    } //Catch any found error and display 'Error' message.
}

function saveToHistorial() {
    let equation = document.querySelector("#display").innerText;
    let resultH = document.querySelector("#result").innerText;
       
    if (resultH != "=Error" && resultH !="=undefined" && resultH !="=function sqrt() { [native code] }") {
        document.querySelector("#historial").insertAdjacentHTML("afterbegin", `${equation}${resultH} <br>`);
    }
}
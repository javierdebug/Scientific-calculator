let inputVal = "";
let firstVal = 0;
let secondVal = 0;
// let arrayValuesDisplay = [];
let arrayValuesCalculate = [];


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
        arrayValuesCalculate.push(e.target.innerText)//*1);
        insert(e.target.innerText);
    }
    if (e.target.classList[1] === 'btn-special' && e.target.classList[3] != 'btn-none') {

        insert(e.target.innerText);
        
        if (e.target.classList[2] == 'btn-alg') {
            arrayValuesCalculate.push(`Math.${e.target.innerText}(`);
            insert(`(`);
        } else if (e.target.classList[2] == 'btn-mult') {
            arrayValuesCalculate.push('*');
        } else if (e.target.classList[2] == 'btn-pow') {
            arrayValuesCalculate.push('**');
        } else if (e.target.classList[2] == 'btn-sqrt') {
            arrayValuesCalculate.push('Math.sqrt(');
            insert('(');
        } else if (e.target.classList[2] == 'btn-PI') {
            arrayValuesCalculate.push('Math.PI');
        } else if (e.target.classList[2] == 'btn-E') {
            arrayValuesCalculate.push('Math.E');
        }else {
            console.log('I last');
            arrayValuesCalculate.push(e.target.innerText);
        }
    }
    if (e.target.classList[2] === 'btn-exp1') {
        arrayValuesCalculate.push('**(-1)');
        insert('⁻¹');        
    }
    if (e.target.classList[2] === 'btn-abs') {
        if (arrayValuesCalculate.length == 0) {
            arrayValuesCalculate.push('Math.abs(');
        } else if (arrayValuesCalculate.length - 1) {
            
        }
        insert('|');
    }

})

const availableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '-', '(', ')', '.', '|', '^'];
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key == "Escape") {document.querySelector("#btn-AC").click();}
    else if (e.key == "Enter") {document.querySelector("#btn-equal").click();} 
    else if (e.key == 'Backspace') {document.querySelector("#Del").click();}
    else if (e.key == '*') {
        arrayValuesCalculate.push('*');
        insert('x');}
    else if (availableChars.indexOf(e.key) > -1) {
        arrayValuesCalculate.push(e.key);
        insert(e.key);
    }
})

//Clear display button:
document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValuesCalculate = [];
    inputVal = "";
    strNums = "";
    strFuns = "";
    result = 0;
    // saveToHistorial();
    document.querySelector("#display").innerHTML = "";
    document.querySelector("#result").innerHTML = "=";
})

//Clear history memory: 
document.querySelector("#clear-mem").addEventListener('click', (e) => {
    document.querySelector("#historial").innerText = "";
    clearHistory();
})

// Implement backspace button functionality:
document.querySelector("#Del").addEventListener('click', (e) => { 
    let content = document.querySelector("#display").textContent;
    inputVal = content.substring(0,content.length - 1);
    document.querySelector("#display").innerHTML = "";
    insert(inputVal);
    arrayValuesCalculate.pop();
})

let expression = "";
let result = 0;
let found = "";
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    // expression = document.querySelector("#display").innerText; //Select the current math expression.
    expression = arrayValuesCalculate.join('');

    // expression = expression.replace(/x/g, "*"); //Replace symbol 'x' with multiplication operator.
    // expression = expression.replace(/\^/g, "**"); //Replace symbol '^' with exponential operator.

    // expression = expression.replace(/cos/g, "Math.cos("); //Replace cos with Math.cos
    // expression = expression.replace(/sin/g, "Math.sin("); //Replace sin with Math.sin
    // expression = expression.replace(/tan/g, "Math.tan("); //Replace tan with Math.tan
    // expression = expression.replace(/π/g, "Math.PI"); //Replace pi symbol π with Math.PI
    // // expression = expression.replace(/log/g, "Math.log10"); //Replace log with Math.log10
    // // expression = expression.replace(/ln/g, "Math.log"); //Replace ln with Math.log
    // expression = expression.replace(/e/g, "Math.E"); //Replace e with Math.E

    // let matchRegex = /(?<=√)[\w\W]+/g;
    // found = expression.match(matchRegex); //Find expression inside square root symobl √
    // //console.log(matchRegex, found);
    // console.log(expression);
    // expression = expression.replace(/(?<=√)[\w\W]+/g, `(${found})`); //Add previous expresion found inside parentheses
    // expression = expression.replace(/√/g, "Math.sqrt"); //Replace √ symbol with Math.sqrt to correctly make the calculation.

    found = expression.match(/\d+(?=\()|\d+(?=M)/g); //Find any digits before an 'M' for 'Math' OR before an open parenthesis '('.
    expression = expression.replace(/\d+(?=\()|\d+(?=M)/g, `(${found})*`); //Add previous expression found inside parentheses. This will allow transform '5(2)' to '5*(2)' and '5Math.cos' into '5*Math.cos'
    expression = expression.replace(/\)(?=\d+)/g, ")*"); //Every parentheses before a digit will transform for example: ')3' into ')*3).
    
    // found = expression.match(/(?<=cos)[\w.\*(+-x\/\)]+|(?<=sin)[\w.\(+-x*\/\)]+|(?<=tan)[\w.\(+-x*\/\)]+/g);
    // console.log(found, expression);
    // expression = expression.replace(/(?<=cos)[\w.\*(+-x\/\)]+|(?<=sin)[\w.\(+-x*\/\)]+|(?<=tan)[\w.\(+-x*\/\)]+/g, `(${found})`) //Everything a cos, sin or tan doesn't include parenthesis before value, add them.

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
        // if (result < 0.000001) {
        //     result = 0;
        // }
        return result
    }
    catch(err) {
        result = "Error";
        return result
    } //Catch any found error and display 'Error' message.
}

let expHistoryArray = [];
let resHistoryArray = [];
let arrayValuesCalculateHistory = [];
let countHistory = 0;
function saveToHistorial() {
    let equation = document.querySelector("#display").innerText;
    let resultH = document.querySelector("#result").innerText.replace(/=/g, "");
       
    if (resultH != "Error" && resultH !="undefined" && resultH !="function sqrt() { [native code] }") {
        // document.querySelector("#historial").insertAdjacentHTML("afterbegin", `${equation}${resultH} <br>`);
        document.querySelector("#historial").insertAdjacentHTML("afterbegin", `<section class='hist ${countHistory}'> ${equation} = ${resultH} </section>`);

        expHistoryArray.push(equation);
        resHistoryArray.push(resultH);
        arrayValuesCalculateHistory.push(expression);
        countHistory++;
    }
}

//Clear History memeroy arrays:
function clearHistory(params) {
    expHistoryArray = [];
    resHistoryArray = [];
}

//Setup the factorial function:
function factorialCalculate(params) {
    
}

//Return history equation or result to display:
document.querySelector('body').addEventListener('click', function (e) {
    if (e.target.classList[0] == 'hist') {
        // console.log(e.target.classList[1]);
        let historyValue = e.target.classList[1]*1;
        // console.log(historyValue);
        let memResult = resHistoryArray[historyValue];
        let memExpr = expHistoryArray[historyValue];
        let memEval = arrayValuesCalculateHistory[historyValue];
        arrayValuesCalculate = []
        arrayValuesCalculate.push(memEval);
        insertResult(memResult);
        document.querySelector("#display").innerHTML = "";
        insert(memExpr);
    }

})

function name(params) {
    
}
let inputVal = "";
let firstVal = 0;
let secondVal = 0;
let arrayValuesDisplay = [];
let arrayValuesCalculate = [];
let ans = 0;


function insert(inputVal) {
    //console.log(inputVal);
    // if (arrayValuesCalculate[arrayValuesCalculate.length-2] == '*' && arrayValuesCalculate[arrayValuesCalculate.length-1] == '*') {
    //     //console.log('multi');
    //     let content = document.querySelector("#display").textContent;
    //     inputVal = content.substring(0,content.length - 1);
    //     document.querySelector("#display").innerHTML = "";
    //     document.querySelector("#display").insertAdjacentHTML("beforeend", `${inputVal}`);
    //     document.querySelector("#display").insertAdjacentHTML("beforeend", `^`);
    //     arrayValuesDisplay.pop();
    //     arrayValuesCalculate.pop();
    //     arrayValuesCalculate.pop();
    //     arrayValuesCalculate.push('**');
    // } else {
    //     document.querySelector("#display").insertAdjacentHTML("beforeend", `${inputVal}`);
    // }
}

function insertResult(result) {
    document.querySelector("#result").innerHTML = "=";
    document.querySelector("#result").insertAdjacentHTML("beforeend", `${result}`);
}

document.querySelector("#buttons").addEventListener('click', (e) => {
    //console.log(e.target);
    if (e.target.classList[1] === 'btn-num') {
        arrayValuesCalculate.push(e.target.innerText);
        insert(e.target.innerText);
        arrayValuesDisplay.push(e.target.innerText);
    }
    if (e.target.classList[1] === 'btn-special' && e.target.classList[3] != 'btn-none') {

    insert(e.target.innerText);
    arrayValuesDisplay.push(e.target.innerText);
        
        if (e.target.classList[2] == 'btn-alg') {
            arrayValuesCalculate.push(`Math.${e.target.classList[3]} `);
            arrayValuesCalculate.push('(');
            insert(`(`);
            arrayValuesDisplay.push('(');
        } else if (e.target.classList[2] == 'btn-mult') {
            arrayValuesCalculate.push('*');
        // } else if (e.target.classList[2] == 'btn-pow') {
        //     arrayValuesCalculate.push('**');
        } else if (e.target.classList[2] == 'btn-sqrt') {
            arrayValuesCalculate.push('Math.sqrt ');
            arrayValuesCalculate.push('(');
            insert('(');
            arrayValuesDisplay.push('(');
        } else if (e.target.classList[2] == 'btn-PI') {
            arrayValuesCalculate.push('Math.PI ');
        } else if (e.target.classList[2] == 'btn-E') {
            arrayValuesCalculate.push('Math.E ');
        } else if (e.target.classList[2] == 'btn-%') {
            arrayValuesCalculate.push('/100');
        } else {
            console.log('I last');
            arrayValuesCalculate.push(e.target.innerText);
        }
    }
    if (e.target.classList[2] === 'btn-exp1') {
        arrayValuesCalculate.push('**(-1');
        arrayValuesCalculate.push(')');
        insert('⁻¹');        
        arrayValuesDisplay.push('⁻¹');        
        // insert('<sup>-1</sup>');
    }
    if (e.target.classList[2] === 'btn-exp2') {
        arrayValuesCalculate.push('**(2)');
        insert('²');
        arrayValuesDisplay.push('²');
        // insert('<sup>2</sup>');
    }
    if (e.target.classList[2] === 'btn-exp3') {
        arrayValuesCalculate.push('**(3)');
        insert('³');
        arrayValuesDisplay.push('³');
        // insert('<sup>3</sup>');
    }
    if (e.target.classList[2] === 'btn-pow') {
        arrayValuesCalculate.push('**');
        insert('^');
        arrayValuesDisplay.push('^');
    }
    if (e.target.classList[2] === 'btn-sign') {
        changeSign();
    }
    // if (e.target.classList[2] === 'btn-fact') {
    //     arrayValuesCalculate.push('!');
    //     insert('!')
    //}
    if (e.target.classList[2] === 'btn-abs') {
        if (arrayValuesCalculate.length == 0) {
            arrayValuesCalculate.push('Math.abs ( ');
        } else if (arrayValuesCalculate.length - 1) {
            
        }
        insert('|');
        arrayValuesDisplay.push('|');
    }

    updateDisplay();
})

function updateDisplay() {
    if (arrayValuesCalculate[arrayValuesCalculate.length-2] == '*' && arrayValuesCalculate[arrayValuesCalculate.length-1] == '*') {
        arrayValuesDisplay.pop();
        arrayValuesDisplay.pop();
        arrayValuesCalculate.pop();
        arrayValuesCalculate.pop();
        arrayValuesCalculate.push('**');
        arrayValuesDisplay.push('^');
        document.querySelector("#display").innerText = arrayValuesDisplay.join('');
    } else {
            // document.querySelector("#display").insertAdjacentHTML("beforeend", `${inputVal}`);
            document.querySelector("#display").innerHTML = arrayValuesDisplay.join('');
    }
}

const availableChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/', '-', '(', ')', '.', '|', '^'];
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    console.log(e.key);
    if (e.key == "Escape") {document.querySelector("#btn-AC").click();}
    else if (e.key == "Enter") {document.querySelector("#btn-equal").click();} 
    else if (e.key == 'Backspace') {document.querySelector("#Del").click();}
    else if (e.key == '*') {
        arrayValuesCalculate.push('*');
        insert('x');
        arrayValuesDisplay.push('x')}
    else if (availableChars.indexOf(e.key) > -1) {
        arrayValuesCalculate.push(e.key);
        insert(e.key);
        arrayValuesDisplay.push(e.key);
    }
    updateDisplay();
})

//Clear display button:
document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValuesCalculate = [];
    arrayValuesDisplay = [];
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
    // let content = document.querySelector("#display").textContent;
    // inputVal = content.substring(0,content.length - 1);
    // document.querySelector("#display").innerHTML = "";
    // insert(inputVal);
    arrayValuesCalculate.pop();
    arrayValuesDisplay.pop();
})

let expression = "";
let result = 0;
let found = "";
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    // expression = document.querySelector("#display").innerText; //Select the current math expression.
    expression = arrayValuesCalculate.join('');
    
    console.log(expression);
    found = expression.match(/\d+(?=\()|\d+(?=M)/g); //Find any digits before an 'M' for 'Math' OR before an open parenthesis '('. Ex: '10Math.cos' or '9(10+1)'.
    expression = expression.replace(/\d+(?=\()|\d+(?=M)/g, `(${found})*`); //Add previous expression found inside parentheses. This will allow transform '5(2)' to '5*(2)' and '5Math.cos' into '5*Math.cos'
    console.log(expression);
    expression = expression.replace(/\)(?=\d+)/g, ")*"); //Every parentheses before a digit will transform for example: ')3' into ')*3).
    console.log(expression);
    expression = expression.replace(/\)\(/g, ")*("); //Replace every encounter of ')(' with ')*(';

    divideAndConquer(expression);

    expression = countParenthesesAndFix(expression);

    
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

//Save in History:
let expHistoryArray = [];
let resHistoryArray = [];
let arrayValuesCalculateHistory = [];
let countHistory = 0;
function saveToHistorial() {
    // let equation = document.querySelector("#display").innerText;
    let equation = arrayValuesDisplay.join('');
    // let resultH = document.querySelector("#result").innerText.replace(/=/g, "");
    let resultH = result;
       
    if (resultH != "Error" && resultH !="undefined" && resultH !="function sqrt() { [native code] }" && resultH != "NaN") {
        // document.querySelector("#historial").insertAdjacentHTML("afterbegin", `${equation}${resultH} <br>`);
        document.querySelector("#historial").insertAdjacentHTML("afterbegin", `<section class='hist ${countHistory}'> ${countHistory+1}) ${equation} = ${resultH} </section>`);

        expHistoryArray.push(equation);
        resHistoryArray.push(resultH);
        arrayValuesCalculateHistory.push(expression);
        countHistory++;
    }
}

//Clear History memeroy arrays:
function clearHistory(params) {
    countHistory = 0; 
    expHistoryArray = [];
    resHistoryArray = [];
}

//Setup the factorial function:
function factorialCalculate(value) {
    if (value < 0) {
        alert("Factorial is only defined for non-negative real numbers");
    }

    if (value == 0 || value == 1) {return 1};

    let result = 1;
    for (let i = 1; i <= value; i++) {
        result *= i;
        if (result === Infinity) {
            return Infinity
        }
    }
    
    return result
}

//Return a previous equation or result to display and work from it:
document.querySelector('body').addEventListener('click', function (e) {
    if (e.target.classList[0] == 'hist') {
        //console.log(e.target.classList[1]);
        let historyValue = e.target.classList[1]*1;
        //console.log(historyValue);
        let memResult = resHistoryArray[historyValue];
        let memExpr = expHistoryArray[historyValue];
        let memEval = arrayValuesCalculateHistory[historyValue];
        arrayValuesCalculate = [];
        arrayValuesCalculate.push(memEval);
        insertResult(memResult);
        document.querySelector("#display").innerHTML = "";
        //console.log(memExpr);
        arrayValuesDisplay = [];
        arrayValuesDisplay.push(memExpr);
        updateDisplay();
    }

})

function name(params) {
    
}

function countParenthesesAndFix(expression) {
    //console.log('here ' + expression.match(/\(/g).length);
    if (expression.match(/\(/g)) {
        let parenthesescount = 0;
        if (expression.match(/\)/g)) {
            parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length
        }else {
            parenthesescount = expression.match(/\(/g).length;
        }

        while (parenthesescount > 0) {
            
            expression = expression.concat(')');
            //console.log('inside while, ' + expression);
            
            parenthesescount = expression.match(/\(/g).length - expression.match(/\)/g).length
            
        }
    }

    //console.log('final ' + expression);
    return expression
}

function divideAndConquer(expression) {
    
    
}
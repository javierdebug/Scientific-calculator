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
        arrayValues.push(e.target.innerText*1);
        insert(e.target.innerText);
    }
    if (e.target.classList[1] === 'btn-special') {
        if (typeof(arrayValues[arrayValues.length - 1]) == "number" ) {
            arrayValues.push(e.target.innerText);
            insert(e.target.innerText);
        } else {
            arrayValues.pop();
            arrayValues.push(e.target.innerText);
            insert(e.target.innerText);
        }
    }
})

document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValues = [];
    inputVal = "";
    strNums = "";
    strFuns = "";
    result = 0;
    document.querySelector("#display").innerHTML = "";
    document.querySelector("#result").innerHTML = "=";
})

let strNums = "";
let strFuns = "";
let expression = "";
let result = 0;
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    //console.log(arrayValues);
    // strNums = arrayValues.join('').split(/[x+-/]/);
    // strFuns = arrayValues.join('').split(/\d+/).join('').split('');
    
    // console.log(strNums,strFuns);
    // str = str.split(/\d+/gm);
    // console.log(str);
    expression = document.querySelector("#display").innerText;
    expression = expression.replace(/[^()-/\d\/x+.^]/g, "");
    expression = expression.replace(/x/g, "*");
    expression = expression.replace(/\^/g, "**");
    result = eval(expression);

    insertResult(result);
});


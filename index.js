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
document.querySelector("#btn-equal").addEventListener('click', (e) => {
    //console.log(arrayValues);
    strNums = arrayValues.join('').split(/[x+-/]/);
    strFuns = arrayValues.join('').split(/\d+/).join('').split('');
    
    // console.log(strNums,strFuns);
    // str = str.split(/\d+/gm);
    // console.log(str);
    calculate(strNums,strFuns)
    insertResult(result);
});


let result = 0;
function calculate(...params) {
    result = 0;
    console.log(params[0], params[1]);
    let a = params[1].length-1;
    let times = 0;
    for (let i = params[0].length - 1; i > 0; i--) {
        console.log(i, params[0][i]);
        if (times == 0) {
            let penUltNum = params[0][i-1]*1;
            let ultNum = params[0][i]*1;
            result += ultNum + penUltNum;
            times++;
        } else {
            let penUltNum = params[0][i-1]*1;
            result += penUltNum;
        }

        console.log(result);
        
        //console.log('entré');
        //console.log(params[0][i],params[1][i], params[0][i-1]);
        //for (let j = params[1].length - 1; j >= 0; j--) {
            //console.log("entré x2");
            // if (params[1][a] == '+'){// && a >= 0) {
            //     console.log("entré x3");
            //     console.log(result, params[0][i]*1)//, params[0][i-1]*1);
            //     result += params[0][i]*1 + params[0][i-1]*1;
            //     a--;
            // }   
        //}     
    }
    return result
}


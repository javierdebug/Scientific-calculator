let inputVal = "";
let firstVal = 0;
let secondVal = 0;
let arrayValues = [];

function insert(inputVal) {
    document.querySelector("#display").insertAdjacentHTML("beforeend", `${inputVal}`);
}

document.querySelector("#buttons").addEventListener('click', (e) => {
    //console.log(e.target.classList[1]);
    if (e.target.classList[1] === 'btn-num' || e.target.classList[1] === 'btn-special') {
        arrayValues.push(e.target.innerText);
        insert(e.target.innerText);
    }
    // if (e.target.classList[2] === 'btn-plus') {
    //     calculate(arrayValues,'plus');
    // }
})

document.querySelector("#btn-AC").addEventListener('click', (e) => {
    arrayValues = [];
    inputVal = "";
    document.querySelector("#display").innerHTML = "";
})

document.querySelector("#btn-equal").addEventListener('click', (e) => {
    let str = "";
    console.log(arrayValues);
    str = arrayValues.join('')
    console.log(str);
    str = str.split(/\d+/gm);
    console.log(str);

});

function calculate(params) {
    console.log(params);
    // params.split('');
    // console.log(params);
    // copy2 = str.split(/[^?!.,]/).join('')//.split('');
}
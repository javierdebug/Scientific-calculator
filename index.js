let inputVal = "";

function insert(inputVal) {
    document.querySelector("#display").insertAdjacentHTML("beforeend", `${inputVal}`);
}

document.querySelector(".btn-num").addEventListener('click', (e) => {
    // const button = e.target
    // inputVal = console.log(e.target.innerText);
    insert(e.target.innerText);
})
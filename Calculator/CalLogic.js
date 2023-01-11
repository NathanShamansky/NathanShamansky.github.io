const pointButton = document.querySelector(".point-button");
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const negativeButton = document.querySelector(".negative-button");

let firstNum = "";
let secondNum = "";
let operator = "";

function checkOperator() {
    if (operator === "+") {
        firstNum = parseFloat(firstNum) + parseFloat(secondNum);
    } else if (operator === "-") {
        firstNum = parseFloat(firstNum) - parseFloat(secondNum);
    } else if (operator === "*") {
        firstNum = parseFloat(firstNum) * parseFloat(secondNum);
    } else if (operator === "/") {
        firstNum = parseFloat(firstNum) / parseFloat(secondNum);
    }
    display.innerHTML = firstNum;
    secondNum = "";
    operator = "";
}

for (let button of buttons) {
    button.addEventListener("click", function() {
        let value = button.innerHTML;
        if (!isNaN(value) && value !== ".") { // check for numbers only
            if (operator !== "") {
                secondNum += value;
                display.innerHTML = secondNum;
            } else {
                firstNum += value;
                display.innerHTML = firstNum;
            }
        } else {
            switch (value) {
                case "+":
                case "-":
                case "*":
                case "/":
                    operator = value;
                    break;
                case "C":
                    firstNum = "";
                    operator = "";
                    secondNum = "";
                    display.innerHTML = "0";
                    break;
                case "=":
                    checkOperator();
                    break;
            }
        }
    });
}

negativeButton.addEventListener("click", function() {
    if (operator === "") {
        if (firstNum.charAt(0) === "neg") {
            firstNum = -(+firstNum);
        } else {
            firstNum = -(+firstNum);
        }
        display.innerHTML = firstNum;
    } else {
        if (secondNum.charAt(0) === "neg") {
            secondNum = -(+secondNum);
        } else {
            secondNum = -(+secondNum);
        }
        display.innerHTML = secondNum;
    }
});

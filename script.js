// Global variables
let a = "";
let b = "";
let operator = "";

// Select the element with ID "display"
let display = document.querySelector("#display");

// Select numeric buttons elements
let zero = document.getElementById("0");
let one = document.getElementById("1");
let two = document.getElementById("2");
let three = document.getElementById("3");
let four = document.getElementById("4");
let five = document.getElementById("5");
let six = document.getElementById("6");
let seven = document.getElementById("7");
let eight = document.getElementById("8");
let nine = document.getElementById("9");

// Select operator and other buttons elements
let clear = document.getElementById("clear");
let back = document.getElementById("back");
let percent = document.getElementById("percent");
let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");
let subtract = document.getElementById("subtract");
let add = document.getElementById("add");
let dot = document.getElementById("dot");
let result = document.getElementById("result");
let negative = document.getElementById("negative");

// Numbers buttons

zero.addEventListener("click", () => {
    display.textContent += zero.textContent;
    if (operator === "") {
        a += "0";
    } else {
        b += "0";
    }
});

one.addEventListener("click", () => {
    display.textContent += one.textContent;
    if (operator === "") {
        a += "1";
    } else {
        b += "1";
    }
});

two.addEventListener("click", () => {
    display.textContent += two.textContent;
    if (operator === "") {
        a += "2";
    } else {
        b += "2";
    }
});

three.addEventListener("click", () => {
    display.textContent += three.textContent;
    if (operator === "") {
        a += "3";
    } else {
        b += "3";
    }
});

four.addEventListener("click", () => {
    display.textContent += four.textContent;
    if (operator === "") {
        a += "4";
    } else {
        b += "4";
    }
});

five.addEventListener("click", () => {
    display.textContent += five.textContent;
    if (operator === "") {
        a += "5";
    } else {
        b += "5";
    }
});

six.addEventListener("click", () => {
    display.textContent += six.textContent;
    if (operator === "") {
        a += "6";
    } else {
        b += "6";
    }
});

seven.addEventListener("click", () => {
    display.textContent += seven.textContent;
    if (operator === "") {
        a += "7";
    } else {
        b += "7";
    }
});

eight.addEventListener("click", () => {
    display.textContent += eight.textContent;
    if (operator === "") {
        a += "8";
    } else {
        b += "8";
    }
});

nine.addEventListener("click", () => {
    display.textContent += nine.textContent;
    if (operator === "") {
        a += "9";
    } else {
        b += "9";
    }
});

// Clear
back.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
    if (b !== "" && operator !== "") {
        b = b.slice(0, -1);
    } else if (operator !== "") {
        operator = "";
    } else if (a !== "") {
        a = a.slice(0, -1);
    }
});

clear.addEventListener("click", () => {
    display.textContent = "";
    a = "";
    b = "";
    operator = "";
});

// Operator buttons

percent.addEventListener("click", () => {
    if (a === "") {
        return;
    }

    if (operator === "") {
        a = (a / 100).toString();
        display.textContent =  a;
    } else if (a !== "" && operator !== "") {
        b = (b / 100).toString();
        display.textContent = a + operator + b;
    } else {
        return;
    }
});

divide.addEventListener("click", () => {
    if (a !== "" && operator == "/" && b == "") {
        b = a;
        calculateResult();
    }
    if (a !== "" && operator !== "" && b !== "" ) {
        calculateResult();
    }
    if (a === "") {
        return;
    }
    if (operator === "") {
        display.textContent += "/";
        operator = "/";
    } else if (operator !== "/") {
        display.textContent = display.textContent.slice(0, -1);
        operator = "/";
        display.textContent += "/";
    } else {
        return;
    }
});

multiply.addEventListener("click", () => {
    if (a !== "" && operator == "*" && b == "") {
        b = a;
        calculateResult();
    }
    if (a !== "" && operator !== "" && b !== "" ) {
        calculateResult();
    }
    if (a === "") {
        return;
    }
    if (operator === "") {
        display.textContent += "*";
        operator = "*";
    } else if (operator !== "*") {
        display.textContent = display.textContent.slice(0, -1);
        operator = "*";
        display.textContent += "*";
    } else {
        return;
    }
});

subtract.addEventListener("click", () => {
    if (a !== "" && operator == "-" && b == "") {
        b = a;
        calculateResult();
    }
    if (a !== "" && operator !== "" && b !== "" ) {
        calculateResult();
    }
    if (a === "") {
        return;
    }
    if (operator === "") {
        display.textContent += "-";
        operator = "-";
    } else if (operator !== "-") {
        display.textContent = display.textContent.slice(0, -1);
        operator = "-";
        display.textContent += "-";
    } else {
        return;
    }
});

add.addEventListener("click", () => {
    if (a !== "" && operator == "+" && b == "") {
        b = a;
        calculateResult();
    }
    if (a !== "" && operator !== "" && b !== "" ) {
        calculateResult();
    }
    if (a === "") {
        return;
    }
    if (operator === "") {
        display.textContent += "+";
        operator = "+";
    } else if (operator !== "+") {
        display.textContent = display.textContent.slice(0, -1);
        operator = "+";
        display.textContent += "+";
    } else {
        return;
    }
});

dot.addEventListener("click", () => {
    if (operator === "") {
        if (!a.includes(".")) {
            display.textContent += dot.textContent;
            a += ".";
        }
    } else if (!b.includes(".")) {
        display.textContent += dot.textContent;
        b += ".";
    }
});

// Variable to keep track of the state of the number (positive or negative)
let negativeClicked = false;

negative.addEventListener("click", () => {
    if (a === "") {
        return;
    }
    if (a !== "" && operator !== "" && b === "") {
        return;
    }
    if (operator === "") {
        a = (a * -1).toString();
        display.textContent = a;
    } else {
        b = (b * -1).toString();
        display.textContent = a + operator + b;
    }
});

// Call the function "calculateResult" here
result.addEventListener("click", () => {
    calculateResult();
});

function calculateResult() {
    let copyA = parseFloat(a);
    let copyB = parseFloat(b);
    let copyOperator = operator;
    let total = 0;
    b = "";

    switch(copyOperator) {
        case "+":
            total = copyA + copyB;
            break;
        case "-":
            total = copyA - copyB;
            break;
        case "/":
            total = copyA / copyB;
            break;
        case "*":
            total = copyA * copyB;
            break;
        case "%":
            total = copyA % copyB;
            break;
    }

    a = total.toFixed(2);
    operator = "";
    display.textContent = total;
}

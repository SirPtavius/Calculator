// Global variables
let a = "";
let b = "";
let operator = "";
let lastResult = false;

// Select the element with ID "display"
let display = document.querySelector("#display");
let displayTotal = document.querySelector("#displayTotal");

// Global variable to define the threshold for switching to scientific notation
const SCIENTIFIC_NOTATION_THRESHOLD = 1e9; // Modify this threshold as needed

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
zero.addEventListener("click", () => handleNumberClick(zero.textContent));
one.addEventListener("click", () => handleNumberClick(one.textContent));
two.addEventListener("click", () => handleNumberClick(two.textContent));
three.addEventListener("click", () => handleNumberClick(three.textContent));
four.addEventListener("click", () => handleNumberClick(four.textContent));
five.addEventListener("click", () => handleNumberClick(five.textContent));
six.addEventListener("click", () => handleNumberClick(six.textContent));
seven.addEventListener("click", () => handleNumberClick(seven.textContent));
eight.addEventListener("click", () => handleNumberClick(eight.textContent));
nine.addEventListener("click", () => handleNumberClick(nine.textContent));

function handleNumberClick(number) {
    if (lastResult) {
        display.textContent = "";
        a = "";
        lastResult = false;
    }
    // Controllo se il display è vuoto e il tasto premuto è il punto decimale
    if (display.textContent === "" && number === ".") {
        display.textContent = "0" + number;
        a += "0" + number;
    } else {
        display.textContent += number;
        if (operator === "") {
            a += number;
        } else {
            b += number;
        }
    }
}

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
    displayTotal.textContent = "0";
    a = "";
    b = "";
    operator = "";
});

// Operator buttons
divide.addEventListener("click", () => handleOperator("/"));
multiply.addEventListener("click", () => handleOperator("*"));
subtract.addEventListener("click", () => handleOperator("-"));
add.addEventListener("click", () => handleOperator("+"));

function handleOperator(functionOp) {
    if (lastResult) {
        lastResult = false;
    }
    if (a !== "" && operator == functionOp && b == "") {
        b = a;
        calculateResult();
    }
    if (a !== "" && operator !== "" && b !== "") {
        calculateResult();
    }
    if (a === "") {
        return;
    }
    if (operator === "") {
        display.textContent += functionOp;
        operator = functionOp;
    } else if (operator !== functionOp) {
        display.textContent = display.textContent.slice(0, -1);
        operator = functionOp;
        display.textContent += functionOp;
    } else {
        return;
    }
}

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

dot.addEventListener("click", () => {
    if (operator === "") {
        if (!a.includes(".")) {
            display.textContent += dot.textContent;
            a += ".";
        }
    } else {
        if (!b.includes(".")) {
            display.textContent += dot.textContent;
            b += ".";
        }
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
    lastResult = true;
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
    }

    if (Math.abs(total) >= SCIENTIFIC_NOTATION_THRESHOLD) {
        displayTotal.textContent = formatNumber(total);
        display.textContent = formatNumber(total);
    } else {
        a = total.toString();
        displayTotal.textContent = a;
        display.textContent = a;
    }
    
    operator = "";
}

function formatNumber(num) {
    if (Math.abs(num) >= SCIENTIFIC_NOTATION_THRESHOLD) {
        return num.toExponential();
    } else {
        return num.toString();
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        handleNumberClick(key);
    } else if (['+', '-', '*', '/', '%', '.'].includes(key)) {  
        handleOperator(key);
    } else if (key === 'Enter') { 
        calculateResult();
    } else if (key === 'Backspace') {    
        back.click(); 
    } else if (key === 'Delete') {
        clear.click(); 
    }
});
/*
to fix:
sistemare le operazioni con i numeri "e"
gestire meglio la quantita massima di numeri nel display
*/

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

// Constants for display formatting
const MAX_DISPLAY_LENGTH = 14; // Maximum number of characters before line break
const SPACE_BETWEEN_LINES = 2; // Space to maintain between lines

// Function to handle number button clicks
function handleNumberClick(number) {
    if (lastResult) {
        // Clear the display and reset variables if last result was displayed
        display.textContent = "";
        a = "";
        lastResult = false;
    }
    
    // Check if the display is empty and the pressed key is the decimal point
    if (display.textContent === "" && number === ".") {
        // If the display is empty and the pressed key is '.', set the display to "0."
        display.textContent = "0" + number;
        a += "0" + number;
    } else {
        // Remove extra spaces before adding a new number
        display.textContent = display.textContent.trim();

        // Check if the text exceeds the maximum length before line break
        if (display.textContent.length >= MAX_DISPLAY_LENGTH && !display.textContent.includes("\n")) {
            // Add a line break only if it's not already present
            display.textContent += "\n";
            // Add the necessary space to maintain distance between lines
            display.textContent += " ".repeat(SPACE_BETWEEN_LINES);
        }
        
        display.textContent += number;     
        
        if (operator === "") {
            a += number;
        } else {
            b += number;
        }
    }
}

// Function to handle backspace button click
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

// Function to clear the display
clear.addEventListener("click", () => {
    display.textContent = "";
    displayTotal.textContent = "0";
    a = "";
    b = "";
    operator = "";
});

// Functions to handle operator button clicks
divide.addEventListener("click", () => handleOperator("/"));
multiply.addEventListener("click", () => handleOperator("*"));
subtract.addEventListener("click", () => handleOperator("-"));
add.addEventListener("click", () => handleOperator("+"));

// Function to handle operator button clicks
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

// Function to handle percent button click
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

// Function to handle dot button click
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

// Function to handle negative button click
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

// Function to handle result button click
result.addEventListener("click", () => {
    calculateResult();
    lastResult = true;
});

// Function to calculate the result
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

    if (total.toString().includes('e')) {
        total = total.toFixed(10); // Limit the number of decimal places to 10
    }
    if (total.toString().length > 9) {
        total = parseFloat(total.toPrecision(8));
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

// Function to format numbers
function formatNumber(num) {
    if (Math.abs(num) >= SCIENTIFIC_NOTATION_THRESHOLD) {
        return parseFloat(num.toExponential()).toPrecision(3); // Modify the value 10 according to your needs
    } else {
        return num.toString();
    }
}

// Event listener for keyboard input
document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        handleNumberClick(key);
    } else if (["+" , "-", "*", "/"].includes(key)) {  
        handleOperator(key);
    } else if (key === "Enter") { 
        event.preventDefault();
        result.click();
    } else if (key === "Backspace") {    
        back.click(); 
    } else if (key === "Delete") {
        clear.click(); 
    } else if (key === "."){
        dot.click();
    } else if (key === "%"){
        percent.click()
    }
    
});

/*

Cant really fix right now:
Decimal operations error(e.g., 0.3 + 3.3 = 3.5999999999999996)
REQUIRES math.js 

Fixed:
Adjusted the handling of dot (.) and percent (%) buttons, which were previously managed by handleOperator instead of their respective buttons.
Implemented a limit of 3 digits for scientific notation, which previously tended to extend beyond the display.
Fixed the input key that reset the operation just entered.
Enhanced the display management; now numbers are handled across multiple lines.
Fix operations with "e" numbers
*/
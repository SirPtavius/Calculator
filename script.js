//global
let a = ""
let b = ""
let operator = ""


// Seleziona l'elemento con ID "display"
let display = document.querySelector("#display");

// Seleziona gli elementi dei pulsanti numerici
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

// Seleziona gli elementi degli operatori e altri pulsanti
let clear = document.getElementById("clear");
let back = document.getElementById("back");
let module = document.getElementById("module");
let divide = document.getElementById("divide");
let multiply = document.getElementById("multiply");
let subtract = document.getElementById("subtract");
let add = document.getElementById("add");
let dot = document.getElementById("dot");
let result = document.getElementById("result");


//Numbers buttons
zero.addEventListener("click", () => {
    display.textContent += zero.textContent;
    if(operator === ""){
        a += "0"
    }
    else{
        b += "0"
    }
});

one.addEventListener("click", () => {
    display.textContent += one.textContent;
    if(operator === ""){
        a += "1"
    }
    else{
        b += "1"
    }
});

two.addEventListener("click", () => {
    display.textContent += two.textContent;
    if(operator === ""){
        a += "2"
    }
    else{
        b += "2"
    }
});

three.addEventListener("click", () => {
    display.textContent += three.textContent;
    if(operator === ""){
        a += "3"
    }
    else{
        b += "3"
    }
});

four.addEventListener("click", () => {
    display.textContent += four.textContent;
    if(operator === ""){
        a += "4"
    }
    else{
        b += "4"
    }
});

five.addEventListener("click", () => {
    display.textContent += five.textContent;
    if(operator === ""){
        a += "5"
    }
    else{
        b += "5"
    }
});

six.addEventListener("click", () => {
    display.textContent += six.textContent;
    if(operator === ""){
        a += "6"
    }
    else{
        b += "6"
    }
});

seven.addEventListener("click", () => {
    display.textContent += seven.textContent;
    if(operator === ""){
        a += "7"
    }
    else{
        b += "7"
    }
});

eight.addEventListener("click", () => {
    display.textContent += eight.textContent;
    if(operator === ""){
        a += "8"
    }
    else{
        b += "8"
    }
});

nine.addEventListener("click", () => {
    display.textContent += nine.textContent;
    if(operator === ""){
        a += "9"
    }
    else{
        b += "9"
    }
});

//clear
back.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
    if(operator === ""){
       a = a.slice(0,-1)

    }
    else{
       b = b.slice(0,-1)
    }
});

clear.addEventListener("click", () => {
    display.textContent = "";
    a = ""
    b= ""
    operator = ""
});

//Operator buttons
module.addEventListener("click", () => {
    display.textContent += "%";
    operator += "%"
});

divide.addEventListener("click", () => {
    display.textContent += "/";
    operator += "/"
});

multiply.addEventListener("click", () => {
    display.textContent += "x";
    operator += "*"
});

subtract.addEventListener("click", () => {
    display.textContent += "-";
    operator += "-"
});

add.addEventListener("click", () => {
    display.textContent += "+";
    operator = "+"
});

dot.addEventListener("click", () => {
    display.textContent += dot.textContent;
    if(operator === ""){
        a += "."
    }
    else{
        b += "."
    }
});

result.addEventListener("click", () => {
    let copyA = parseFloat(a)
    let copyB = parseFloat(b)
    let copyOperator = operator
    let total = 0
    b = ""
    switch(copyOperator){
        case "+":
            total = copyA + copyB
            a = total.toFixed(2)
            operator = ""
            return display.textContent = total;

        case "-":
            total = copyA - copyB
            a = total.toFixed(2)   
            operator = ""        
            return display.textContent = total;

        case "/":
            total = copyA / copyB
            a = total.toFixed(2)   
            operator = ""        
            return display.textContent = total;

        case "*":
            total = copyA * copyB
            a = total.toFixed(2)  
            operator = ""          
            return display.textContent = total;

        case "%":
            total = copyA % copyB
            a = total.toFixed(2)   
            operator = ""         
            return display.textContent = total;
          
    }

});

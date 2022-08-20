const PageState = {
    prelimDisplay : "Enter an operation",
    resultDisplay : "0",
    firstNumber : 0,
    secondNumber : 0,
    operator : undefined
};

const symbolToFunctionMap = {
    "÷" : divide,
    "×" : multiply,
    "+" : add,
    "-" : subtract
};

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    return operator(a, b);
}

function UpdateDisplay() {
    document.querySelector("#prelim-display").innerHTML = PageState.prelimDisplay;
    document.querySelector("#result-display").innerHTML = PageState.resultDisplay;
}

function isFloat(value) {
    return (
      typeof value === 'number' &&
      !Number.isNaN(value) &&
      !Number.isInteger(value)
    );
}

document.querySelectorAll(".button-number").forEach(
    (el) => el.addEventListener("click", function() {
        if(PageState.resultDisplay.length > 13) {
            return 0;
        }
        if(PageState.resultDisplay === "0") {
            PageState.resultDisplay = el.innerHTML;
        }
        else {
            PageState.resultDisplay += el.innerHTML;
        }
        UpdateDisplay();
    })
);

document.querySelectorAll(".button-operator").forEach(
    (el) => el.addEventListener("click", function() {
        if(PageState.operator) {
            document.querySelector("#equals-button").click();
        }
        PageState.firstNumber = +PageState.resultDisplay;
        PageState.prelimDisplay = PageState.resultDisplay + ` ${el.innerHTML} `;
        PageState.resultDisplay = "0";
        PageState.operator = symbolToFunctionMap[el.innerHTML];
        UpdateDisplay();
    })
);

document.querySelector("#equals-button").addEventListener("click", function() {
    if(!PageState.operator) {
        return 1;
    }
    PageState.prelimDisplay += PageState.resultDisplay;
    PageState.secondNumber = +PageState.resultDisplay;
    if(PageState.operator === divide) { 
        if(PageState.secondNumber === 0) {
            document.querySelector("#clear-button").click();
            PageState.prelimDisplay = "Error! You cannot divide by 0";
            UpdateDisplay();
            return 1;
        }
    }
    let result = PageState.operator(PageState.firstNumber, PageState.secondNumber);
    PageState.firstNumber = result;
    if(`${result}`.length > 13 && isFloat(result)) {
        result = result.toFixed(8);
    }
    PageState.resultDisplay = `${result}`;
    PageState.secondNumber = 0;
    PageState.operator = undefined;
    UpdateDisplay();
});

document.querySelector("#clear-button").addEventListener("click", function() {
    PageState.prelimDisplay = "Enter an operation";
    PageState.resultDisplay = "0";
    PageState.firstNumber = 0;
    PageState.secondNumber = 0;
    PageState.operator = undefined;
    UpdateDisplay();
});

document.querySelector("#decimal-button").addEventListener("click", function() {
    if(isFloat(+PageState.resultDisplay)) {
        return 1;
    }
    PageState.resultDisplay += "."
    UpdateDisplay();
});

document.querySelector("#back-button").addEventListener("click", function() {
    if(PageState.resultDisplay.length === 1) {
        PageState.resultDisplay = "0";
    }
    else {
        PageState.resultDisplay = PageState.resultDisplay.substring(
            0,
            PageState.resultDisplay.length - 1
        );
    }
    UpdateDisplay();
});


UpdateDisplay();
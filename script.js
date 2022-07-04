/* jshint esversion: 8 */
(function () {
    "use strict";

    const currentYearElement = document.getElementById("copyright-year");

    // Set current year
    const launchYear = '2022';
    const currentYear = new Date().getFullYear();
    currentYearElement.innerHTML = `${launchYear} - ${currentYear}`;

    // Set each equation operand minimum and maximum values
    const operandMinValue = 0; // The minimum value for an operand
    const operandMaxValue = 25; // The maximum value of an operand in the equation

    /**
     * Gets a random number between a given minimum and maximum values
     * @param {number} min - The minimum value of the random number
     * @param {number} max - The maximum value of the random number
     * @returns {number} - The random number
     * @example getRandomNumber(0, 10) // returns a random number between 0 and 10
     * */
    function getRandomOperand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Set the type of arithmetic operations an equation may contain
    const addition = '+';
    const subtraction = '-';
    const arithmeticOperations = [addition, subtraction];

    /**
     * Gets a random arithmetic operator from a given array of arithmetic operators
     * @param {array} arithmeticOperations - The array of arithmetic operators
     * @returns {string} - The random arithmetic operator
     * @example getRandomArithmeticOperator(['+', '-', '*', '/']) // returns a random arithmetic operator
     * */
    function getRandomArithmeticOperator(arithmeticOperations) {
        return arithmeticOperations[Math.floor(Math.random() * arithmeticOperations.length)];
    }

    /**
     * Gets a random arithmetic equation from a given array of arithmetic operations
     * @param {array} arithmeticOperations - The array of arithmetic operations
     * @returns {object} - A random object containing an equation and a result properties and values
     * @example getRandomArithmeticEquation(['+', '-', '*', '/']) // returns a random arithmetic equation
     * */
    function getRandomArithmeticEquation(arithmeticOperations) {
        const operator = getRandomArithmeticOperator(arithmeticOperations);
        let operand1 = getRandomOperand(operandMinValue, operandMaxValue);
        let operand2 = getRandomOperand(operandMinValue, operandMaxValue);
        let number = 0;

        if (operator === "-" && operand1 < operand2) {
            number = operand2;
            operand2 = operand1;
            operand1 = number;
        }
        if (operator === "/" && operator < operand2) {
            number = operand2;
            operand2 = operand1;
            operand1 = number;
        }

        // Ensure when operator === '/'
        // that the second operand is not 0 and that the first operand is not 0,
        // and that the remainder is not 0
        if (operator === "/") {
            while (operand2 === 0 || operand1 === 0 || operand1 % operand2 !== 0) {
                operand1 = getRandomOperand(operandMinValue, operandMaxValue);
                operand2 = getRandomOperand(operandMinValue, operandMaxValue);
            }
        }

        const equation = `${operand1} ${operator} ${operand2}`;
        const result = eval(equation);
        return {equation, operator, result};
    }

    /**
     * Generates mathematical equation phrases based on a given arithmetic operation
     * @param {string} arithmeticOperation - The arithmetic operation
     * @returns {string} - An string containing a mathematical equation phrase
     * @example generateArithmeticEquationPhrases('+') // returns a string containing a mathematical equation phrase
     * */
    const generateArithmeticEquationPhrase = (arithmeticOperation) => {
        let arithmeticEquationPhrase = "";
        if (arithmeticOperation === "+") {
            arithmeticEquationPhrase = 'sum';
        } else if (arithmeticOperation === "-") {
            arithmeticEquationPhrase = 'difference';
        } else if (arithmeticOperation === "*") {
            arithmeticEquationPhrase = 'product';
        } else if (arithmeticOperation === "/") {
            arithmeticEquationPhrase = 'quotient';
        }
        return arithmeticEquationPhrase;
    }

    /**
     * Takes a number
     * and generates three random numbers that are unique (different) from each other as well as the given number
     * and returns a shuffle array of four elements containing the three generated unique numbers and the given number.
     * @param equationResult - The given number
     * @returns {array} -
     * A shuffle array of four elements containing the three generated numbers and the given number
     * @example getMultipleChoices(10) // returns an array of four elements containing the three generated numbers and the given number
     * */
    const getMultipleChoices = (equationResult) => {
        const multipleChoices = [];
        for (let i = 0; i < 3; i++) {
            let choice = getRandomOperand(operandMinValue, operandMaxValue);
            while (multipleChoices.includes(choice) && choice !== equationResult) {
                choice = getRandomOperand(operandMinValue, operandMaxValue);
            }
            multipleChoices.push(choice);
        }

        multipleChoices.push(equationResult);

        //shuffle the multiple choices with the answer
        for (let i = 0; i < multipleChoices.length; i++) {
            const randomIndex = Math.floor(Math.random() * multipleChoices.length);
            const temp = multipleChoices[i];
            multipleChoices[i] = multipleChoices[randomIndex];
            multipleChoices[randomIndex] = temp;
        }
        return multipleChoices;
    }

    // Assign operands, operators, result, and multiple choices elements to variables
    const equationPhraseElement = document.getElementById("equation-phrase");
    const firstOperandElement = document.getElementById("first-operand-element");
    const operatorElement = document.getElementById("operator-element");
    const secondOperandElement = document.getElementById("second-operand-element");
    const equationResultElement = document.getElementById("equation-result");
    const answerChoiceElements = document.getElementsByClassName("answer-choices");

    /**
     * Displays given values of within the equationPhraseElement, firstOperandElement, operatorElement, secondOperandElement, equalSignElement, equationResultElement, and answerChoiceElements
     * @param {string} equationPhrase - The string to display within the equationPhraseElement
     * @param {string} firstOperandValue - The number to display within the firstOperandElement
     * @param {string} operatorValue - The string to display within the operatorElement
     * @param {string} secondOperandValue - The number to display within the secondOperandElement
     * @param {Array} answerChoicesArray - An array of numbers to display within the answerChoiceElements
     * @example displayEquation('sum', 10, '+', 20, '=', 30, [10, 20, 30, 40])
     *
     * */
    const displayEquation = (
        equationPhrase,
        firstOperandValue,
        operatorValue,
        secondOperandValue,
        answerChoicesArray) => {
        equationPhraseElement.innerHTML = equationPhrase;
        firstOperandElement.innerHTML = firstOperandValue.toString();
        operatorElement.innerHTML = operatorValue;
        secondOperandElement.innerHTML = secondOperandValue.toString();
        answerChoiceElements[0].innerHTML = answerChoicesArray[0];
        answerChoiceElements[1].innerHTML = answerChoicesArray[1];
        answerChoiceElements[2].innerHTML = answerChoicesArray[2];
        answerChoiceElements[3].innerHTML = answerChoicesArray[3];
    }

    /**
     * Receives an event and fill
     * and swap the current value of the equationResultElement with the value of the target element
     * @param {Event} event - The event
     * @example swapAndFillEquationResult(event) // event is an event object
     * */
    const swapAndFillEquationResult = (event) => {
        equationResultElement.innerHTML = event.target.innerHTML;
    }

    /**
     * Receives an array of css properties values and styles the equationResultElement when the element is filled
     * @type {array} cssValues - An array of css properties values
     * @example styleEquationResult(["background-color", "white", "border", "none"])
     */
    const styleEquationResult = () => {
        equationResultElement.style.backgroundColor = '#292929';
        equationResultElement.style.color = '#ffffff';
        equationResultElement.style.border = 'none';
    }

    for (let i = 0; i < answerChoiceElements.length; i++) {
        answerChoiceElements[i].addEventListener("click", (event) => {
            swapAndFillEquationResult(event);
            styleEquationResult();
        });
    }

    // Save the loaded equation, correct, equation phrase,
    // the correct answer, and answer choices to the local storage
    const saveEquationData = (equationDataObject) => {
        localStorage.setItem("equationData", JSON.stringify(equationDataObject));
    }

    // Generate a new equation with answers choices and display it on the page when the next button is clicked
    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", () => {
        const newEquationObject = getRandomArithmeticEquation(arithmeticOperations);
        const newEquation = newEquationObject.equation;
        const newArithmeticOperator = newEquationObject.operator;
        const newEquationPhrase = generateArithmeticEquationPhrase(newArithmeticOperator);
        const newArithmeticResult = newEquationObject.result;
        const newEquationOperandsAndOperators = newEquation.split(" ");
        const newFirstOperand = newEquationOperandsAndOperators[0];
        const newOperator = newEquationOperandsAndOperators[1];
        const newSecondOperand = newEquationOperandsAndOperators[2];
        const newMultipleChoices = getMultipleChoices(newArithmeticResult);
        document.getElementById("equation-result").innerHTML = "?";

        displayEquation(newEquationPhrase, newFirstOperand, newOperator, newSecondOperand, newMultipleChoices);

        // Reset the equationData in local storage
        localStorage.removeItem("equationData");
        const newEquationData = {
            "equationPhrase": newEquationPhrase,
            "firstOperand": newFirstOperand,
            "operator": newOperator,
            "secondOperand": newSecondOperand,
            "equationResult": newArithmeticResult,
            "multipleChoices": newMultipleChoices
        }
        saveEquationData(newEquationData);
        resetAnswerStyle();
    });

    // reload the saved equation when the retry button is clicked
    const retryButton = document.getElementById("retry-button");
    retryButton.addEventListener("click", () => {
        const savedEquationData = localStorage.getItem("equationData");
        const phrase = JSON.parse(savedEquationData).equationPhrase;
        const firstOperand = JSON.parse(savedEquationData).firstOperand;
        const operator = JSON.parse(savedEquationData).operator;
        const secondOperand = JSON.parse(savedEquationData).secondOperand;
        const multipleChoices = JSON.parse(savedEquationData).multipleChoices;
        document.getElementById("equation-result").innerHTML = "?";
        //styleEquationResult();
        resetAnswerStyle();
        displayEquation(phrase, firstOperand, operator, secondOperand, multipleChoices);

    });

    // check the answer when the check button is clicked
    const checkButton = document.getElementById("check-button");
    checkButton.addEventListener("click", () => {
        const answerElement = document.getElementById("equation-result");
        const answer = answerElement.innerHTML;

        const savedEquationData = localStorage.getItem("equationData");
        const savedEquationResult = JSON.parse(savedEquationData).equationResult;

        //const mathEquation = JSON.parse(localStorage.getItem("mathEquation"));
        if (parseInt(answer) === savedEquationResult) {
            styleAnswer(true);
        } else {
            styleAnswer(false);
        }
    });


    // Style the answer element when the check button is clicked
    const answerElement = document.getElementById("equation-result");
    const styleAnswer = (flag) => {
        if (flag) {
            answerElement.style.backgroundColor = "lightgreen";
            answerElement.style.color = "darkgreen";
        } else {
            answerElement.style.backgroundColor = "lightpink";
            answerElement.style.color = "darkred";
        }
    }

    // reset the answer element when the reset button or next button is clicked
    const resetAnswerStyle = () => {
        answerElement.style.backgroundColor = "#2f2f2f";
        answerElement.style.color = "#ffffff99";
        answerElement.style.border = "none";
    }

    // Populate the page with the generated equation on window.onload
    window.onload = () => {
        // Get a random arithmetic equation
        const arithmeticEquationObject = getRandomArithmeticEquation(arithmeticOperations);
        const arithmeticEquation = arithmeticEquationObject.equation;
        const arithmeticOperator = arithmeticEquationObject.operator;
        const arithmeticPhrase = generateArithmeticEquationPhrase(arithmeticOperator);
        const equationResult = arithmeticEquationObject.result;
        const operandsAndOperators = arithmeticEquation.split(" ");
        const firstOperand = operandsAndOperators[0];
        const operator = operandsAndOperators[1];
        const secondOperand = operandsAndOperators[2];
        const multipleChoices = getMultipleChoices(equationResult);


        displayEquation(arithmeticPhrase, firstOperand, operator, secondOperand, multipleChoices);

        const equationData = {
            "equationPhrase": arithmeticPhrase,
            "firstOperand": firstOperand,
            "operator": operator,
            "secondOperand": secondOperand,
            "equationResult": equationResult,
            "multipleChoices": multipleChoices
        }
        saveEquationData(equationData);
    }
}());
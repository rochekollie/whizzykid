import { correctComments, incorrectComments } from "./comments.js";
import { switchTheme, reloadTheme } from "./theme-switcher.js";

(function () {
    "use strict";

    function displayCopyrightYear() {
        const currentYearElement = document.getElementById("copyright-year");
        const launchYear = "2022";
        const currentYear = new Date().getFullYear();

        if (parseInt(launchYear) === currentYear)
        {
            currentYearElement.innerHTML = `${ currentYear }`;
        } else
        {
            currentYearElement.innerHTML = `${ launchYear } - ${ currentYear }`;
        }
    }

    // Set each equation operand minimum and maximum values
    const operandMinValue = 0; // The minimum value for an operand
    const operandMaxValue = 10; // The maximum value of an operand

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
    const multiplication = '*';
    const division = '/';

    //get the user choice of the arithmetic operation based on the checkbox values
    function getUserArithmeticOperatorsChoice() {
        const additionCheckbox = document.getElementById("addition-checkbox");
        const subtractionCheckbox = document.getElementById("subtraction-checkbox");
        const multiplicationCheckbox = document.getElementById("multiplication-checkbox");
        const divisionCheckbox = document.getElementById("division-checkbox");

        let arithmeticOperations = [];

        if (additionCheckbox.checked) {
            arithmeticOperations.push(addition);
        }

        if (subtractionCheckbox.checked) {
            arithmeticOperations.push(subtraction);
        }

        if (multiplicationCheckbox.checked) {
            arithmeticOperations.push(multiplication);
        }

        if (divisionCheckbox.checked) {
            arithmeticOperations.push(division);
        }

        //save the user choice in local storage
        localStorage.setItem("arithmeticOperations", JSON.stringify(arithmeticOperations));

        return arithmeticOperations;
    }

    // set the user choice of arithmetic operators to the array of arithmetic operations on click events
    // function setUserArithmeticOperatorsChoice() {
    //     const additionCheckbox = document.getElementById("addition-checkbox");
    //     const subtractionCheckbox = document.getElementById("subtraction-checkbox");
    //     const multiplicationCheckbox = document.getElementById("multiplication-checkbox");
    //     const divisionCheckbox = document.getElementById("division-checkbox");
    //
    //     additionCheckbox.addEventListener("click", function () {
    //         additionCheckbox.checked = !additionCheckbox.checked;
    //     });
    //
    //     subtractionCheckbox.addEventListener("click", function () {
    //         subtractionCheckbox.checked = !subtractionCheckbox.checked;
    //     });
    //
    //     multiplicationCheckbox.addEventListener("click", function () {
    //         multiplicationCheckbox.checked = !multiplicationCheckbox.checked;
    //     });
    //
    //     divisionCheckbox.addEventListener("click", function () {
    //         divisionCheckbox.checked = !divisionCheckbox.checked;
    //     });
    // }


    //get the user arithmetic operation choice from local storage and set the checkbox values
    function setUserArithmeticOperatorsChoice() {
        const additionCheckbox = document.getElementById("addition-checkbox");
        const subtractionCheckbox = document.getElementById("subtraction-checkbox");
        const multiplicationCheckbox = document.getElementById("multiplication-checkbox");
        const divisionCheckbox = document.getElementById("division-checkbox");

        const arithmeticOperations = JSON.parse(localStorage.getItem("arithmeticOperations"));

        if (arithmeticOperations.includes(addition)) {
            additionCheckbox.checked = true;
        }

        if (arithmeticOperations.includes(subtraction)) {
            subtractionCheckbox.checked = true;
        }

        if (arithmeticOperations.includes(multiplication)) {
            multiplicationCheckbox.checked = true;
        }

        if (arithmeticOperations.includes(division)) {
            divisionCheckbox.checked = true;
        }
    }

    /**
     * Gets a random arithmetic operator from a given array of arithmetic operators
     * @param {array} array - The array of arithmetic operators
     * @returns {string} - The random arithmetic operator
     * @example getRandomArithmeticOperator(['+', '-', '*', '/']) // returns a random arithmetic operator
     * */
    function getRandomArithmeticOperator(array) {
        return array[ Math.floor(Math.random() * array.length) ];
    }

    /**
     * Gets a random arithmetic equation from a given array of arithmetic operations
     * @param {array} array - The array of arithmetic operations
     * @returns {object} - A random object containing an equation and a result properties and values
     * @example getRandomArithmeticEquation(['+', '-', '*', '/']) // returns a random arithmetic equation
     * */
    function getRandomArithmeticEquation(array) {
        const operator = getRandomArithmeticOperator(array);
        let operand1 = getRandomOperand(operandMinValue, operandMaxValue);
        let operand2 = getRandomOperand(operandMinValue, operandMaxValue);
        let number = 0;

        if (operator === "-" && operand1 < operand2)
        {
            number = operand2;
            operand2 = operand1;
            operand1 = number;
        }
        if (operator === "/" && operator < operand2)
        {
            number = operand2;
            operand2 = operand1;
            operand1 = number;
        }

        // Ensure when operator === '/' operands !== 0
        if (operator === "/")
        {
            while (operand2 === 0 || operand1 === 0 || operand1 % operand2 !== 0)
            {
                operand1 = getRandomOperand(operandMinValue, operandMaxValue);
                operand2 = getRandomOperand(operandMinValue, operandMaxValue);
            }
        }

        const equation = `${ operand1 } ${ operator } ${ operand2 }`;

        switch (operator)
        {
            case addition: {
                number = operand1 + operand2;
                break;
            }
            case subtraction: {
                number = operand1 - operand2;
                break;
            }
            case "*": {
                number = operand1 * operand2;
                break;
            }
            case "/": {
                number = operand1 / operand2;
                break;
            }
        }

        return {
            equation: equation,
            operator: operator,
            result: number
        };

        //option 2
        // const result = eval(equation);
        // return {equation, operator, result};
    }

    //}

    /**
     * Generates mathematical equation phrases based on a given arithmetic operation
     * @returns {string} - An string containing a mathematical equation phrase
     * @param operator - The arithmetic operation to use when generating the equation phrases
     * @example getArithmeticWord('+') // returns a string containing a mathematical equation phrase
     * */
    function getArithmeticWord(operator) {
        if (operator === "+")
        {
            return "sum";
        } else if (operator === "-")
        {
            return 'difference';
        } else if (operator === "*")
        {
            return 'product';
        } else if (operator === "/")
        {
            return 'quotient';
        }
    }

    /**
     * Takes a number
     * and generates three random numbers that are unique (different) from each other as well as the given number
     * and returns a shuffle array of four elements containing the three generated unique numbers and the given number.
     * @param equationResult - The given number
     * @returns {array} - array of four elements containing the three
     * generated numbers and the given number
     * @example getMultipleChoices(10) // returns an array of four elements containing the three generated numbers and the given number
     * */
    const getMultipleChoices = (equationResult) => {
        const multipleChoices = [];
        multipleChoices.push(equationResult);
        for (let i = 0; i < 3; i++)
        {
            let choice = getRandomOperand(operandMinValue, (equationResult + operandMaxValue));
            // check if the choice is already in the array
            if (multipleChoices.includes(choice))
            {
                i--; // if it is, try again
            } else
            {
                if (!((choice - 5) < equationResult || (choice + 5) > equationResult))
                {
                    i--; // if it is not, check if it is within 5 of the given number
                } else
                {
                    multipleChoices.push(choice);
                }
            }
        }
        return multipleChoices;
    };

    /**
     * Shuffles a give array and return a new array
     * @param {array} array - The array to be shuffled
     * @returns {array} - A new array containing the shuffled elements of the given array
     * @example shuffleArray([1, 2, 3, 4, 5]) // returns an array of five elements containing the shuffled elements of the given array
     * */
    const shuffleArray = (array) => {

        // Version 1 of the shuffle algorithm
        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex)
        {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[ currentIndex ];
            array[ currentIndex ] = array[ randomIndex ];
            array[ randomIndex ] = temporaryValue;
        }

        // Version 2 of the shuffle algorithm
        // for (let i = 0; i < array.length; i++) {
        //     const randomIndex = Math.floor(Math.random() * array.length);
        //     const temp = array[i];
        //     array[i] = array[randomIndex];
        //     array[randomIndex] = temp;
        // }

        return array;
    };

    // Assign operands, operators, result, and multiple choices elements to variables
    const equationPhraseElement = document.getElementById("equation-phrase");
    const firstOperandElement = document.getElementById("first-operand-element");
    const operatorElement = document.getElementById("operator-element");
    const secondOperandElement = document.getElementById("second-operand-element");
    const equationResultElement = document.getElementById("equation-result");
    const answerChoiceElements = document.getElementsByClassName("answer-choices");

    /**
     * Displays an object property values as an equation string on the page
     * */
    function displayEquation() {
        const equationData = JSON.parse(localStorage.getItem("equationData"));
        equationPhraseElement.innerHTML = equationData.phrase;
        firstOperandElement.innerHTML = equationData.firstOperand;
        operatorElement.innerHTML = equationData.mathOperator;
        secondOperandElement.innerHTML = equationData.secondOperand;
        answerChoiceElements[ 0 ].innerHTML = equationData.multipleChoices[ 0 ];
        answerChoiceElements[ 1 ].innerHTML = equationData.multipleChoices[ 1 ];
        answerChoiceElements[ 2 ].innerHTML = equationData.multipleChoices[ 2 ];
        answerChoiceElements[ 3 ].innerHTML = equationData.multipleChoices[ 3 ];
    }

    function saveEquation(object) {
        const equation = object.equation.split(" ");
        const multipleChoices = shuffleArray(getMultipleChoices(object.result));
        const equationData = {
            phrase: getArithmeticWord(equation[ 1 ]),
            firstOperand: equation[ 0 ],
            mathOperator: equation[ 1 ],
            secondOperand: equation[ 2 ],
            result: object.result,
            multipleChoices: multipleChoices,
            isCorrect: false
        };
        localStorage.setItem("equationData", JSON.stringify(equationData));
    }

    function getRecentEquation() {
        return JSON.parse(localStorage.getItem("equationData"));
    }

    const savePreviousEquations = (equationData) => {
        const previousEquations = localStorage.getItem("previousEquations");
        if (previousEquations)
        {
            previousEquations.push(equationData);
            localStorage.setItem("previousEquations", JSON.stringify(previousEquations));
        } else
        {
            const previousEquations = [];
            previousEquations.push(equationData);
            localStorage.setItem("previousEquations", JSON.stringify(previousEquations));
        }
    }

    const getPreviousEquations = () => JSON.parse(localStorage.getItem("previousEquations"));

    const getPreviousEquationCount = () => {
        const previousEquations = localStorage.getItem("previousEquations");
        if (previousEquations)
        {
            console.log(previousEquations);
            return JSON.parse(previousEquations).length;
        } else
        {
            const previousEquations = [];
            localStorage.setItem("previousEquations", JSON.stringify(previousEquations));
            console.log(previousEquations);
            return localStorage.getItem("previousEquations").length;
        }

    }

    const resetPreviousEquations = () => localStorage.removeItem("previousEquations");

    /**
     * Receives an event and fill
     * and swap the current value of the equationResultElement with the value of the target element
     * @param {Event} event - The event
     * @example swapAndFillEquationResult(event) // event is an event object
     * */
    const swapAndFillEquationResult = (event) => {
        equationResultElement.innerHTML = event.target.innerHTML;
    };

    /**
     * Receives an array of css properties values and styles the equationResultElement when the element is filled
     * @type {array} cssValues - An array of css properties values
     * @example styleEquationResult(["background-color", "white", "border", "none"])
     */
    const styleEquationResult = () => {
        answerElement.classList.remove("correct-answer");
        answerElement.classList.remove("incorrect-answer");
        answerElement.classList.remove("operators");
        answerElement.classList.add("numbers");
    };

    for (let i = 0; i < answerChoiceElements.length; i++)
    {
        answerChoiceElements[ i ].addEventListener("click", (event) => {
            swapAndFillEquationResult(event);
            styleEquationResult();
        });
    }

    const disableButton = (...buttons) => {
        for (const button of buttons)
        {
            const buttonText = button.innerHTML;
            button.disabled = true;
            button.setAttribute("aria-disabled", "true");
            button.classList.add("disabled");
            button.classList.remove("enabled");
            if (buttonText.toUpperCase() === "PREV")
            {
                button.setAttribute("title", "There are no previous questions");
            } else if (buttonText.toUpperCase() === "NEXT")
            {
                button.setAttribute("title", "You must pass the equation at least once before you can proceed to the next question.");
            }
        }
    };

    const enableButton = (...buttons) => {
        for (const button of buttons)
        {
            const buttonText = button.innerHTML;
            button.disabled = false;
            button.setAttribute("aria-disabled", "false");
            button.classList.remove("disabled");
            button.classList.add("enabled");

            if (buttonText.toUpperCase() === "PREV")
            {
                button.setAttribute("title", "Go to the previous question.");
            } else if (buttonText.toUpperCase() === "NEXT")
            {
                button.setAttribute("title", "Go to the next question.");
            }
        }
    };

    // Buttons global variables
    const previousButton = document.getElementById("previous-button");
    const checkButton = document.getElementById("check-button");
    const nextButton = document.getElementById("next-button");
    const answerElement = document.getElementById("equation-result");

    // Style the answer element when the check button is clicked
    const comment = document.getElementById("answer-comment");
    comment.style.display = "none";
    const styleAnswer = (state) => {
        comment.style.display = "block";
        if (state === 0)
        {
            answerElement.classList.remove("correct-answer");
            answerElement.classList.remove("incorrect-answer");
            answerElement.classList.add("numbers");
        } else if (state === 1)
        {
            answerElement.classList.remove("incorrect-answer");
            comment.classList.remove("incorrect-comment");
            answerElement.classList.add("correct-answer");
            comment.classList.add("positive-comment");
            comment.innerHTML = correctComments[ Math.floor(Math.random() * correctComments.length) ];
        } else if (state === 2)
        {
            answerElement.classList.remove("correct-answer");
            comment.classList.remove("positive-comment");
            answerElement.classList.add("incorrect-answer");
            comment.classList.add("incorrect-comment");
            comment.innerHTML = incorrectComments[ Math.floor(Math.random() * incorrectComments.length) ];
        }

        // hide the comment after 1 second and make sure the event is only triggered once
        setTimeout(() => {
            comment.style.display = "none";
        }
            , 2000);
    };

    // reload the saved equation when the previous button is clicked
    // previousButton.addEventListener("click", () => {
    //     const previousEquations = localStorage.getItem("previousEquations");
    //     clearAndResetAnswerElement();
    //     if (previousEquations)
    //     {
    //         const previousEquationsArray = JSON.parse(previousEquations);
    //         for (let i = previousEquationsArray.length - 1; i >= 0; i--)
    //         {
    //             const equationData = previousEquationsArray[ i ];
    //             const isCorrect = JSON.parse(equationData).isCorrect;
    //             if (isCorrect)
    //             {
    //                 const phrase = JSON.parse(equationData).arithmeticPhrase;
    //                 const firstOperand = JSON.parse(equationData).firstOperand;
    //                 const operator = JSON.parse(equationData).operator;
    //                 const secondOperand = JSON.parse(equationData).secondOperand;
    //                 const multipleChoices = JSON.parse(equationData).multipleChoices;
    //                 displayEquation(phrase, firstOperand, operator, secondOperand, multipleChoices);
    //                 break;
    //             }
    //         }
    //     }
    //     resetAnswerStyle();
    // });

    // Generate a new equation with answers choices and display it on the page when the next button is clicked
    // nextButton.addEventListener("click", () => {
    //     saveEquation(getRandomArithmeticEquation(arithmeticOperations));
    //     clearAndResetAnswerElement();
    //     displayEquation();
    //     //savePreviousEquations(getRecentEquation());
    //
    //     const previousEquationsCount = getPreviousEquations().length;
    //     equationNumberElement.innerHTML = `${ previousEquationsCount }. `;
    //     resetAnswerStyle();
    //     if (previousEquationsCount === 0)
    //     {
    //         disableButton(previousButton);
    //     } else
    //     {
    //         enableButton(previousButton);
    //     }
    //
    //     disableButton(nextButton);
    // });

    const triggerNextButton = () => {
        // TESTING
        const addition = '+';
        const subtraction = '-';
        const multiplication = '*';
        const division = '/';
        const arithmeticOperations = [addition, subtraction, multiplication, division];
        saveEquation(getRandomArithmeticEquation(arithmeticOperations));
        clearAndResetAnswerElement();
        displayEquation();
        resetAnswerStyle();
    }

    // check the answer when the check button is clicked
    const checkAnswer = () => {
        checkButton.addEventListener("click", () => {
            const equationData = JSON.parse(localStorage.getItem("equationData"));
            const userAnswer = parseInt(document.getElementById("equation-result").innerHTML);
            const equationResult = equationData.result;
            if (userAnswer === equationResult)
            {
                styleAnswer(1);
                equationData.isCorrect = true;
                // enableButton(nextButton);

                setTimeout(() => {
                    //trigger the next button
                    triggerNextButton();
                }, 2500);

            } else
            {
                styleAnswer(2);
            }
        });
    };

    checkAnswer();


    // reset the answer element when the reset button or next button is clicked
    const resetAnswerStyle = () => {
        answerElement.classList.remove("correct-answer");
        answerElement.classList.remove("incorrect-answer");
        answerElement.classList.add("operators");
    };

    const clearAndResetAnswerElement = () => answerElement.innerHTML = "?";

    const equationNumberElement = document.getElementById("equation-number");




    // Switch the user theme to selected theme
    switchTheme();


    // Populate the page with the generated equation on window.onload
    window.onload = () => {
        // load the user selected theme from the local storage
        reloadTheme();
        displayCopyrightYear();
        //setUserArithmeticOperatorsChoice();

        // TESTING
        const addition = '+';
        const subtraction = '-';
        const multiplication = '*';
        const division = '/';
        const arithmeticOperations = [addition, subtraction, multiplication, division];
        saveEquation(getRandomArithmeticEquation(arithmeticOperations));
        displayEquation();
        //disableButton(previousButton, nextButton);
        //nextButton.style.display = "none";
        //previousButton.style.display = "none";

    };
}());

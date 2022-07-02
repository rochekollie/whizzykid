/* jshint esversion: 8 */
(function () {
    "use strict";

    const min = 0;
    const max = 50;
    const operators = ["+", "-"];

    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomOperator() {
        return operators[Math.floor(Math.random() * operators.length)];
    }

    function getEquation() {
        const operator = getRandomOperator();
        let num1 = getRandomNumber(min, max);
        let num2 = getRandomNumber(min, max);
        let num3 = 0;

        let equationPhrase = "";

        if (operator === "-" && num1 < num2) {
            num3 = num2;
            num2 = num1;
            num1 = num3;
        }

        if (operator === "-") {
            equationPhrase = 'difference';
        } else {
            equationPhrase = 'sum';
        }

        const question = `${num1} ${operator} ${num2}`;
        const answer = eval(question);
        return {question, answer, equationPhrase};
    }

    // Get the generated equation along with answer and phrases
    const equation = getEquation();
    const equationPhrase = equation.equationPhrase;
    const numbersAndOperators = equation.question.split(" ");


    const getMultipleChoices = (mathEquation) => {
        const equationAnswer = mathEquation.answer;
        const multipleChoices = [];
        for (let i = 0; i < 3; i++) {
            let choice = getRandomNumber(min, max);
            while (multipleChoices.includes(choice) && choice !== equationAnswer) {
                choice = getRandomNumber(min, max);
            }
            multipleChoices.push(choice);
        }

        multipleChoices.push(equationAnswer);

        //shuffle the multiple choices with the answer
        for (let i = 0; i < multipleChoices.length; i++) {
            const randomIndex = Math.floor(Math.random() * multipleChoices.length);
            const temp = multipleChoices[i];
            multipleChoices[i] = multipleChoices[randomIndex];
            multipleChoices[randomIndex] = temp;
        }
        return multipleChoices;
    }

    // Get the multiple choices for the equation
    const multipleChoices = getMultipleChoices(equation);

    const displayEquation = (mathEquation, mathPhrase, operandsAndOperators, equationAnswerChoices) => {
        document.getElementById("equation-phrase").innerHTML = mathPhrase;
        document.getElementById("num1").innerHTML = operandsAndOperators[0];
        document.getElementById("operator").innerHTML = operandsAndOperators[1];
        document.getElementById("num2").innerHTML = operandsAndOperators[2];

        document.getElementById("choice-1").innerHTML = equationAnswerChoices[0];
        document.getElementById("choice-2").innerHTML = equationAnswerChoices[1];
        document.getElementById("choice-3").innerHTML = equationAnswerChoices[2];
        document.getElementById("choice-4").innerHTML = equationAnswerChoices[3];

        const answerElement = document.getElementById("answer");
        answerElement.innerHTML = "?";
    }

    const fillAnswer = (event) => {
        const answerElement = document.getElementById("answer");
        answerElement.innerHTML = event.target.innerHTML;
        answerElement.style.color = "white";
        answerElement.style.border = "none";
    }

    // style and fill the answer box when an answer choice is clicked
    const answerChoice = document.getElementsByClassName("choices");
    for (let i = 0; i < answerChoice.length; i++) {
        answerChoice[i].addEventListener("click", (event) => {
            fillAnswer(event);
        });
    }


    // Save the loaded equation, correct, equation phrase, the correct answer, and answer choices to the local storage
    const saveEquation = (mathEquation, mathPhrase, operandsAndOperators, equationAnswerChoices) => {
        localStorage.setItem("mathEquation", JSON.stringify(mathEquation));
        localStorage.setItem("mathPhrase", mathPhrase);
        localStorage.setItem("operandsAndOperators", JSON.stringify(operandsAndOperators));
        localStorage.setItem("equationAnswerChoices", JSON.stringify(equationAnswerChoices));
    }


    // Generate a new equation with answers choices and display it on the page when the next button is clicked
    const nextButton = document.getElementById("next");
    nextButton.addEventListener("click", () => {
        const newEquation = getEquation();
        const newMultipleChoices = getMultipleChoices(newEquation);
        const newEquationPhrase = newEquation.equationPhrase;
        const newNumbersAndOperators = newEquation.question.split(" ");
        displayEquation(newEquation, newEquationPhrase, newNumbersAndOperators, newMultipleChoices);
        saveEquation(newEquation, newEquationPhrase, newNumbersAndOperators, newMultipleChoices);
        resetAnswerStyle();
    });

    // reload the saved equation when the retry button is clicked
    const retryButton = document.getElementById("retry");
    retryButton.addEventListener("click", () => {
        const mathEquation = JSON.parse(localStorage.getItem("mathEquation"));
        const mathPhrase = localStorage.getItem("mathPhrase");
        const operandsAndOperators = JSON.parse(localStorage.getItem("operandsAndOperators"));
        const equationAnswerChoices = JSON.parse(localStorage.getItem("equationAnswerChoices"));
        displayEquation(mathEquation, mathPhrase, operandsAndOperators, equationAnswerChoices);
        resetAnswerStyle();
    });

    // check the answer when the check button is clicked
    const checkButton = document.getElementById("check");
    checkButton.addEventListener("click", () => {
        const answerElement = document.getElementById("answer");
        const answer = answerElement.innerHTML;
        const mathEquation = JSON.parse(localStorage.getItem("mathEquation"));
        if (parseInt(answer) === mathEquation.answer) {
            styleAnswer(true);
        } else {
            styleAnswer(false);
        }
    });


    // Style the answer element when the check button is clicked
    const answerElement = document.getElementById("answer");
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
        displayEquation(equation, equationPhrase, numbersAndOperators, multipleChoices);
        saveEquation(equation, equationPhrase, numbersAndOperators, multipleChoices);
    }
}());
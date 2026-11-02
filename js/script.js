console.log("script.js connected!");

let questions = document.querySelectorAll(".quiz-question");
let buttons = document.querySelectorAll(".answer-btn");
let nextBtn = document.getElementById("next-btn");
let showResultBtn = document.getElementById("show-result");
let output = document.getElementById("output-message");
let resultContainer = document.getElementById("result-container");
let resultText = document.getElementById("result-text");

let currentQuestion = 0;
let scores = [];

// managees the answer button selection, whether the next/show result button is enabled, and the score calculation
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    // Only clear highlights in THIS question
    button.closest(".row").querySelectorAll(".answer-btn").forEach(function(btn) {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");

    // Store this answer's point value for THIS question.
    // Clicking a different answer replaces the old value instead of adding to it.
    scores[currentQuestion] = Number(button.dataset.value);

    // Enable the right button depending on which question we're on
    if (currentQuestion === questions.length - 1) {
      showResultBtn.disabled = false;
    } else {
      nextBtn.disabled = false;
    }
  });
});

// mangages the next button click, hiding the current question and showing the question after it, and disabling the next button until an answer is selected
nextBtn.addEventListener("click", function() {
    questions[currentQuestion].classList.add("d-none");     // hide current question/answers
    currentQuestion++;
    questions[currentQuestion].classList.remove("d-none");  // show next question/answers

    nextBtn.disabled = true; // disables the next button until an answer is selected

    // swaping the Next for Show Results buttons when at the last question
    if (currentQuestion === questions.length - 1) {
        nextBtn.classList.add("d-none");
        showResultBtn.classList.remove("d-none");
    }
});

// manages the show result button click, displaying the final result based on the total score
showResultBtn.addEventListener("click", function() { 
    let scoreTotal = 0;

    scores.forEach(function(value) {
        scoreTotal += value;
    });
    
    // Find the first result that fits the total
    if (scoreTotal <= 20) {
      finalResult = { message: "You are a homebody!" };
    } else if (scoreTotal <= 40) {
      finalResult = { message: "You are an logician!" };
    } else if (scoreTotal <= 60) {
      finalResult = { message: "You are an entrepreneur!" };
    } else if (scoreTotal > 60) { // I didn't make this an else for in case the answer values change in the future
        finalResult = { message: "You are an explorer!" };
    }

    resultText.textContent = finalResult.message + " (Score: " + scoreTotal + ")";
    resultContainer.style.display = "block";
});
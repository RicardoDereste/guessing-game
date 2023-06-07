// Get the HTML elements
const guessSection = document.querySelector("#guess-section");
const guessInput = document.querySelector("#guess");
const guessButton = document.querySelector("#guess-btn");
const resultParagraph = document.querySelector("#result");
const difficultySelect = document.querySelector("#difficulty");
const difficultySection = document.querySelector("#difficulty-section");
const gameSection = document.querySelector("#game-section");
const triesLeftSpan = document.querySelector("#tries-left");
const resetButton = document.querySelector("#reset-btn");

// Set difficulty settings
let maxTries;
let randomNumber;
let triesLeft;

// Set difficulty settings when user chooses an option
difficultySelect.addEventListener("change", function () {
  const difficulty = parseInt(difficultySelect.value);

  switch (difficulty) {
    case 1:
      maxTries = 10;
      break;
    case 2:
      maxTries = 7;
      break;
    case 3:
      maxTries = 5;
      break;
    default:
      maxTries = 10;
      break;
  }

  triesLeft = maxTries;
  triesLeftSpan.textContent = triesLeft;

  randomNumber = Math.floor(Math.random() * 100) + 1;

  // Hides the difficulty selection and displays the guess input field
  difficultySection.style.display = "none";
  gameSection.style.display = "block";
  guessSection.style.display = "flex";
});

// Adds click event to "Submit" button
guessButton.addEventListener("click", function () {
  // Gets the value of the text field
  const guess = parseInt(guessInput.value);

  // Checks if the value is a valid number
  if (isNaN(guess) || guess < 1 || guess > 100) {
    resultParagraph.textContent = "Please enter a number between 1 and 100.";
  } else {
    // Compare user guess with random number
    if (guess === randomNumber) {
      resultParagraph.textContent = `Congratulations! you got it right in ${
        maxTries - triesLeft + 1
      } attempt(s).`;
      resetButton.style.display = "block";
      guessSection.style.display = "none";
    } else if (guess > randomNumber) {
      resultParagraph.textContent = "Very high. Try again.";
      triesLeft--;
    } else {
      resultParagraph.textContent = "Very low. Try again.";
      triesLeft--;
    }

    triesLeftSpan.textContent = triesLeft;

    // Checks if the user has exceeded the maximum number of attempts
    if (triesLeft === 0) {
      resultParagraph.textContent =
        "Your attempts are over. The correct number was " + randomNumber + ".";
      resetButton.style.display = "block";
      guessSection.style.display = "none";
    }
  }

  // Clear text field
  guessInput.value = "";
});

function resetGame() {
  difficultySelect.value = "";
  resultParagraph.textContent = "";

  difficultySection.style.display = "flex";
  gameSection.style.display = "none";
  guessSection.style.display = "none";
  resetButton.style.display = "none";
}

resetButton.addEventListener("click", resetGame);

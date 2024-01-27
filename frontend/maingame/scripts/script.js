const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const currentScoreDisplay = document.querySelector(".current-score");

let currentWord, correctLetters, wrongGuessCount, currentScore = 0;
const maxGuesses = 6;
const correctGuessPoints = 10;
const incorrectGuessPenalty = 5;

// Function to reset the game state
const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "Assets/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    currentScoreDisplay.innerText = currentScore;
    // Initialize the word display with empty list items for each letter
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    // Enable all letter buttons in the keyboard
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    // Hide the game over modal
    gameModal.classList.remove("show");
}

// Function to get a random word and initialize a new game
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    // Set the hint text on the display
    document.querySelector(".hint-text b").innerText = hint;
    // Reset the game state
    resetGame();
}

// Function to update the score
const updateScore = () => {
    currentScore += correctGuessPoints;
    currentScoreDisplay.innerText = currentScore;
}

// Function to handle the game over scenario
const gameOver = (isVictory) => {
    // Determine the modal text and update modal elements accordingly
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `./Assets/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    // Display the game over modal
    gameModal.classList.add("show");

    // Update score based on game outcome
    if (isVictory) {
        updateScore();
    } else if (wrongGuessCount > maxGuesses) {
        currentScore = Math.max(0, currentScore - incorrectGuessPenalty);
        currentScoreDisplay.innerText = currentScore;
    }
}

// Function to handle the game logic when a letter button is clicked
const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        // Update correct letters and display them in the word display
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // Incorrect guess: increment wrong guess count, update hangman image
        wrongGuessCount++;
        hangmanImage.src = `./Assets/hangman-${wrongGuessCount}.svg`;

        // Deduct 5 points from the user's score for a wrong answer
        currentScore = Math.max(0, currentScore - 5);
        currentScoreDisplay.innerText = currentScore;
    }
    // Disable the clicked button, update guesses display
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    // Check for game end conditions
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
}

// Loop to create letter buttons and add event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Initial setup: get a random word to start the game
getRandomWord();

// Event listener for the Play Again button to start a new game
playAgainBtn.addEventListener("click", getRandomWord);

// Select the clear input button
const clearInputBtn = document.querySelector(".clear-input");

// Function to clear user input
const clearInput = () => {
    // Clear the content of the word display
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    
    // Enable all letter buttons in the keyboard
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    
    // Reset the game state
    resetGame();
}

// Event listener for the Clear Input button
clearInputBtn.addEventListener("click", clearInput);


const hintButton = document.querySelector(".get-hint");
let hintUsed = false;

hintButton.addEventListener("click", () => {
    // Check if hint has not been used
    if (!hintUsed) {
        // Set the first unguessed letter as the hint
        const unguessedLetters = currentWord.split("").filter(letter => !correctLetters.includes(letter));
        const firstUnguessedLetter = unguessedLetters[0];

        // Update the hint text on the display
        document.querySelector(".hint-text b").innerText = `Includes the letter '${firstUnguessedLetter}'`;

        // Disable the hint button after use
        hintButton.disabled = true;

        // Update the hintUsed variable to prevent further use
        hintUsed = true;
    }
});

// Function to handle the game logic when a letter button is clicked or a key is pressed
const handleInput = (input) => {
    // Check if the input is a single letter
    if (/^[a-z]$/.test(input)) {
        const buttons = document.querySelectorAll('.keyboard button');

        // Find the button with the corresponding letter
        const button = Array.from(buttons).find(btn => btn.innerText.toLowerCase() === input);

        // Check if the button exists and is not disabled
        if (button && !button.disabled) {
            initGame(button, input);
        }
    }
};

// Event listener for virtual keyboard button clicks
document.querySelector('.keyboard').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const clickedLetter = e.target.innerText;
        handleInput(clickedLetter);
    }
});

// Event listener for keydown event to handle physical keyboard input
document.addEventListener('keydown', (e) => {
    // Get the pressed key
    const key = e.key.toLowerCase();

    // Handle the key press
    handleInput(key);
});
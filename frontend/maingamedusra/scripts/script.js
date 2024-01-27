const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");

const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");
const currentScoreDisplay = document.querySelector(".current-score");

let currentWord, correctLetters, wrongGuessCount, currentScore = 0;
const maxGuesses = 6;
const correctGuessPoints = 10;
const incorrectGuessPenalty = 5;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "Assets/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    currentScoreDisplay.innerText = currentScore;

    wordDisplay.innerHTML = "";
};


// Function to update the word display in the input field
// Inside the updateWordDisplay function
const updateWordDisplay = () => {
    const letters = currentWord.toLowerCase().split('');
    const wordDisplayList = document.querySelector('.word-display ul');

    wordDisplayList.innerHTML = '';

    letters.forEach((letter, index) => {
        const li = document.createElement('li');
        const textbox = document.createElement('span');
        textbox.classList.add('textbox');

        if (correctLetters.includes(letter)) {
            textbox.textContent = letter;
            li.classList.add('guessed');
        }

        li.appendChild(textbox);
        wordDisplayList.appendChild(li);
    });
};






const updateHangmanImage = () => {
    hangmanImage.src = `./Assets/hangman-${wrongGuessCount}.svg`;
};

const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const updateScore = () => {
    currentScore += correctGuessPoints;
    currentScoreDisplay.innerText = currentScore;
};

const gameOver = (isVictory) => {
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `./Assets/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");

    if (isVictory) {
        updateScore();
    } else if (wrongGuessCount > maxGuesses) {
        currentScore = Math.max(0, currentScore - incorrectGuessPenalty);
        currentScoreDisplay.innerText = currentScore;
    }
};

// Function to handle the game logic when a letter button is clicked
const initGame = (guessedLetter) => {
    const isCorrectGuess = currentWord.toLowerCase().includes(guessedLetter);

    if (isCorrectGuess) {
        // Handle correct guess
        correctLetters.push(guessedLetter);
        updateWordDisplay();
        if (correctLetters.length === currentWord.length) {
            // Victory condition
            updateScore();
            gameOver(true);
        }
    } else {
        // Handle incorrect guess
        wrongGuessCount++;
        updateHangmanImage();
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

        if (wrongGuessCount === maxGuesses) {
            // Game over condition
            gameOver(false);
        }
    }

    // Disable the clicked button, update guesses display
    const clickedButton = document.querySelector(`.key:contains('${guessedLetter}')`);
    if (clickedButton) {
        clickedButton.disabled = true;
    }

    // Clear the input field
    guessInput.value = '';
};





    

document.addEventListener('keydown', (event) => {
    const pressedKey = event.key.toLowerCase();
    const isAlphabet = /^[a-z]$/.test(pressedKey);

    if (isAlphabet) {
        initGame(pressedKey);
    }
});

document.querySelectorAll('.key').forEach((button) => {
    button.addEventListener('click', () => {
        const clickedLetter = button.textContent;
        initGame(clickedLetter);
    });
});

const clearInputBtn = document.querySelector(".clear-input");
clearInputBtn.addEventListener("click", () => {
    wordDisplay.innerHTML = "";
    currentWord.split("").forEach(() => {
        const li = document.createElement("li");
        li.classList.add("letter");
        wordDisplay.appendChild(li);
    });

    keyboardElement.querySelectorAll("button").forEach(btn => btn.disabled = false);

    resetGame();
});

const hintButton = document.querySelector(".get-hint");
let hintUsed = false;

hintButton.addEventListener("click", () => {
    if (!hintUsed) {
        const unguessedLetters = currentWord.split("").filter(letter => !correctLetters.includes(letter));
        const firstUnguessedLetter = unguessedLetters[0];

        document.querySelector(".hint-text b").innerText = `Includes the letter '${firstUnguessedLetter}'`;

        hintButton.disabled = true;
        hintUsed = true;
    }
});

getRandomWord();

playAgainBtn.addEventListener("click", getRandomWord);

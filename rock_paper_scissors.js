
const MOVE_ERROR_STR = "Player or Computer move selection was not within the parameters of the game.";
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const MOVE_TYPE = {
    "Rock": ROCK,
    "Paper": PAPER,
    "Scissors": SCISSORS
};
const COMPUTER_SIMULATION_TIME = 5000;
const LOSS_OUTCOMES = [2, -1];
const WIN_OUTCOMES = [1, -2];
const TIE_OUTCOME = 0;
const N_GESTURES = Object.keys(MOVE_TYPE).length;
const MAX_ROUNDS = 3;
document.querySelector('.title-best-of-num').textContent = `Battle of the Hands - Best of ${MAX_ROUNDS}`;
let gameOver = false;
let timeUp = false;

const computerButtons = document.querySelectorAll('.computer-selection>button');
const buttons = document.querySelectorAll('.player-selection>button');
buttons.forEach(button => button.addEventListener('click', function (e) {
    if (!gameOver) {
        const PLAYER_GESTURE = e.target.className;
        const COMPUTER_GESTURE = computerPlay()
        console.log(playRound(PLAYER_GESTURE, COMPUTER_GESTURE));
        if (playerScore == Math.ceil(MAX_ROUNDS / 2)) {
            gameOver = true;
            roundNumberEl.textContent = `Round ${roundNumber - 1}, you won!`
        } else if (computerScore == Math.ceil(MAX_ROUNDS / 2)) {
            gameOver = true;
            roundNumberEl.textContent = `Round ${roundNumber - 1}, you lost!`
        }
    } else {
        alert("Game Over");
    }

}));
buttons.forEach(button => button.addEventListener('mouseover', function () {
    this.style.border = "4px solid red";
}));
buttons.forEach(button => button.addEventListener('mouseout', function () {
    this.style.border = "4px solid transparent";
}));

let playerScore = 0;
let computerScore = 0;
let roundNumber = 0;
let lastButton;
const playerScoreEl = document.querySelector('.player-score');
const computerScoreEl = document.querySelector('.computer-score');
const roundNumberEl = document.querySelector('.round-number');

function computerPlay() {
    let comp_selection = "";
    const RAND_GESTURE = Math.floor((Math.random() * N_GESTURES)) + 1;
    switch (RAND_GESTURE) {
        case ROCK:
            comp_selection = "Rock";
            break;
        case PAPER:
            comp_selection = "Paper";
            break;
        case SCISSORS:
            comp_selection = "Scissors";
            break;
    }
    return comp_selection;
}

function case_insensitive(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function simulateComputerSelection() {
    timeUp = false;
    const TIME = 500;
    const COMPUTER_BUTTON = randomComputerButton(computerButtons);
    COMPUTER_BUTTON.classList.add('animated');
    setTimeout(() => {
        COMPUTER_BUTTON.classList.remove('animated');
        if (!timeUp) simulateComputerSelection();
    }, TIME);
}

function randomComputerButton(computerButtons) {
    const i = Math.floor(Math.random() * computerButtons.length);
    const computerButton = computerButtons[i];
    if (computerButton === lastButton) {
        return randomComputerButton(computerButtons);
    }
    lastButton = computerButton;
    return computerButton;
}

function animateActualComputerSelection(selectedButtonClass) {
    const selectedComputerButtonEl = document.querySelector(`.computer-selection>.${selectedButtonClass
        }`);
    setTimeout(() => {
        selectedComputerButtonEl.classList.add('animated');
    }, COMPUTER_SIMULATION_TIME + 500);
    setTimeout(() => {
        selectedComputerButtonEl.classList.remove('animated');
    }, COMPUTER_SIMULATION_TIME + 3000);
}

function animatePlayerSelection(selectedButtonClass) {
    const selectedButtonEl = document.querySelector(`.player-selection>.${selectedButtonClass
        }`);
    console.log(selectedButtonEl);
    setTimeout(() => {
        selectedButtonEl.style.border = "4px solid red;";
    }, COMPUTER_SIMULATION_TIME + 500);
    setTimeout(() => {
        selectedButtonEl.style.border = "4px solid transparent;";
    }, COMPUTER_SIMULATION_TIME + 3000);
}

function playRound(playerSelection, computerSelection) {
    const PLAYER_SELECTION = case_insensitive(playerSelection);
    const COMPUTER_SELECTION = case_insensitive(computerSelection);
    simulateComputerSelection();
    setTimeout(() => timeUp = true, COMPUTER_SIMULATION_TIME);
    animateActualComputerSelection(COMPUTER_SELECTION);
    animatePlayerSelection(PLAYER_SELECTION);
    const RESULT = MOVE_TYPE[PLAYER_SELECTION] - MOVE_TYPE[COMPUTER_SELECTION];
    roundNumber++;
    roundNumberEl.textContent = `Round ${roundNumber}`;
    if (LOSS_OUTCOMES.includes(RESULT)) {
        computerScore++;
        computerScoreEl.textContent = `Score: ${computerScore}`;
        return "You Lose this round! " + COMPUTER_SELECTION + " beats " + PLAYER_SELECTION;
    }
    else if (WIN_OUTCOMES.includes(RESULT)) {
        playerScore++;
        playerScoreEl.textContent = `Score: ${playerScore}`;
        return "You Win this round! " + PLAYER_SELECTION + " beats " + COMPUTER_SELECTION;
    }
    else if (RESULT === TIE_OUTCOME) {
        return "You Tie this round!";
    }
    else {
        throw Error(MOVE_ERROR_STR)
    }
}
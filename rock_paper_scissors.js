
const MOVE_ERROR_STR = "Player or Computer move selection was not within the parameters of the game.";
const ROCK = 1;
const PAPER = 2;
const SCISSORS = 3;
const MOVE_TYPE = {
    "Rock": ROCK,
    "Paper": PAPER,
    "Scissors": SCISSORS
};
const COMPUTER_SIMULATION_TIME = 3000;
const LOSS_OUTCOMES = [2, -1];
const WIN_OUTCOMES = [1, -2];
const TIE_OUTCOME = 0;
const N_GESTURES = Object.keys(MOVE_TYPE).length;
const MAX_ROUNDS = 3;
document.querySelector('.title-best-of-num').textContent = `Rock Paper Scissors - Best of ${MAX_ROUNDS}`;
let gameOver = false;
let roundInPlay = false;
let timeUp = false;

const computerButtons = document.querySelectorAll('.computer-selection>button');
const buttons = document.querySelectorAll('.player-selection>button');
buttons.forEach(button => button.addEventListener('click', function (e) {
    if (!gameOver || !roundInPlay) {
        const PLAYER_GESTURE = e.target.className;
        const COMPUTER_GESTURE = computerPlay()
        playRound(PLAYER_GESTURE, COMPUTER_GESTURE);
        if (playerScore == Math.ceil(MAX_ROUNDS / 2)) {
            gameOver = true;
            setTimeout(() => roundNumberEl.textContent = `You won!`, COMPUTER_SIMULATION_TIME)
        } else if (computerScore == Math.ceil(MAX_ROUNDS / 2)) {
            gameOver = true;
            setTimeout(() => roundNumberEl.textContent = `You lost!`, COMPUTER_SIMULATION_TIME)
        }
    } else {
        alert("Game Over");
    }

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

function glowFinalSelections(pcButtonClass, playerButtonClass) {
    const pcButtonEl =
        document.querySelector(`.computer-selection>.${pcButtonClass}`);
    console.log(`.player-selection>.${playerButtonClass}`);
    const playerButtonEl =
        document.querySelector(`.player-selection>.${playerButtonClass}`);
    setTimeout(() => {
        pcButtonEl.classList.add('animated');
        playerButtonEl.classList.add('animated');
    }, COMPUTER_SIMULATION_TIME + 500);
    setTimeout(() => {
        pcButtonEl.classList.remove('animated');
        playerButtonEl.classList.remove('animated');
    }, COMPUTER_SIMULATION_TIME + 3000);
}

function animateWinnerLoser(winnerButtonClass, loserButtonClass, winnerName, loserName) {
    const winnerImgEl =
        document.querySelector(`.${winnerName}-selection>.${winnerButtonClass}`);
    const loserImgEl =
        document.querySelector(`.${loserName}-selection>.${loserButtonClass}`);
    const tempBackgroundImage = loserImgEl.style.backgroundImage;
    setTimeout(() => {
        loserImgEl.style.backgroundImage = "none";
        winnerImgEl.style.backgroundImage = "none";
        winnerImgEl.style.backgroundColor = "#a8ff72";
        loserImgEl.style.backgroundColor = "#ff8686b3";
    }, COMPUTER_SIMULATION_TIME + 600);
    setTimeout(() => {
        loserImgEl.style.backgroundImage = tempBackgroundImage;
        winnerImgEl.style.backgroundImage = tempBackgroundImage;
    }, COMPUTER_SIMULATION_TIME + 3600);
}

function playRound(playerSelection, computerSelection) {
    if (gameOver || roundInPlay) return;
    roundInPlay = true;
    const playerButtonEl = document.querySelector(`.player-selection>.${playerSelection}`);
    playerButtonEl.classList.add('animated');
    simulateComputerSelection();
    setTimeout(() => timeUp = true, COMPUTER_SIMULATION_TIME);
    glowFinalSelections(computerSelection, playerSelection);
    const RESULT = MOVE_TYPE[playerSelection] - MOVE_TYPE[computerSelection];
    roundNumber++;
    if (LOSS_OUTCOMES.includes(RESULT)) {
        animateWinnerLoser(computerSelection, playerSelection, "computer", "player");
        computerScore++;
        setTimeout(() => computerScoreEl.textContent = `Score: ${computerScore}`, COMPUTER_SIMULATION_TIME)
    }
    else if (WIN_OUTCOMES.includes(RESULT)) {
        animateWinnerLoser(playerSelection, computerSelection, "player", "computer");
        playerScore++;
        setTimeout(() => playerScoreEl.textContent = `Score: ${playerScore}`, COMPUTER_SIMULATION_TIME)
    }
    else if (RESULT !== TIE_OUTCOME) {
        throw Error(MOVE_ERROR_STR)
    }
    setTimeout(() => {
        roundInPlay = false;
    }, COMPUTER_SIMULATION_TIME + 3600);
}
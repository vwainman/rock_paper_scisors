
const ROCK = 1
const PAPER = 2
const SCISSOR = 3
const N_GESTURES = 3
const GESTURE_VAL = {
    "Rock": ROCK,
    "Paper": PAPER,
    "Scissor": SCISSOR
}
const N_ROUNDS = 5

function computerPlay() {
    let comp_selection = ""
    let rand_n = Math.floor((Math.random() * N_GESTURES)) + 1
    switch (rand_n) {
        case ROCK:
            comp_selection = "Rock"
            break
        case PAPER:
            comp_selection = "Paper"
            break
        case SCISSOR:
            comp_selection = "Scissors"
            break
    }
    return comp_selection
}

function case_insensitive(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function playRound(playerSelection, computerselection) {
    const sanitizedPlayerSel = case_insensitive(playerSelection)
    const sanitizedCompSel = case_insensitive(computerselection)
    const losses = [2, -1, -2]
    const win = 1
    const tie = 0
    const result = GESTURE_VAL[sanitizedPlayerSel] - GESTURE_VAL[sanitizedCompSel]
    if (losses.includes(result)) {
        return "You Lose! " + sanitizedCompSel + " beats " + sanitizedPlayerSel
    }
    else if (result === win) {
        return "You Win! " + sanitizedPlayerSel + " beats " + sanitizedCompSel
    }
    else if (result === tie) {
        return "You Tie!"
    }
}

function game() {
    for (let i = 0; i < N_ROUNDS; i++) {
        let playerSelection = prompt("Rock, Paper, or Scissor?")
        let computerSelection = computerPlay()
        console.log(playRound(playerSelection, computerSelection))
    }
}

game()
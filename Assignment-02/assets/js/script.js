document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('play').style.opacity = '0';
    document.getElementById('trophy').style.opacity = '0';
    document.getElementById('play').style.zIndex = '1';
    document.getElementById('trophy').style.zIndex = '2';
    document.getElementById('intro').style.zIndex = '3';
});

// Get Names, Assign to Players & Hide Intro / Show Play
function getPlayers() {
    const getName = (elementId) => document.getElementById(elementId).value;

    const player1 = getName("player1");
    const player2 = getName("player2");

    document.getElementById('intro').style.display = 'none';
    document.getElementById('play').style.opacity = '100';
    document.getElementById('trophy').style.zIndex = '1';
    document.getElementById('play').style.zIndex = '2';

    let player1Name = document.getElementById("player1Name");
    player1Name.innerHTML = player1;
    let player2Name = document.getElementById("player2Name");
    player2Name.innerHTML = player2;
}

// Roll Dice & Update Player Counts
function roll() {
    const playerName = (playerNumber) => document.getElementById(`player${playerNumber}Name`).textContent;
    const selectDice = (diceNumber) => document.querySelector(`.img-${diceNumber}`);
    const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;

    const player1 = playerName(1);
    const player2 = playerName(2);

    let diceRoll1 = selectDice(1);
    let diceRoll2 = selectDice(2);

    diceRoll1.setAttribute("src", "assets/img/dice.gif");
    diceRoll2.setAttribute("src", "assets/img/dice.gif")

    let status = document.querySelector('#status');
    status.innerHTML = "Rolling...";

    let rollButton = document.getElementById("roll");
    rollButton.innerHTML = "Roll Again";

    setTimeout(() => {
        let randomNum1 = getRandomNumber();
        let randomNum2 = getRandomNumber();

        diceRoll1.setAttribute('src', 'assets/img/dice-' + randomNum1 + '.png');
        diceRoll2.setAttribute('src', 'assets/img/dice-' + randomNum2 + '.png');

        if (randomNum1 === randomNum2) {
            status.innerHTML = "Draw!"
        } else if (randomNum1 < randomNum2) {
            status.innerHTML = (player2 + " Won!");
            updatePlayerCounts(player2Name);
        } else {
            status.innerHTML = (player1 + " Won!");
            updatePlayerCounts(player1Name);
        }
    }, 2000);
}

let player1Counts = 0;
let player2Counts = 0;

// Update Player Counts According to Winner & End Game After 5 Rolls
function updatePlayerCounts(winner) {
    const selectPlayer = (playerNum) => document.getElementById(`player${playerNum}Counts`);

    if (player1Counts < 5 && player2Counts < 5) {
        if (winner === player1Name) {
            let player1Count = selectPlayer(1);
            player1Counts++;
            player1Count.textContent = player1Counts + " Rolls";
        } else {
            let player2Count = selectPlayer(2);
            player2Counts++;
            player2Count.textContent = player2Counts + " Rolls";
        }

        if (player1Counts === 5 || player2Counts === 5) {
            endGame(winner);
        }
    }
}

// End Game & Show Trophy
function endGame(winner) {
    hideDice();
    showTrophy(winner);
}

function hideDice() {
    document.getElementById('play').style.opacity = '0';
    document.getElementById('play').style.zIndex = '1';
    document.getElementById('trophy').style.zIndex = '2';
}

function showTrophy(winner) {
    document.getElementById('trophy').style.opacity = '100';
    document.getElementById('winner').textContent = winner.textContent;
}

// Reset Game Except Player Names & Reset Rolls
function reset() {
    player1Counts = 0;
    player2Counts = 0;

    resetRolls(1);
    resetRolls(2);

    document.getElementById('trophy').style.opacity = '0';
    document.getElementById('play').style.opacity = '100';
    document.getElementById('trophy').style.zIndex = '1';
    document.getElementById('play').style.zIndex = '2';
}

function resetRolls(playerNumber) {
    const playerCounts = document.getElementById(`player${playerNumber}Counts`);
    playerCounts.textContent = `0 Rolls`;
}

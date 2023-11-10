document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('play').style.opacity = '0';
    document.getElementById('intro').style.zIndex = '2';
});

// Get Names, Assign to Players & Hide Intro / Show Play
function getNames() {
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;

    var intro = document.querySelector('.intro');
    intro.style.display = 'none';
    document.getElementById('play').style.opacity = '100';

    let player1Name = document.getElementById("player1Name");
    player1Name.innerHTML = player1;
    let player2Name = document.getElementById("player2Name");
    player2Name.innerHTML = player2;
}

// Roll Dice & Update Player Counts
function roll() {
    var player1 = document.getElementById("player1Name").textContent;
    var player2 = document.getElementById("player2Name").textContent;

    let diceRoll1 = document.querySelector(".img-1");
    let diceRoll2 = document.querySelector(".img-2");

    diceRoll1.setAttribute("src", "assets/img/dice.gif");
    diceRoll2.setAttribute("src", "assets/img/dice.gif")

    let result = document.querySelector('#status')
    result.innerHTML = "Rolling...";

    let rollButton = document.getElementById("roll");
    rollButton.innerHTML = "Roll Again";

    setTimeout(() => {
        let randomNum1 = Math.floor(Math.random() * 6) + 1;
        let randomNum2 = Math.floor(Math.random() * 6) + 1;

        diceRoll1.setAttribute('src', 'assets/img/dice-' + randomNum1 + '.png');
        diceRoll2.setAttribute('src', 'assets/img/dice-' + randomNum2 + '.png');

        if (randomNum1 === randomNum2) {
            result.innerHTML = "Draw!"
        }
        else if (randomNum1 < randomNum2) {
            result.innerHTML = (player2 + " Won!");
            updatePlayerCounts(player2Name);
        }
        else {
            result.innerHTML = (player1 + " Won!");
            updatePlayerCounts(player1Name);
        }

    }, 2000);
}

let player1Counts = 0;
let player2Counts = 0;

// Update Player Counts According to Winner
function updatePlayerCounts(winner) {
    if (winner === player1Name) {
        let player1Count = document.getElementById("player1Counts");
        player1Counts++;
        player1Count.textContent = player1Counts + " Rolls";
    } else {
        let player2Count = document.getElementById("player2Counts");
        player2Counts++;
        player2Count.textContent = player2Counts + " Rolls";
    }
}
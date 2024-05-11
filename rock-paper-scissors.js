let randomNumber;

let result = '';

//   Function

const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

document.querySelector('.js-reset-score-button').addEventListener('click', () => {
    reset();
    updateScoreElement();
    localStorage.removeItem('score');
});

document.querySelector('.js-auto-play-button').addEventListener('click',() => {
    autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {

    if (!isAutoPlaying) {
        intervalId = setInterval( () => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
        document.querySelector('.js-auto-play-button').innerText = 'Stop Auto Play';
    }
    else {
        document.querySelector('.js-auto-play-button').innerText = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
}

    document.querySelector('.js-rock-button').addEventListener('click', () => {
        playGame('Rock');
    });

    document.querySelector('.js-paper-button').addEventListener('click', () => {
        playGame('Paper');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', () => {
        playGame('Scissors');
    });

    document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r'){
            playGame('Rock');
        } else if (event.key === 'p') {
            playGame('Paper');
        } else if (event.key === 's') {
            playGame('Scissors');
        }
    });

function playGame(playerMove) {

    const computerMove = pickComputerMove();


    if (playerMove === 'Rock') {

        if (computerMove === 'Rock') {
            result = 'Tie.';
        } else if (computerMove === 'Paper') {
            result = 'You lose.';
        } else if (computerMove === 'Scissors') {
            result = 'You win.';
        }



    } else if (playerMove === 'Paper') {

        if (computerMove === 'Rock') {
            result = 'You win.';
        } else if (computerMove === 'Paper') {
            result = 'Tie.';
        } else if (computerMove === 'Scissors') {
            result = 'You lose.';
        }



    } else if (playerMove === 'Scissors') {

        if (computerMove === 'Rock') {
            result = 'You lose.';
        } else if (computerMove === 'Paper') {
            result = 'You win.';
        } else if (computerMove === 'Scissors') {
            result = 'Tie.';
        }

    }

    scoreCount();

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML
        = `You
        <img src="images/${playerMove}-emoji.png" class="move-icon"> 
        <img src="images/${computerMove}-emoji.png" class="move-icon"> 
        Computer`;
}

function pickComputerMove() {
    randomNumber = Math.random()
    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }

    return computerMove;

}

function scoreCount() {
    if (result === 'Tie.') {
        score.ties++;
    } else if (result === 'You lose.') {
        score.losses++;
    } else if (result === 'You win.') {
        score.wins++;
    }
}

function reset() {
    score.losses = 0;
    score.wins = 0;
    score.ties = 0;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
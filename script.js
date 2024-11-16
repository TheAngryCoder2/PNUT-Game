let currentReaperTile;
let currentPeanutTile;
let score = 0;
let gameOver = false;
let reaperInterval;
let peanutInterval;

window.onload = () => {
    setGame();
};

function setGame() {
    // Set up the grid for the game in HTML
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    reaperInterval = setInterval(setReaper, 1000);
    peanutInterval = setInterval(setPeanut, 2000);
}

function getRandomTile() {
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setReaper() {
    

    if (gameOver) {
        return;
    }

    if (currentReaperTile) {
        currentReaperTile.innerHTML = "";
        
    }

    let num;
    do {
        num = getRandomTile();
    } while (currentPeanutTile && currentPeanutTile.id === num);

    let reaper = document.createElement("img");
    reaper.src = "./Grim_Reaper_PNG_Vector_Clipart.webp";

    currentReaperTile = document.getElementById(num);
    currentReaperTile.appendChild(reaper);
}

function setPeanut() {
    if (gameOver) {
        return;
    }

    if (currentPeanutTile) {
        currentPeanutTile.innerHTML = "";
    }

    let num;
    do {
        num = getRandomTile();
    } while (currentReaperTile && currentReaperTile.id === num);

    let peanut = document.createElement("img");
    peanut.src = "./SAVE PEANUT TRUMP VANCE MAKE AME.webp";

    currentPeanutTile = document.getElementById(num);
    currentPeanutTile.appendChild(peanut);
}
// Preload audio
const collectSound = new Audio('./mixkit-winning-a-coin-video-game-2069.wav');
const gameOverSound = new Audio('./mixkit-player-losing-or-failing-2042.wav');

function selectTile() {
    if (gameOver) {
        return;
    }

    if (this === currentPeanutTile) {
        score += 10;
        
        collectSound.play();
        document.getElementById("score").innerText = score.toString();
        // Remove the Peanut from the tile
        currentPeanutTile.innerHTML = "";
        currentPeanutTile = null;

        // Add animation class
        currentPeanutTile.firstChild.classList.add('collect-animation');

        // Remove Peanut after animation
        setTimeout(() => {
            currentPeanutTile.innerHTML = "";
            currentPeanutTile = null;
        }, 500);
        
        
    } else if (this === currentReaperTile) {
        document.getElementById("score").innerText = "Peanut is Dead";
        gameOver = true;
        gameOverSound.play()
        // Clear the intervals
        clearInterval(reaperInterval);
        clearInterval(peanutInterval);
        document.getElementById("finalScore").innerText = score.toString();
        document.getElementById("gameOverScreen").classList.remove("hidden");
    }
}



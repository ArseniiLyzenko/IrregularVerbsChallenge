function showIntro() {
    document.getElementById('overlay').style.height = '0';
    document.getElementById('game-area').style.height = '0';
    document.getElementById('intro').style.height = '100%';
}

function showGameArea() {
    document.getElementById('intro').style.height = '0';
    document.getElementById('game-area').style.height = '100%';
}

function showOverlay() {
    document.getElementById('intro').style.height = '0';
    document.getElementById('game-area').style.height = '0';
    document.getElementById('overlay').style.height = '100%';
}
const gameFrame = document.getElementById("game");


export function getCamera() {
    return ~~(gameFrame.scrollLeft / 32);
}

export function registerControls() {
    document.addEventListener("keydown", e => {
        if (e.key === "ArrowLeft") {
            gameFrame.scrollBy(-10, 0);
        } else if (e.key === "ArrowRight") {
            gameFrame.scrollBy(10, 0);
        }
    });
}
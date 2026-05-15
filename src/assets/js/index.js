// Playing an audio on click
var audio = document.getElementById("radio-song");
function togglePlayPause() {
    audio.paused? audio.play() : audio.pause();
}


// Shooting confetti on click

document.getElementsByClassName("confetti-button")[0].addEventListener("click", () => {
    let canvas = document.createElement("canvas");
    canvas.width = 1000;
    canvas.height = 1000;
    let container = document.getElementsByClassName("confetti")[0];
    container.appendChild(canvas);

    let confetti_button = confetti.create(canvas);
    confetti_button({
        particleCount: 250,
        spread: 360,
        startVelocity: 15,
        scalar: 0.9,
        tick: 1,
        colors: ["#FF6F00", "#FF8F00", "#0D47A1", "#0277BD"]

    }).then(() => container.removeChild(canvas));
});





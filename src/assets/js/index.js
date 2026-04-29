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


// Scramble text

let shuffledEls = document.querySelectorAll("#scramble");
let duration = 50;
let framesMax = 7

shuffledEls.forEach((shuffledEl) => {
  let textOrig = shuffledEl.textContent;
  let inter;

  shuffledEl.addEventListener("mouseover", (e) => {
    let text = e.currentTarget.textContent;
    let charArr = text.split("");
    let frame = 0;

    // shuffle at given speed
    inter = setInterval(() => {
      if(frame<framesMax){
        let charArrShuff = shuffleArr(charArr);
        shuffledEl.textContent = charArrShuff.join("");
        frame++
      }else{
        clearInterval(inter);
        shuffledEl.textContent = textOrig;
      }
    }, duration);

  });

  // stop
  shuffledEl.addEventListener("mouseleave", (e) => {
    e.currentTarget.textContent = textOrig;
    clearInterval(inter);
  });
});

function shuffleArr(arr) {
  return arr.reduce(
    ([a, b]) => (
      b.push(...a.splice((Math.random() * a.length) | 0, 1)), [a, b]
    ),
    [[...arr], []]
  )[1];
}


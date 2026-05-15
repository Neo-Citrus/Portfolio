
// Scramble words on hover

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

// Mobile menu nav







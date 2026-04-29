// Randomizing pages

const urls = Array.from(document.querySelectorAll('.random')). 
  map(el => el.getAttribute('href')). 
  filter(url => url && url !== '#'); 

fateText = document.querySelector(".random-link");

fateText.addEventListener("click", function() {
   let randomIndex = urls[Math.floor(Math.random() * urls.length)]; 
   fateText.setAttribute("href", randomIndex);
});

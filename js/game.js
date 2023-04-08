const cardList = ['./assets/images/bobrossparrot.gif','./assets/images/explodyparrot.gif', './assets/images/fiestaparrot.gif', './assets/images/metalparrot.gif', './assets/images/revertitparrot.gif', './assets/images/tripletsparrot.gif', './assets/images/unicornparrot.gif'];
// const cardsDisplay = cardList.concat(cardList);
// cardsDisplay.sort(comparador); // Após esta linha, a minhaArray estará embaralhada

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

let round = 0;
let score = 0;

let cardQt;

let quantityCheck;

do {
  cardQt = parseInt(prompt("Quantidade de cartas?"));

  if(cardQt % 2 === 0 && cardQt >= 4 && cardQt <= 14) {
    checkQuantity = false;
  } else {
    checkQuantity = true;
  }
} while (checkQuantity);

const cardsContainer = document.querySelector('.cards-container');
cardsContainer.innerHTML = '';
for (let i = 0; i < cardQt; i++) {
  cardsContainer.innerHTML += 
  `<div class="card">
    <div class="front-face face">
      <img data-test="face-down-image" src="./assets/images/back.png" alt="">
    </div>
    <div class="back-face face">
      <img src="${cardsDisplay[i]}">
    </div>
  </div>`
  ;
  
}

let firstPick = "";
let secondPick = "";

const cards = document.querySelectorAll('.card').forEach((element) => {
  element.addEventListener('click', pickCard);  
});

function pickCard (card) {
    if (firstPick == '') {
      firstPick = card.currentTarget;
      
      card.currentTarget.children[0].classList.add("active");
      card.currentTarget.children[1].classList.add("active");
      card.currentTarget.children[1].children[0].setAttribute('data-test', 'face-up-image');
    } else if (firstPick !== '' && secondPick == '') {
      secondPick = card.currentTarget;
      secondPick.children[0].classList.add('active');
      secondPick.children[1].classList.add('active');
      secondPick.children[1].children[0].setAttribute('data-test', 'face-up-image');

      checkPicks();
    }

}

// check if the two selected cards match, if so disables onClick for the matched cards. If not, turns the cards again
function checkPicks (card) {
  if (firstPick.children[1].children[0].getAttribute('src') === secondPick.children[1].children[0].getAttribute('src') ) {
    score++;
    firstPick.removeEventListener('click', pickCard);
    secondPick.removeEventListener('click', pickCard);

    
    setTimeout(() => {
      firstPick = '';
      secondPick = '';
    }, 1200);
    checkWin();
  } else {

    setTimeout(clearPicks, 1000);
  }

}

function clearPicks () {
  firstPick.children[0].classList.remove('active');
  firstPick.children[1].classList.remove('active');
  firstPick.children[1].children[0].removeAttribute('data-test');
  firstPick = '';
  
  secondPick.children[0].classList.remove('active');
  secondPick.children[1].classList.remove('active');
  secondPick.children[1].children[0].removeAttribute('data-test');
  secondPick = '';
}

function checkWin () {
  if(score === cardQt / 2) {
    alert('VITÒRIA');
  }
}
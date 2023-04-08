const cardList = ['./assets/images/bobrossparrot.gif','./assets/images/explodyparrot.gif', './assets/images/fiestaparrot.gif', './assets/images/metalparrot.gif', './assets/images/revertitparrot.gif', './assets/images/tripletsparrot.gif', './assets/images/unicornparrot.gif'];
let sortedCards = [];


// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

let round = 0;
let score = 0;

let cardQt;

let quantityCheck;

function startGame (action) {
  do {
    cardQt = parseInt(prompt("Quantidade de cartas?"));
  
    if(cardQt % 2 === 0 && cardQt >= 4 && cardQt <= 14) {
      checkQuantity = false;

      distributeCards();
    } else {
      checkQuantity = true;
    }
  } while (checkQuantity);
}

function distributeCards () {
  sortedCards = cardList.slice(0, cardQt/2);
  sortedCards = sortedCards.concat(sortedCards);
  sortedCards.sort(comparador);

  const cardsContainer = document.querySelector('.cards-container');
  cardsContainer.innerHTML = '';
  for (let i = 0; i < cardQt; i++) {
    cardsContainer.innerHTML += 
      `<div class="card" data-test="card">
        <div class="front-face face">
          <img data-test="face-down-image" src="./assets/images/back.png" alt="">
        </div>
        <div class="back-face face">
          <img src="${sortedCards[i]}">
        </div>
      </div>`;
  }
}

let firstPick = "";
let secondPick = "";

startGame();

const cards = document.querySelectorAll('.card').forEach((element) => {
  element.addEventListener('click', pickCard);  
});

function pickCard (card) {
    if (firstPick == '') {
      firstPick = card.currentTarget;
      
      card.currentTarget.children[0].classList.add("active");
      card.currentTarget.children[1].classList.add("active");
      card.currentTarget.children[1].children[0].setAttribute('data-test', 'face-up-image');
      round++;
    } else if (firstPick !== '' && secondPick == '') {
      secondPick = card.currentTarget;
      secondPick.children[0].classList.add('active');
      secondPick.children[1].classList.add('active');
      secondPick.children[1].children[0].setAttribute('data-test', 'face-up-image');
      round++;
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
    // setTimeout(checkwin, 500);
    setTimeout(() => {
      checkWin();
    }, 500);
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
    alert(`Você  ganhou em ${round} jogadas!`);
  }
}
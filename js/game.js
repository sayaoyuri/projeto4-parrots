// const cardQt = parseInt(prompt("Quantidade de cartas?"));
function checkCardQuantity() {
  // implement
}

const cardList = ['./assets/images/bobrossparrot.gif'];
let round = 0;
let score = 0;
let pickedCard = "";

const cards = document.querySelectorAll('.card').forEach((element) => {
  element.addEventListener('click', play);  
});

function play (element) {
  console.log(element.currentTarget);
  element.currentTarget.children[0].classList.add("active");
  element.currentTarget.children[1].classList.add("active");
  element.currentTarget.children[1].children[0].setAttribute('data-test', 'face-up-image');

  pickCard(element.currentTarget);
  round++;
}

function pickCard (element) {
  pickedCard === "" ? pickedCard = element.children[1].children[0].getAttribute("src") : checkPick(element);
}

// check if the two selected cards match, if so disables onClick for the matched cards. If not, turns the cards again
function checkPick (card) {
  if(card.children[1].children[0].getAttribute("src") === pickedCard) {
    document.querySelectorAll(`[src="${pickedCard}"`).forEach((card) => {
      card.parentNode.parentNode.removeEventListener('click', play);
    });

    score++;
    pickedCard = "";
  } else {
    setTimeout(() => {uncheckCards(card);}, 1000);
  }
}

function uncheckCards (card) {
  const test = document.querySelectorAll(`[src="${pickedCard}"`);
  test.forEach((card) => {
    card.setAttribute('data-test', '');
    
    // need to refact
    console.log(card)
    card.parentNode.classList.remove('active');
    card.parentNode.parentNode.children[0].classList.remove('active');
  });

  // works, need to refact
  card.children[1].children[0].setAttribute('data-test', '');

  card.children[0].classList.remove('active');
  card.children[1].classList.remove('active');

  pickedCard = "";
}
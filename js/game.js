let round = 0;
let pickedCard = "";

const cards = document.querySelectorAll('.card').forEach((element) => {
  element.addEventListener('click', play);  
});

function play (element) {
  // console.log(element.currentTarget);
  element.currentTarget.children[0].classList.add("active");
  element.currentTarget.children[1].classList.add("active");
  // console.log(element.currentTarget.children[1].children[0].getAttribute("src"));
  pickCard(element.currentTarget);
  round++;
}

function pickCard (element) {
  pickedCard === "" ? pickedCard = element.children[1].children[0].getAttribute("src") : checkPick(element);
}

function checkPick (card) {
  // console.log(card);
  if(card.children[1].children[0].getAttribute("src") === pickedCard) {
    const cards = document.querySelectorAll(`[src="${pickedCard}"`);
    cards.forEach(function (card) {
      card.parentNode.parentNode.removeEventListener('click', play);
    })
    pickedCard = "";
  } else {
    
  }
}
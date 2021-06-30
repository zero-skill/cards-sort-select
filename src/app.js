let btn_draw = document.getElementById("draw");
let btn_sort = document.getElementById("sort");
let container = document.getElementById("container");
let cards = [];

function randomNumber() {
  let num = Math.floor(Math.random() * 13) + 1;
  return num;
}

function cardValue(num) {
  if (num > 1 && num < 11) {
    return num.toString();
  } else {
    switch (num) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
    }
  }
}

function randomSuit() {
  let suit = Math.floor(Math.random() * 4) + 1;
  switch (suit) {
    case 1:
      return "♦";
    case 2:
      return "♥";
    case 3:
      return "♠";
    case 4:
      return "♣";
  }
}

function printCards(num, suit, obj) {
  num = cardValue(num);

  let new_col = document.createElement("div");
  new_col.className = "col-sm-1";

  let card = document.createElement("div");
  card.className = "card";

  let card_body = document.createElement("div");
  card_body.className = "card-body p-2";

  let suit_top = document.createElement("h5");
  suit_top.className = "card-title text-start";
  suit_top.innerHTML = suit;

  let num_card = document.createElement("h5");
  num_card.className = "card-title text-center";
  num_card.innerHTML = num;

  let suit_bottom = document.createElement("h5");
  suit_bottom.className = "card-title text-end upsidedown";
  suit_bottom.innerHTML = suit;

  if (suit === "♥" || suit === "♦") {
    suit_top.style["color"] = "red";
    suit_bottom.style["color"] = "red";
  }

  card_body.appendChild(suit_top);
  card_body.appendChild(num_card);
  card_body.appendChild(suit_bottom);
  card.appendChild(card_body);
  new_col.appendChild(card);

  obj.appendChild(new_col);
}

function removeSorts() {
  if (document.getElementsByClassName("new_row").length != 0) {
    var new_rows = document.getElementsByClassName("new_row");
    for (
      let i = document.getElementsByClassName("new_row").length - 1;
      i >= 0;
      i--
    ) {
      container.removeChild(new_rows[i]);
    }
  }
}

btn_draw.onclick = function draw() {
  let firstRow = document.getElementById("first-row");
  firstRow.innerHTML = "";
  cards = [];

  removeSorts();

  for (let i = 0; i < document.getElementById("amount").value; i++) {
    let cardObj = { value: randomNumber(), suit: randomSuit() };
    cards.push(cardObj);
  }
  cards.forEach(element => {
    printCards(element.value, element.suit, firstRow);
  });
};

btn_sort.onclick = function sort() {
  removeSorts();

  let subtitle_row = document.createElement("div");
  subtitle_row.className = "row m-2 new_row";

  let subtitle = document.createElement("h4");
  subtitle.className = "d-inline text-light p-0";
  subtitle.innerHTML = "Sorted Cards: ";

  subtitle_row.appendChild(subtitle);
  container.appendChild(subtitle_row);

  for (let i = 0; i < cards.length - 1; i++) {
    for (let j = i; j < cards.length; j++) {
      if (cards[j].value < cards[i].value) {
        let aux = cards[j];
        cards[j] = cards[i];
        cards[i] = aux;
      }
    }
    let new_row = document.createElement("div");
    new_row.className = "row m-2 new_row";
    container.appendChild(new_row);
    for (let i = 0; i < cards.length; i++) {
      printCards(cards[i].value, cards[i].suit, new_row);
    }
  }
};

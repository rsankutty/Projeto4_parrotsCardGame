 
let num_cartas=0;
while (num_cartas>14 || num_cartas<4 || num_cartas%2!=0){
  num_cartas = parseInt(prompt("Com quantas cartas gostaria de jogar? (número par entre 4 e 14)"));
}


const img_array = ["images/metalparrot.gif","images/unicornparrot.gif","images/tripletsparrot.gif","images/bobrossparrot.gif","images/explodyparrot.gif","images/fiestaparrot.gif","images/revertitparrot.gif"]

// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}

function generateListItems(arr){
  let objectArray =[];
  for (let i=0;i<arr.length;i++){
    let elem = `<div class="card ${arr[i]}" onclick="cardClick(this);cardMatch(this)">
    <div class="front-face face aux">
      <img src="images/back.png" width="100px" alt="">
    </div>
    <div class="back-face face aux">
      <img src=${arr[i]} width="70px" alt="">
    </div>
    </div>`
    objectArray.push(elem);
    objectArray.push(elem);
  }
  gameArray = objectArray.slice(0,num_cartas);
  gameArray.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
  let items = "";
  for (let i=0;i<gameArray.length;i++){
    items += gameArray[i];
  }
  return items;
}

document.querySelector(".cards_container").innerHTML = `${generateListItems(img_array)}`

function cardClick(elem){
  elem.children[0].classList.add("front-face-flip");
  elem.children[1].classList.add("back-face-flip");
}

let arr_match =[];
let contador=0;
function cardMatch(elem) {
  let classes = elem.className;
  let classArray = classes.split(' ');
  let id = classArray[1];
  contador += 1;
  if (arr_match.length<2){
    arr_match.push(id);
    if (arr_match.length==2){
      if (arr_match[0]==arr_match[1]){
        let equal=document.getElementsByClassName(arr_match[0]);
        equal[0].children[0].classList.remove("aux");
        equal[0].children[1].classList.remove("aux");
        equal[1].children[0].classList.remove("aux");
        equal[1].children[1].classList.remove("aux");
      } else {
        setTimeout(unflipCard, 1e3);
      }
      arr_match=[];
      endGame();
    }
  }
}

function endGame(){
  let aux_elem = document.querySelectorAll(".aux");
  if (aux_elem.length==0){
    alert(`Você ganhou em ${contador} jogadas!`)
  }
}

function unflipCard(){
  let flipped_elem_front = document.querySelectorAll(".front-face-flip.aux");
  let flipped_elem_back = document.querySelectorAll(".back-face-flip.aux");
    for (let i=0; i<flipped_elem_front.length;i++){
      flipped_elem_front[i].classList.remove("front-face-flip");
      flipped_elem_back[i].classList.remove("back-face-flip");
    }
}
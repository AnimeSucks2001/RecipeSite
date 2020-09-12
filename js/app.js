
const navMain = document.querySelectorAll(".list-items");
const subNav = document.querySelectorAll(".subNav");
const btnAddRec = document.querySelector(".section-menu button");
const recipesDiv = document.querySelector(".recipes");
const addRecipe = document.querySelector(".adding-recipe");

const addIngridient = document.querySelector(".adding-recipe .add-ingridients");
const addIngrInput = document.querySelector(".adding-recipe #add-ingridients");
const addIngrUl = document.querySelector(".adding-recipe ol");
const ingrNumber = document.querySelector(".adding-recipe .ingridient-count");
const addName = document.querySelector(".adding-recipe .add-name");

let recArr = [];
const recipes = document.querySelector(".recipes add-recepie");
let recipesS = recipes;
while (recipesS && stop !=20){
  recArr.push(recipesS);
  recipesS = recipesS.nextElementSibling;
}
console.log(recArr)

function changeBlock() {
let currentElSib = this.nextElementSibling;
let currentElSibLi = this.nextElementSibling.querySelectorAll("li");

    if (currentElSib.style.height > "0px"){
        currentElSib.style.height = "0px";
        this.style.backgroundColor = "#ede682";
       // calcDelayHide(currentElSibLi, 200);
      } else {
        currentElSib.style.height = "100px";
        this.style.backgroundColor = "#febf63";
      //  calcDelay(currentElSibLi, 200);
      } console.log(currentElSib);
}


for (i = 0 ; i <= navMain.length - 1; i++) {
    navMain[i].addEventListener("click", changeBlock);
}

///=== Button for adding recipes ===///
function showAddRec(){

  if(recipesDiv.style.display === "none") {
    recipesDiv.style.display = "flex";
    addRecipe.style.display = "none";
  } else {
    recipesDiv.style.display = "none";
    addRecipe.style.display = "flex";
  }
}

btnAddRec.addEventListener("click", showAddRec);

///=== Adding ingridients ===///

function addList(){
  const newLi = document.createElement("li");
  newLi.innerText = addIngrInput.value;

  addIngrUl.appendChild(newLi);

  const li = document.querySelectorAll(".add-ingridients-wrapper ol li");
  ingrNumber.innerText = li.length;
}

addIngridient.addEventListener("click", addList);
/////////////////////////////////////////////////
function resetStyle(){
  addName.style = null;
  addName.removeAttribute("placeholder");
}

addName.addEventListener("click", resetStyle);

///=== Page for adding recipes ===///
function createRec(e){
  e.preventDefault();

  if (addName.value === ""){
    addName.style.borderColor = "red";
    addName.style.boxShadow = "0 0 5px red";
    addName.setAttribute("placeholder", "Введите название!");
  } else {
    let rec = {
    img: document.querySelector(".adding-recipe .add-img img").src,
    name: addName.value,
    time: document.querySelector(".adding-recipe .add-time").value,
    ingr: ingrNumber.innerText
  }
  
  document.querySelector("form").reset();

  let tres = document.createElement("add-recepie");
  tres.setAttribute("img", rec.img);
  tres.setAttribute("name", rec.name);
  tres.setAttribute("time", rec.time);
  tres.setAttribute("ingridients", rec.ingr);
  recipesDiv.appendChild(tres);
  recArr.push(tres);
  console.log(recArr);
  }
}

document.querySelector(".adding-recipe .submit").addEventListener("click", createRec);


///=== Custon WebComponent(Recipe) ===///
const template = document.createElement("template");
template.innerHTML = `
  <style>
    *{
      margin: 0;
      padding: 0;
    }
    .inside-recipes {
      display: flex;
      flex-direction: column;
      height: 225px;
      width: 250px;
      background-color: #abebc0;
    }

    .img {
      height: 150px;
      width: 150px;
      margin: auto;
    }

    .food-name {
      text-align: center;
    }

    .wrapper-food {
      display: flex;
      justify-content: center;
      margin-top: 5px;
      background-color: #c9fdcf;
    }

    .food-time {
      display: flex;
      align-items: center;
      margin-right: 25px;
    }

    .food-ingridients {
      display: flex;
      align-items: center;
    }

    .food-time img,
    .food-ingridients img {
      margin-left: 5px;
    }
  </style>

  <div class="inside-recipes">
    <img src="#" class="img">
      <h3 class="food-name"></h3>
      <div class="wrapper-food">
        <div class="food-time"><span></span><img src="img/clock.png" width="25" height="25" alt="Clock"></div>
        <div class="food-ingridients"><span></span><img src="img/food.svg" width="25" height="25" alt="Food"></div>
      </div>
  </div>
`;


class AddRecipe extends HTMLElement {

  connectedCallback(){
    const shadow = this.attachShadow({mode : "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.querySelector(".img").src = this.getAttribute("img");
    this.shadowRoot.querySelector(".food-name").innerText = this.getAttribute("name");
    this.shadowRoot.querySelector(".food-time span").innerText = this.getAttribute("time");
    this.shadowRoot.querySelector(".food-ingridients span").innerText = this.getAttribute("ingridients");

    this.addEventListener("click", saveAttr);
  }

  static get observedAttributes(){
    return ["recArr"];
  }

  attributeChangedCallback(recArr, oldValue, newValue){
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  }
}

customElements.define("add-recepie", AddRecipe);


function saveAttr(){
  localStorage.setItem("name", this.getAttribute("name"));
  localStorage.setItem("img", this.getAttribute("img"));
  localStorage.setItem("time", this.getAttribute("time"));
  localStorage.setItem("ingridients", this.getAttribute("ingridients"));
}

for(i=0; i < recArr.length; i++){
  recArr[i].addEventListener("click", saveAttr);
}

/*
function calcDelay(taking, mult){

    function delayy(i){
    	setTimeout(() => {taking[i].style.display = "block";}, mult);
    }

	for (i = 0; i <= taking.length - 1; i++) {
		delayy(i);
		mult += 200;
	}

	mult = 200;
}

function calcDelayHide(taking, mult){
	let shrek = Object.keys(taking).reverse();

    function delayy(i){

    	setTimeout(() => {taking[i].style.display = "none";}, mult, shrek);
    }

	for (i = 0; i <= taking.length - 1; i++) {
		delayy(i);
		mult += 200;
	}

	mult = 200;
} */














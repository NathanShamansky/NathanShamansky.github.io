let Cards = document.querySelectorAll("#card")
let LockCards = document.querySelectorAll(".LockCard")
let LockedCards = [false,false,false]
let CanUpdate = true;
let SaveIds = [];
let CardSelecters = [261, 448]
let CardSelected = 0;


function Start()
{
    for (let index = 0; index < LockCards.length; index++) {
        LockCards[index].style.backgroundColor = "lightgreen";
    }
    LockedCards = [];
    for (let index = 0; index < Cards.length; index++) {
        LockedCards.push(false);
    }
}

function getImage(fileName) {
       return "https://playingcardsio.s3.amazonaws.com/games/joking-hazard/"+(fileName + 100)+".png"
}
  

function ReRoll()
{
    if(CanUpdate){
        let usedCards = [0,1];
        for (let index = 0; index < Cards.length; index++) {
            currentCard = Math.floor(Math.random() * CardSelecters[CardSelected])
            if(currentCard > 210 && currentCard < 221)
            {
                ReRoll();
            }else{
                if(LockedCards[index] == false)
                {
                    GetCard(index, currentCard)

                }
            }
        }
        document.getElementById("SaveID").textContent = "This Save ID = ";
        for (let index = 0; index < SaveIds.length; index++) {
            const element = SaveIds[index];
            if(index == 0){
                document.getElementById("SaveID").textContent = document.getElementById("SaveID").textContent + element;
            }else {
                document.getElementById("SaveID").textContent = document.getElementById("SaveID").textContent + "-" + element;
            }
            
        }
    }
}
function GetCard(index, currentCad) {
    CanUpdate = false;
    SaveIds[index] = currentCad;
    Cards[index].classList.add("DeleatCard");
    setTimeout(function() {
      Cards[index].src = getImage(currentCad);
      Cards[index].alt = currentCad;
      Cards[index].classList.remove("DeleatCard");
      Cards[index].classList.add("SpawnCard");

      var startTime = new Date().getTime();
      var image = new Image();
      image.src = Cards[index].src;

      var waitForLoad = setInterval(function() {
        if (image.complete && (new Date().getTime() - startTime) > 1000) {
          clearInterval(waitForLoad);
          Cards[index].classList.remove("SpawnCard");
          CanUpdate = true;
        }
      }, 50);
    }, 900);
}


function LockCard(num){
    LockedCards[num] = !LockedCards[num];
    console.log(LockCards[num].style.backgroundColor);
    if(LockCards[num].style.backgroundColor == "lightgreen")
    {
        LockCards[num].style.backgroundColor = "red";
        Cards[num].classList.add("RedBG");
    }else{
        LockCards[num].style.backgroundColor = "lightgreen";
        Cards[num].classList.remove("RedBG");
    }
}

document.getElementById("NumberOfCardsInput").addEventListener("change", function(event){
    RedoSize(Math.min(Math.max(document.getElementById("NumberOfCardsInput").value, 1), 5));
});

function RedoSize(length){
    LockedCards = [];
    for (let index = 0; index < length; index++) {
        LockedCards.push(false);
    }
    //destroy old
    while (document.getElementById("card-container").firstChild) {
        document.getElementById("card-container").removeChild(document.getElementById("card-container").firstChild);
    }    
    console.log("YE");
    //create new
    for (let index = 0; index < length; index++) {
        var button = document.createElement("button");
        button.style.backgroundColor = "lightgreen";
        button.className = "LockCard";
        button.onclick = function() {
          LockCard(index);
        };
        document.getElementById("card-container").appendChild(button);
        console.log("2");
    }
    for (let index = 0; index < length; index++) {
        var img = document.createElement("img");
        img.id = "card";
        img.src = getImage(Math.floor(Math.random() * CardSelecters[CardSelected]));
        img.alt = Math.floor(Math.random() * CardSelecters[CardSelected]);
        document.getElementById("card-container").appendChild(img);
        console.log("3");
    }
    LockCards = document.querySelectorAll(".LockCard")
    Cards = document.querySelectorAll("#card")
    document.getElementById("card-container").style.gridTemplateColumns = "repeat("+length+", 1fr)";
    console.log(document.getElementById("card-container").style.gridTemplateColumns);
    console.log(length);
    console.log("5");
}


document.getElementById("SaveIDInput").addEventListener("change", function(event){
    let Input = document.getElementById("SaveIDInput").value;
    let result = Input.split("-");
    RedoSize(result.length);
    for (let index = 0; index < result.length; index++) {
        const element = result[index];
        Cards[index].src = getImage(element - 100);
    }
});

document.getElementById("CardSelectedCheckBox").addEventListener("change", function(event){
    console.log(event.target.checked);
    if(event.target.checked == true)
    {
        CardSelected = 1;
    }else{
        CardSelected = 0;
    }
});

const pole = document.getElementsByClassName("pole");
const pole2 = document.getElementsByClassName("pole2");
const counter = document.getElementById("counter");

let ships = [];
let enemyShips = [];
let numShips = 4;
let armed = false;
let game = false;
let startgame = false;

for (let index = 0; index < pole.length; index++) {
  pole[index].addEventListener("click", () => {
    let pozice = index;
    if (numShips > 0 && pole[pozice].style.backgroundColor != "black") {
      pole[pozice].style.backgroundColor = "black";
      numShips--;
      ships.push(pozice);
      if (numShips == 0) {
        let time = 3;
        const timer = setInterval(() => {
          counter.innerHTML = time;
          time--;
          if (time < 0) {
            clearInterval(timer);
            counter.innerHTML = `Start`;
          }
        }, 1000);
      }
    }
  });
}

for (let index = 0; index < pole2.length; index++) {
  pole2[index].addEventListener("click", () => {
    let pozice = index;
    let check = false;
    if (!game && startgame) {
      enemyAttack();
      if (armed == true) {
        for (let i = 0; i < enemyShips.length; i++) {
          if (enemyShips[i] == pozice) {
            check = true;
          }
        }
        if (check) {
          pole2[pozice].style.backgroundColor = "red";
          armed = false;
          if (
            pole2[enemyShips[0]].style.backgroundColor == "red" &&
            pole2[enemyShips[1]].style.backgroundColor == "red" &&
            pole2[enemyShips[2]].style.backgroundColor == "red" &&
            pole2[enemyShips[3]].style.backgroundColor == "red"
          ) {
            game = true;
            counter.innerHTML = `You win`;
          }
        } else {
          pole2[pozice].style.backgroundColor = "blue";
          armed = false;
        }
      }
    }
  });
}

for (let index = 0; index < 4; index++) {
  let random = Math.floor(Math.random() * 24);
  let check = false;
  for (let i = 0; i < enemyShips.length; i++) {
    if (enemyShips[i] == random) {
      index--;
      check = true;
    }
  }
  if (!check) {
    enemyShips.push(random);
  }
  
}

counter.onclick = () => {
  if (counter.innerHTML == `Start`) {
    startGame();
    startgame = true;
  }
};



function startGame() {
  counter.innerHTML = `Play!!!`;
  let check = true;
  armed = true;
}
function enemyAttack() {
  if (!game && startgame) {
    let ran = Math.floor(Math.random() * 24);
    console.log(ran)
    let check = false;
    let boat = 0;
    for (let i = 0; i < ships.length; i++) {
      if (ships[i] == ran) {
        check = true;
        boat = ran;
      }
    }
    if (check) {
      pole[boat].style.backgroundColor = "red";
      console.log("Enemy Hit!")
    } else {
      pole[ran].style.backgroundColor = "blue";
      console.log("Enemy Miss!")
    }
  }
  if (
    pole[ships[0]].style.backgroundColor == "red" &&
    pole[ships[1]].style.backgroundColor == "red" &&
    pole[ships[2]].style.backgroundColor == "red" &&
    pole[ships[3]].style.backgroundColor == "red"
  ) {
    game = true;
    counter.innerHTML = `Enemy wins`;
  } else {
    armed = true;
  }
}

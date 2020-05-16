
let $gameboard = document.querySelector('#game-board');
let score = 0;

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    let game = new Game();
    game.start();
  };

};

class Game {
  car = new Car();
  obstacles = [];
  start() {
    $gameboard.style.display = "block";
    this.car.$car.style.display = "block";
    this.render();
  }

  render() {
    document.addEventListener("keydown", event => {
      this.car.render(event.key);
    }); 
    setInterval(()=> {
    this.obstacles.forEach((obstacle) => {
      obstacle.render(obstacle,this.car);
    })
  },200)
  setInterval(()=> {
    this.obstacles.push(new Obstacle())
    },2000)
  }
}


class Car {
  constructor(){
    this.$car = document.querySelector("#car");
    this.x = this.$car.offsetLeft;
    this.width = this.$car.offsetWidth;
  }

  render(event){
    switch (event) {
      case "ArrowRight":
        if (this.$car.x + this.$car.width < $gameboard.offsetLeft + $gameboard.offsetWidth) {
          this.$car.style.left = `${this.$car.offsetLeft + 10}px`;
        }
        break;
      case "ArrowLeft":
        if (this.$car.x > $gameboard.offsetLeft) {
          this.$car.style.left = `${this.$car.offsetLeft - 10}px`;
        }
        break;
      default:
        break;
    }
  }
}


class Obstacle {
  constructor() {
    this.$obstacle = document.createElement("div");
    this.$obstacle.setAttribute("class", "obstacle");
    $gameboard.appendChild(this.$obstacle);
    this.$obstacle.style.left = ($gameboard.offsetLeft + (Math.random() * ($gameboard.offsetWidth - this.$obstacle.offsetWidth))) + "px";
    this.$car = document.querySelector("#car");
    }
render() {
  if(collisionDetectIon(this.$obstacle, this.$car)){
    $gameboard.style.display = "none";
    document.querySelector(".gameover").style.display = "block";
    console.log("CRASH! Get driving lessons!");
  } else if (this.$obstacle.offsetTop > ($gameboard.offsetTop + $gameboard.offsetHeight - (this.$obstacle.offsetHeight *2))){ //SCORE INCREASE WITH EVERY OBSTACLE THAT MADE IT TO THE BOTTOM
    this.$obstacle.style.display = "none";
    score += 1;
    document.querySelector("#score").innerHTML = score;

  }  else {
    this.$obstacle.style.top = `${this.$obstacle.offsetTop + 10}px`;
  }
}
}

function collisionDetectIon($dom1, $dom2) {

    let sq1 = {
        x: $dom1.offsetLeft,
        y: $dom1.offsetTop,
        width: $dom1.offsetWidth,
        height: $dom1.offsetHeight
    }

    let sq2 = {
        x: $dom2.offsetLeft,
        y: $dom2.offsetTop,
        width: $dom2.offsetWidth,
        height: $dom2.offsetHeight
    }

    if (!(sq2.y + sq2.height < sq1.y ||
            sq2.y > sq1.y + sq1.height ||
            sq2.x + sq2.width < sq1.x ||
            sq2.x > sq1.x + sq1.width
        )) {
        return true;
    } else {
        return false;
    }

}
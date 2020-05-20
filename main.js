let firstGameTable = document.getElementById("gamearea");
let secondGameTable = document.getElementById("game-area2");
let firstSquares = document.getElementsByClassName("firstBoardSquares");
let secondSquares = document.querySelectorAll(".secondBoardSquares");
let secondSquaresAsClass = document.getElementsByClassName(
  "secondBoardSquares"
);
let answer;
let answer2;
let startButton = document.getElementById("playButton");
let checkButton = document.getElementById("checkButton");
let playAgain = document.getElementById("replay");
let rightOrWrong = document.getElementById("correct");
let direct = document.getElementById("directions");
let score = 0;

/* random pattern generator on first board */
checkButton.addEventListener("click",colorCheckMatcher);
playAgain.addEventListener("click",startANew);
startButton.addEventListener("click", patterGen);

function smith() {
  firstSquares.map((item) => {
    if (item.classList.contains("flip")) {
      item.classList.remove("flip");
    }
  });
}

function patterGen() {
  let firstsquareIterations = [
    firstSquares[0],
    firstSquares[1],
    firstSquares[2],
    firstSquares[3],
    firstSquares[4],
    firstSquares[5],
    firstSquares[6],
    firstSquares[7],
    firstSquares[8],
    firstSquares[9],
    firstSquares[10],
    firstSquares[11],
  ];
  let arrCopy = firstsquareIterations.slice();
  let ranIdx;
  let resArr = [];
  let ranLen = Math.floor(Math.random() * arrCopy.length) + 1;

  for (i = 0; i < ranLen; i++) {
    ranIdx = Math.floor(Math.random() * arrCopy.length);
    resArr.push(arrCopy.splice(ranIdx, 1)[0]);
  }

  /*this turns the color of the squares */
  setTimeout(function () {
    resArr.forEach((card) => {
      card.classList.toggle("flip");
    });
    /*this gets the inner hmtl for each square */
    let numberReader = resArr.map((item) => {
      return item.innerHTML;
    });
    /* this sorts the array */
    let numberReaderSorter = numberReader.sort((a, b) => a - b);
    answer = numberReaderSorter;
    console.log(answer);
  }, 1000);
  firstGameTable.style.display = "flex";
  direct.style.display ="none";
  startButton.style.display = "none";
  setTimeout(function () {
    resArr.forEach((card) => {
      card.classList.toggle("flip");
    });

    firstGameTable.style.display = "none";
    secondGameTable.style.display = "flex";
    checkButton.style.display = "flex";
  }, 4000);
}

/*------------------------------------------------------------*/

/* check for matcher */

function colorCheckMatcher() {
  let toArrayMaker = [...document.querySelectorAll(".secondBoardSquares")];

  let toArrayChecker = toArrayMaker.map((item) => {
    if (item.classList.contains("flip")) {
      return item.innerHTML;
    }
  });
  let filtered = toArrayChecker.filter(function (el) {
    return el != null;
  });

  answer2 = filtered;
  console.log(answer2);
  answerDisplayer();
}
/*-----------*/
function answerDisplayer() {
  if (JSON.stringify(answer2) === JSON.stringify(answer)) {
    rightOrWrong.innerHTML = "Nice";
    score++;
    console.log(score);
    colorRemover();
  } else {
    rightOrWrong.innerHTML = "Too Bad" + "<br />" + "Your Score:" + " " + score;
    secondGameTable.style.display = "none";
    checkButton.style.display = "none";
    playAgain.style.display = "flex";
  }
}

/*-----------------------------------------------------------*/
/*  color toggler */

function colorTurner() {
  this.classList.toggle("flip");
  this.classList.contains(".flip");
}
/*-------This clears the board----------------*/

function colorRemover() {
  let toArrayMaker = [...document.querySelectorAll(".secondBoardSquares")];
  let toArrayChecker = toArrayMaker.map((item) => {
    if (item.classList.contains("flip")) {
      item.classList.remove("flip");
      secondGameTable.style.display = "none";
      checkButton.style.display = "none";
      setTimeout(function () {
        rightOrWrong.innerHTML = " ";
      }, 2000);
    }
  });

  setTimeout(function () {
    patterGen();
  }, 2000);
}

/* event listener for toggling colors */
secondSquares.forEach((yo) => yo.addEventListener("click", colorTurner));

function startANew() {
  window.location.reload();
}

const boxes = document.querySelectorAll(".box");
const resetBtn = document.getElementById("reset");
const newBtn = document.getElementById("new");
const msgContainer = document.getElementById("msg-container");
const msg = document.getElementById("msg");

let turnO = true; // O starts first

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "#219ebc";
    } else {
      box.innerText = "X";
      box.style.color = "#e63946";
    }
    box.disabled = true;
    turnO = !turnO;

    checkWinner();
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => (box.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
  });
};

const showWinner = (winner) => {
  msg.innerText = `🎉 Winner: ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
      showWinner(pos1);
      return;
    }
  }

  // Draw check
  let filled = [...boxes].every((box) => box.innerText !== "");
  if (filled) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
  }
};

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);

const xClass = "x-class";
const oClass = "o-class";
const cellElements = document.querySelectorAll(".cell");
const board = document.querySelector(".board");
const winningMessage = document.querySelector(".winning-message");
const winningMessageText = document.querySelector(".winning-text");
const resetButton = document.querySelector(".reset-button");
let oTurn;
const backButton = document.querySelector(".back-button");

const winningCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

startGame();

resetButton.addEventListener("click", startGame);

function startGame() {
	oTurn = false;
	cellElements.forEach(cell => {
		cell.classList.remove(xClass);
		cell.classList.remove(oClass);
		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true });
	});
	setBoardHoverClass();
	winningMessage.classList.remove("show");
}

function handleClick(e) {
	const cell = e.target;
	const currentClass = oTurn ? oClass : xClass;
	placeMark(cell, currentClass);
	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurn();
		setBoardHoverClass();
	}

	//switch turn
}

function endGame(draw) {
	if (draw) {
		winningMessageText.innerText = "DRAW!";
	} else {
		winningMessageText.innerHTML = `${oTurn ? "O's" : "X's"} WINS!`;
	}
	winningMessage.classList.add("show");
}

function isDraw() {
	return [...cellElements].every(cell => {
		return cell.classList.contains(xClass) || cell.classList.contains(oClass);
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurn() {
	oTurn = !oTurn;
}

function setBoardHoverClass() {
	board.classList.remove(xClass);
	board.classList.remove(oClass);
	if (oTurn) {
		board.classList.add(oClass);
	} else {
		board.classList.add(xClass);
	}
}

function checkWin(currentClass) {
	return winningCombinations.some(combination => {
		return combination.every(index => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function goBackPage() {
	location.href = "../../projects.html";
}

backButton.addEventListener("click", goBackPage);

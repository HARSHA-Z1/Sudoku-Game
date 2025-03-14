var numSelected = null;
var errors = 0;
var board = [];
var solution = [];

function generateEmptyBoard() {
    let emptyBoard = [];
    for (let i = 0; i < 9; i++) {
        emptyBoard.push("-".repeat(9));
    }
    return emptyBoard;
}

function generateSudokuBoard() {
    let generatedBoard = generateEmptyBoard();
    let solvedBoard = generateSolvedBoard();
    
    let puzzleBoard = solvedBoard.map(row => row.split(""));
    for (let i = 0; i < 40; i++) {
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);
        puzzleBoard[r][c] = "-";
    }
    return puzzleBoard.map(row => row.join(""));
}

function generateSolvedBoard() {
    return [
        "387491625", "241568379", "569327418",
        "758619234", "123784596", "496253187",
        "934176852", "675832941", "812945763"
    ];
}

window.onload = function () {
    board = generateSudokuBoard();
    solution = generateSolvedBoard();
    setGame();
};

function setGame() {
    document.getElementById("digits").innerHTML = "";
    document.getElementById("board").innerHTML = "";

    for (let i = 1; i <= 9; i++) {
        let number = document.createElement("div");
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }

    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            if (board[r][c] !== "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) tile.classList.add("horizontal-line");
            if (c == 2 || c == 5) tile.classList.add("vertical-line");
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }
}

function selectNumber() {
    if (numSelected) numSelected.classList.remove("number-selected");
    numSelected = this;
    numSelected.classList.add("number-selected");
}

function selectTile() {
    if (numSelected) {
        if (this.innerText !== "") return;

        let [r, c] = this.id.split("-").map(Number);

        if (solution[r][c] === numSelected.id) {
            this.innerText = numSelected.id;
        } else {
            errors += 1;
            document.getElementById("errors").innerText = errors;
        }
    }
}

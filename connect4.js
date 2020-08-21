/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const start = document.querySelector('.start');
start.addEventListener('click', newGame);
const gamePlay = document.querySelector('#board');
const gameSpot = document.querySelector('.gameplay');
const reset = document.querySelector('#resetGame');
const instruct = document.querySelector('.instructionsArea');
const load = document.querySelector('.load');
const instructPageButton = document.querySelector('.instructions');
const back = document.querySelector('.istart');

instructPageButton.addEventListener('click', function(){
	window2.classList.add('hide');
	instruct.classList.remove('hide');
	gameSpot.classList.add('hide');
	
})

back.addEventListener('click', function(){
	window2.classList.add('hide');
	instruct.classList.add('hide');
	gameSpot.classList.remove('hide');
	
})

reset.addEventListener('click', function(){
	window2.classList.add('hide');
	instruct.classList.add('hide');
	gameSpot.classList.remove('hide');
	
})



let p1 = '';
let p2 = '';
let agar = '';
let size = '';

let agarchoo = document.querySelectorAll('.agarchoo')
for(let each of agarchoo){
  each.addEventListener('click', function(evt){
    for(let each of agarchoo){
      each.style.background = 'none'
    }
    agar = this.value;
    this.style.backgroundColor = this.value;
  })
}

let p1choo = document.querySelectorAll('.p1choo')
for(let each of p1choo){
  each.addEventListener('click', function(evt){
    for(let each of p1choo){
      each.style.background = 'none'
    }
    p1 = this.value;
    this.style.backgroundColor = this.value;   
  })
}

let p2choo = document.querySelectorAll('.p2choo')
for(let each of p2choo){
  each.addEventListener('click', function(evt){
    for(let each of p2choo){
      each.style.background = 'none'
    }
	p2 = this.value;
    this.style.background = this.value;
  })
}


let sizechoo = document.querySelectorAll('.sizechoo')
for(let each of sizechoo){
  each.addEventListener('click', function(evt){
    for(let each of sizechoo){
      each.style.background = 'none'
    }
    size = this.value;
    this.style.backgroundColor = 'black';
  })
}


let window2 = document.querySelector('.playArea');
let mainStart = document.querySelector('.startGame');
mainStart.addEventListener('click', function(){
    load.classList.remove('hide'); 
    gameSpot.classList.add('hide');
    setTimeout(function() {
    window2.classList.remove('hide');
    load.classList.add('hide'); 
    
    newGame();
  }, 1100);
});


setTimeout


function newGame() {
	gamePlay.innerHTML = '';

	let WIDTH = size;
	let HEIGHT = size;
	let gameOver = 'no';
	let tie = '';
	let noClick = 'no';
	let board = [];

	let currPlayer = 'One'; // active player: 1 or 2

	// array of rows, each row is array of cells  (board[y][x])
	/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

	function makeBoard() {
		// TODO: set "board" to empty HEIGHT x WIDTH matrix array
		for (let i = 0; i <= HEIGHT - 1; i++) {
			board.push([]);
			for (let d = 1; d <= WIDTH; d++) {
				board[i].push(null);
			}
		}
	}

	/** makeHtmlBoard: make HTML table and row of column tops. */

	function makeHtmlBoard() {
		// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    let htmlBoard = document.getElementById('board');

   document.querySelector('#game').style.backgroundColor = agar;

		// TODO: add comment for this code - creating the top row with width and event listener.
		let top = document.createElement('tr');
		top.setAttribute('id', 'column-top');
		top.addEventListener('click', handleClick);

		for (let x = 0; x < WIDTH; x++) {
			let headCell = document.createElement('td');
			headCell.setAttribute('id', x);
			headCell.classList.add('toprow');
			top.append(headCell);
		}
		htmlBoard.append(top);

		// TODO: add comment for this code - create the board with two loops. Give each cell an x and y coordinate.
		for (let y = 0; y < HEIGHT; y++) {
			let row = document.createElement('tr');
			for (let x = 0; x < WIDTH; x++) {
				let cell = document.createElement('td');
				cell.setAttribute('id', `${y}-${x}`);
				row.append(cell);
			}
			htmlBoard.append(row);
		}
	}

	/** findSpotForCol: given column x, return top empty y (null if filled) */

	function findSpotForCol(x) {
		// TODO: write the real version of this, rather than always returning 0
	
		for (let i = HEIGHT - 1; i >= 0; i--) {
			if (board[i][x] == null) {
				board[i][x] = currPlayer;
				return i;
			}
		}
	}

	/** placeInTable: update DOM to place piece into HTML table of board */

	function placeInTable(y, x) {
		// TODO: make a div and insert into correct table cell
		let spot = document.getElementById(`${y}-${x}`);
		let piece = document.createElement('div');
		piece.classList.add('innoc');
		setTimeout(() => {
			piece.classList.add(currPlayer);
			piece.classList.remove('innoc');
      noClick = 'no';
      if(currPlayer === 'One'){
        piece.style.backgroundColor = p1;}
      else{
        piece.style.backgroundColor = p2;
      }
    }, 1500);

		spot.append(piece);
	}

	/** endGame: announce game end */
	function endGame(msg) {
		document.querySelector('#board').innerHTML = `<h1 class="win">Player ${msg} wins!</h1>`
		gameOver = 'yes';
	}

	/** handleClick: handle click of column top to play piece */

	function handleClick(evt) {
		if (noClick == 'yes' || gameOver == 'yes') return;
		

		noClick = 'yes';
		let x = 0;
		// get x from ID of clicked cell
		if(evt != undefined){
			x = +evt.target.id;}

		if(currPlayer == 'Two' && p2 == 'silver'){
			x = Math.floor(Math.random() * WIDTH);
		}
		
			
		

		// get next spot in column (if none, ignore click)
		let y = findSpotForCol(x);
		if (y === null) {
			return;
		}

		// place piece in board and add to HTML table
		// TODO: add line to update in-memory board
		placeInTable(y, x);

		// check for win
		setTimeout(() => {if (checkForWin()) {
      if(currPlayer === 'One'){
        document.querySelector('#game').style.backgroundColor = p1;}
      else{
        document.querySelector('#game').style.backgroundColor = p2;
      }

			return endGame(`${currPlayer}`);
		}}, 1510);

		// check for tie
		// TODO: check if all cells in board are filled; if so call, call endGame

		tie = board[0].every((e) => {
			return e != null;
		});

		if (tie) {
			alert('Tie Game!');
		}

		// switch players
		// TODO: switch currPlayer 1 <-> 2
		function switchPlayers() {
			if (currPlayer == 'One' && p2 != 'silver') {
				currPlayer = 'Two';
			} 
			if(currPlayer == 'One' && p2 == 'silver'){
				currPlayer = 'Two';
				handleClick();
			}
			else {
				currPlayer = 'One';
			}
		}
		setTimeout(() => {switchPlayers()}, 1520);

	}

	/** checkForWin: check board cell-by-cell for "does a win start here?" */

	function checkForWin() {
		function _win(cells) {
			// Check four cells to see if they're all color of current player
			//  - cells: list of four (y, x) cells
			//  - returns true if all are legal coordinates & all match currPlayer

			return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
		}

		// TODO: read and understand this code. Add comments to help you. This code checks in every direction for a four in a row.

		for (let y = 0; y < HEIGHT; y++) {
			for (let x = 0; x < WIDTH; x++) {
				let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
				let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
				let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
				let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

				if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
					return true;
				}
			}
		}
	}

	makeBoard();
	makeHtmlBoard();
}

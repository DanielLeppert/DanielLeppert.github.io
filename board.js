export const TILE_STATUSES = {
    HUMANlow: "humanlow",
    HUMANmedium: "humanmedium",
    HUMANhigh: "humanhigh",
    AIlow: "AIlow",
    AImedium: "AImedium",
    AIhigh: "AIhigh",
    RETIRED: "retired",
  }

export function createBoard(boardSize) {
    
  const board = [] 
  var quality = [1,2,3]
  
    for (let x = 0; x < boardSize; x++) {
      
      const row = []
      
      for (let y = 0; y < boardSize; y++) {

        const element = document.createElement("div") // tile.element
        
        element.dataset.quality = quality[Math.floor(Math.random()*quality.length)]

        if ( y > 4 && element.dataset.quality == 1) {
           element.dataset.status = TILE_STATUSES.AIlow
        }
        if ( y > 4 && element.dataset.quality == 2) {
          element.dataset.status = TILE_STATUSES.AImedium
        }
        if ( y > 4 && element.dataset.quality == 3) {
          element.dataset.status = TILE_STATUSES.AIhigh
        }
        if ( y <= 4 && element.dataset.quality == 1) {
          element.dataset.status = TILE_STATUSES.HUMANlow
        }
        if ( y <= 4 && element.dataset.quality == 2) {
          element.dataset.status = TILE_STATUSES.HUMANmedium
        }
        if ( y <= 4 && element.dataset.quality == 3) {
          element.dataset.status = TILE_STATUSES.HUMANhigh
        }
        
        const tile = {
          element,
          x,
          y,
          get status() {
            return this.element.dataset.status
          },
          set status(value) {
            this.element.dataset.status = value
          },
        }
  
        row.push(tile)
      }
      board.push(row)
    }
  
    return board
  }


  export function markTile(tile) {
    if ( 
      tile.status === TILE_STATUSES.HUMANlow ||
      tile.status === TILE_STATUSES.HUMANmedium ||
      tile.status === TILE_STATUSES.HUMANhigh  
      ) 
      { 
        tile.status = TILE_STATUSES.RETIRED
      }
      
  }

 // need to fix this to only count connected tiles
 export function bonusCount(board, player) {

  let count = 0
  var dir_x = [1, 0, -1, 0]
  var dir_y = [0, 1, 0, -1]
  
  var visited = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]
  
  for (let x = 0; x < 10; x++) {
 
    for (let y = 0; y < 10; y++) {

      if (board[x][y].status === TILE_STATUSES.RETIRED) 
      {
             
        for (let neighbor = 0; neighbor < 4; neighbor++ ) {

          if (x + dir_x[neighbor] < 0 || y + dir_y[neighbor] < 0 ||
            x + dir_x[neighbor] > 9 || y + dir_y[neighbor] > 9)
            {
              continue;
            }
            if (board[x + dir_x[neighbor]][y + dir_y[neighbor]].status === TILE_STATUSES.RETIRED &&
              visited[x + dir_x[neighbor]][y + dir_y[neighbor]] != 1) {  // if neighbor is retired, add count +1
							
	      visited[x + dir_x[neighbor]][y + dir_y[neighbor]] = 1;
              count++;
              }
          
        } 
      } 
    }
  }
  return count;
 }


 

 export function yieldCount(board) {
  
  var Yields = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]
  
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (board[x][y].status === TILE_STATUSES.HUMANlow ||
        board[x][y].status === TILE_STATUSES.AIlow ) {
      Yields[x][y] = 1
      }
      if (board[x][y].status === TILE_STATUSES.HUMANmedium ||
          board[x][y].status === TILE_STATUSES.AImedium ) {
      Yields[x][y] = 2
      }
      if (board[x][y].status === TILE_STATUSES.HUMANhigh ||
        board[x][y].status === TILE_STATUSES.AIhigh) {
        Yields[x][y] = 3
      }
      else {
        Yields[x][y] = 0
      }
    }
  }
 
  var count = 0
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      count = count + Yields[x][y]
    }
  }
  return count
 }



 export function AImax(board) {

  var Profits = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
  ]

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {

      var _board = JSON.parse(JSON.stringify(board));

      _board[x][y].status = TILE_STATUSES.RETIRED

      Profits[x][y] = bonusCount(_board) + yieldCount(_board) 
    
    }
  }
  console.log(Profits)
  var maxProfit = bonusCount(board) + yieldCount(board)
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (Profits[x][y] >= maxProfit && x > 4) {

        maxProfit = Profits[x][y]
        var x_coord = x
        var y_coord = y
      
      }
    }
  }
  console.log(maxProfit)
  board[x_coord][y_coord].status = TILE_STATUSES.RETIRED

}

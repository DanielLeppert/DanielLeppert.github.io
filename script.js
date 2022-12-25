import {createBoard, markTile, bonusCount, yieldCount, AImax} from "./board.js"

const BOARD_SIZE = 10

const board = createBoard(BOARD_SIZE)
const boardElement = document.querySelector(".board")
const bonusText = document.querySelector("[data-bonus-count]")

board.forEach(row => {
    row.forEach(tile => {
      bonusText.textContent = yieldCount(board, 1)
      boardElement.append(tile.element)
      tile.element.addEventListener("click", () => {
        markTile(board, tile)
        bonusText.textContent = yieldCount(board, 1) + bonusCount(board, 1)
      })
      tile.element.addEventListener("contextmenu", e => {
        e.preventDefault()
        markTile(tile)
        bonusText.textContent = yieldCount(board, 1) + bonusCount(board, 1)
        AImax(board)        
      })
    })
  })
  boardElement.style.setProperty("--size", BOARD_SIZE)
  
  


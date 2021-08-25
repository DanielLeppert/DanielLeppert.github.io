import {createBoard, markTile, bonusCount, yieldCount, AImax} from "./board.js"

const BOARD_SIZE = 10

const board = createBoard(BOARD_SIZE)
const boardElement = document.querySelector(".board")
const bonusText = document.querySelector("[data-bonus-count]")

board.forEach(row => {
    row.forEach(tile => {
      bonusText.textContent = yieldCount(board)
      boardElement.append(tile.element)
      tile.element.addEventListener("touchstart", () => {
        markTile(board, tile)
      })
      tile.element.addEventListener("contextmenu", e => {
        e.preventDefault()
        markTile(tile)
        AImax(board)
        bonusText.textContent = yieldCount(board) + bonusCount(board)
      })
    })
  })
  boardElement.style.setProperty("--size", BOARD_SIZE)
  
  


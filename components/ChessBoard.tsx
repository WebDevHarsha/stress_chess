"use client"

import { useState, useMemo } from "react"
import {ChessPiece} from "./ChessPiece"

const initialBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill(""),
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
]

export default function ChessBoard() {
  const [board, setBoard] = useState(initialBoard)
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null)
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)

  const getPossibleMoves = (row: number, col: number) => {
    const piece = board[row][col]
    const isWhite = piece === piece.toUpperCase()
    const moves: [number, number][] = []

    type PieceType = 'p' | 'r' | 'n' | 'b' | 'q' | 'k';
    const directions: Record<PieceType, number[][]> = {
      'p': isWhite ? [[-1, 0]] : [[1, 0]],
      'r': [[0, 1], [0, -1], [1, 0], [-1, 0]],
      'n': [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]],
      'b': [[1, 1], [1, -1], [-1, 1], [-1, -1]],
      'q': [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]],
      'k': [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]
    }
    const pieceDirections = directions[piece.toLowerCase() as PieceType]
    if (pieceDirections) {
      pieceDirections.forEach(([dx, dy]) => {
        const newRow = row + dx
        const newCol = col + dy
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          const targetPiece = board[newRow][newCol]
          if (!targetPiece || (targetPiece.toUpperCase() === targetPiece) !== isWhite) {
            moves.push([newRow, newCol])
          }
        }
      })
    }

    return moves
  }

  const availableMoveCards = useMemo(() => {
    const whitePieces: string[] = []
    const blackPieces: string[] = []

    board.forEach((row, rowIndex) => {
      row.forEach((piece, colIndex) => {
        const isWhitePiece = piece === piece.toUpperCase()
        const possibleMoves = getPossibleMoves(rowIndex, colIndex)

        if (possibleMoves.length > 0) {
          if (isWhitePiece && !whitePieces.includes(piece) && whitePieces.length < 3) {
            whitePieces.push(piece)
          } else if (!isWhitePiece && !blackPieces.includes(piece) && blackPieces.length < 3) {
            blackPieces.push(piece)
          }
        }
      })
    })

    return { whitePieces, blackPieces }
  }, [board])

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      const [selectedRow, selectedCol] = selectedPiece
      // const piece = board[selectedRow][selectedCol]
      const possibleMoves = getPossibleMoves(selectedRow, selectedCol)
      
      const isValidMove = possibleMoves.some(
        ([moveRow, moveCol]) => moveRow === row && moveCol === col
      )

      if (isValidMove) {
        const newBoard = board.map((row) => [...row])
        newBoard[row][col] = newBoard[selectedRow][selectedCol]
        newBoard[selectedRow][selectedCol] = ""
        setBoard(newBoard)
        setIsWhiteTurn(!isWhiteTurn)
      }
      
      setSelectedPiece(null)
    } else {
      const piece = board[row][col]
      const isWhitePiece = piece === piece.toUpperCase()
      
      const availableCards = isWhiteTurn ? availableMoveCards.whitePieces : availableMoveCards.blackPieces
      
      if (isWhitePiece === isWhiteTurn && availableCards.includes(piece)) {
        setSelectedPiece([row, col])
      }
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-4">
        <div>
          <h2 className="text-xl">Black Move Cards</h2>
          <div className="flex gap-2">
            {availableMoveCards.blackPieces.map((piece) => (
              <div key={piece} className="text-4xl">
                <ChessPiece piece={piece} />
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl">White Move Cards</h2>
          <div className="flex gap-2">
            {availableMoveCards.whitePieces.map((piece) => (
              <div key={piece} className="text-4xl">
                <ChessPiece piece={piece} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-0 border-4 border-gray-800 max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw]">
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square flex items-center justify-center cursor-pointer
                ${(rowIndex + colIndex) % 2 === 0 ? "bg-gray-200" : "bg-gray-400"}
                ${selectedPiece && selectedPiece[0] === rowIndex && selectedPiece[1] === colIndex ? "bg-yellow-200" : ""}
              `}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {piece && <ChessPiece piece={piece} />}
            </div>
          )),
        )}
      </div>
    </div>
  )
}
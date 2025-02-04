import { MoveCard } from "./types"

export const generateRandomCard = (pieces: string[]): MoveCard => {
    const randomPiece = pieces[Math.floor(Math.random() * pieces.length)]
    return {
      piece: randomPiece,
      id: Math.random().toString(36).substr(2, 9)
    }
  }
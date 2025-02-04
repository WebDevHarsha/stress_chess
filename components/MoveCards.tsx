import React from 'react'
import { MoveCard } from './types'
import { pieceUnicode } from "./ChessPiece"


interface MoveCardsProps {
  cards: MoveCard[]
  isWhite: boolean
  onCardSelect: (card: MoveCard) => void
  selectedCard: MoveCard | null
}

export default function MoveCards({ cards, isWhite, onCardSelect, selectedCard }: MoveCardsProps) {
  return (
    <div className="flex gap-4 my-4">
      {cards.map((card) => (
        <button
          key={card.id}
          onClick={() => onCardSelect(card)}
          className={`p-4 rounded-lg border-2 ${
            isWhite ? 'border-white bg-gray-700' : 'border-black bg-gray-300'
          } ${selectedCard?.id === card.id ? 'ring-2 ring-yellow-400' : ''}`}
        >
          <div className={`text-4xl ${isWhite ? 'text-white' : 'text-black'}`}>
            {pieceUnicode[card.piece]}
          </div>
        </button>
      ))}
    </div>
  )
}

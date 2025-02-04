interface ChessPieceProps {
  piece: string
}
const pieceUnicode: { [key: string]: string } = {
  k: "♔",
  q: "♕",
  r: "♖",
  b: "♗",
  n: "♘",
  p: "♙",
  K: "♚",
  Q: "♛",
  R: "♜",
  B: "♝",
  N: "♞",
  P: "♟",
}

function ChessPiece({ piece }: ChessPieceProps) {
  return (
    <div className={`text-2xl sm:text-3xl md:text-4xl ${piece.toUpperCase() === piece ? "text-white" : "text-black"}`}>
      {pieceUnicode[piece]}
    </div>
  )
}
export { pieceUnicode, ChessPiece };

import ChessBoard from "../components/ChessBoard"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-24">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8">No Stress Chess</h1>
      <ChessBoard />
    </main>
  )
}
import "./App.css";

import Table from "./components/table";
import Deck from "./components/deck";

function App() {
  // const deck1 = [
  //   {
  //     suit: "spades",
  //     value: "J",
  //   },
  //   {
  //     suit: "spades",
  //     value: "10",
  //   },
  //   {
  //     suit: "spades",
  //     value: "9",
  //   },
  //   {
  //     suit: "spades",
  //     value: "8",
  //   },
  //   {
  //     suit: "spades",
  //     value: "7",
  //   },
  //   {
  //     suit: "spades",
  //     value: "6",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "A",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "K",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "Q",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "J",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "10",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "9",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "8",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "7",
  //   },
  //   {
  //     suit: "hearts",
  //     value: "6",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "A",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "K",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "Q",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "J",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "10",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "9",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "6",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "A",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "K",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "Q",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "J",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "10",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "9",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "6",
  //   },
  // ];

  // const community = [
  //   {
  //     suit: "spades",
  //     value: "A",
  //   },
  //   {
  //     suit: "diamonds",
  //     value: "K",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "Q",
  //   },
  // ];

  // const player1 = [
  //   {
  //     suit: "diamonds",
  //     value: "8",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "8",
  //   },
  // ];

  // const player2 = [
  //   {
  //     suit: "diamonds",
  //     value: "7",
  //   },
  //   {
  //     suit: "clubs",
  //     value: "7",
  //   },
  // ];

  // const a = getHandStrength(hand);
  // const a1 = getHandStrength(hand2);
  // const a2 = getCombinations(hand2, 5);
  // const bestHand = Comparisons.whoWins(hand, [player1, player2, player3]);
  // console.log(a2);
  // console.log(bestHand);
  // const a = getResult(deck1, community, [player1, player2]);
  // console.log(a);
  return (
    // <div className="w-[90%] mx-auto max-w-3xl min-h-screen">
    <div className="min-h-screen flex p-5">
      <div className="w-4/5 h-full flex flex-col">
        <div className="h-1/2">
          <Table />
        </div>
        <div className="h-1/2"></div>
      </div>
      <div className="w-1/5 flex flex-col bg-white   rounded-lg">
        <Deck />
      </div>
    </div>
  );
}

export default App;

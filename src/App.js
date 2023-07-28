import "./styles.css";
import GridField from "../components/GridField/GridField";
import Hand from "../components/Hand/Hand";
import { useEffect, useState } from "react";

export default function App() {
  function generateDeck() {
    const colors = ["red", "green", "yellow", "red"];
    const shapes = ["square", "cicle", "triangle", "cross"];
    const numbers = [1, 2, 3, 4];
    const deck = [];
    let count = 0;
    for (let color of colors) {
      for (let shape of shapes) {
        for (let number of numbers) {
          deck.push({
            card: { color: color, shape: shape, number: number },
            position: {},
            id: count
          });
          count++;
        }
      }
    }
    return deck;
  }

  function pickOne(deck) {
    let draw = {};
    let index = Math.floor(Math.random() * deck.length);
    draw = deck[index];
    deck.splice(index, 1);
    console.log(deck.lengt);
    return draw;
  }
  function shuffleDeck(deck) {
    const shuffledDeck = [];
    while (deck.length > 0) {
      shuffledDeck.push(pickOne(deck));
    }
    console.log(deck, "shuffle");
    return shuffledDeck;
  }
  function dealHand(hand, deck) {
    const newDeck = [...deck];
    const inHand = [...hand];
    while (inHand.lengt < 4) {
      inHand.push(pickOne(newDeck));
    }
    return { newDeck, inHand };
  }
  const initialHand = [
    { color: "blue", shape: "cross", number: 4 },
    { color: "green", shape: "square", number: 4 },
    { color: "yellow", shape: "circle", number: 2 },
    { color: "red", shape: "triangle", number: 1 }
  ];

  const [hand, setHand] = useState([]);
  const [select, setSelect] = useState();
  const [deck, setDeck] = useState([]);
  useEffect(() => {
    const deckGenerated = generateDeck();
    setDeck(shuffleDeck(deckGenerated));
    setHand(initialHand);
  }, []);

  useEffect(() => {
    // const onable = dealHand(hand, deck);
    // setHand(.inHand);
  }, []);
  // console.log(deck, "deck");

  return (
    <div className="App">
      <h1>Title</h1>
      <div className="Page">
        <div className="GameBoard">
          {/* <Tali/> */}
          <div className={"Tali"}>Tali</div>
          <GridField className={"Grid"} newCard={select} />
          <Hand hand={hand} select={setSelect} />
        </div>
      </div>
    </div>
  );
}

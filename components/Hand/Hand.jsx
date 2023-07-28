import { useState } from "react";
import Card from "../GridField/Card/Card";
import "../Hand/Hand.css";
import "../GridField/Card/Card.css";
import "../GridField/Card/CardFace.css";

export default function ({ hand, select }) {
  const inHand = true;
  // const [selected, setSelected] = useState(false);

  return (
    <div className={"Hand"}>
      {hand.map((card, i) => {
        let cell = { card: card };
        return (
          <div
            // className={selected ? "select" : ""}
            key={"H" + i}
            onClick={() => {
              select(card);
            }}
          >
            <div>
              <Card
                className={`Card, ${card.color}, ${card.shape}`}
                props={{ cell, inHand }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

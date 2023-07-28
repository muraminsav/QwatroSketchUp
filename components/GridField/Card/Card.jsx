import { useEffect, useState } from "react";
import "./Card.css";
import "./CardFace.css";

export default function Card({ props }) {
  const { cell, expandGrid, newCard, inHand } = props;
  const [select, setSelect] = useState(false);

  if (typeof cell.card === "boolean") {
    // console.log("bool", cell.card);
    return cell.card ? (
      <div
        className={"Gridl, Avaible"}
        onClick={() => {
          if (newCard === undefined) {
            return;
          }
          inHand || expandGrid(cell, newCard);
        }}
      ></div>
    ) : (
      <div className="Gridl"></div>
    );
  } else {
    return (
      <div
        className={"Card"}
        style={{ position: "relative" }}
        onClick={() => {
          inHand && setSelect(true);
        }}
      >
        <div className={`${select ? "select" : ""}`}></div>
        <div style={{ position: "absolute" }}>{cell.card.number}</div>
        <div className={`${cell.card.shape} ${cell.card.color} `}></div>
      </div>
    );
  }
}

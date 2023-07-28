import { useState, useEffect, useRef } from "react";
import { Grid, Col, Row } from "react-flexbox-grid";
import "./GridField.css";
import Card from "./Card/Card";

const ancore = {
  card: { color: "blue", shape: "triangle", number: 2 },
  position: {}
};
const grid = [
  [{ card: false }, { card: true }, { card: false }],
  [{ card: true }, ancore, { card: true }],
  [{ card: false }, { card: true }, { card: false }]
];
export default function GridField({ newCard }) {
  const [gameGrid, setGameGrid] = useState([]);

  function remapGrid(unmapedGrid) {
    for (let r = 0; r <= unmapedGrid.length - 1; r++) {
      for (let c = 0; c <= unmapedGrid[0].length - 1; c++) {
        if (typeof unmapedGrid[r][c].card === "object") {
          continue;
        }
        if (
          (r === 0 && c === 0) ||
          (r === 0 && c === unmapedGrid[0].length - 1) ||
          (r === unmapedGrid.length - 1 && c === 0) ||
          (r === unmapedGrid.length - 1 && c === unmapedGrid[0].length - 1)
        ) {
          continue;
        }
        if (r === 0 || c === 0) {
          if (
            typeof unmapedGrid[r + 1][c].card === "object" ||
            typeof unmapedGrid[r][c + 1].card === "object"
          ) {
            unmapedGrid[r][c] = { card: true };
          }
        } else if (
          r === unmapedGrid.length - 1 ||
          c === unmapedGrid[0].length - 1
        ) {
          if (
            typeof unmapedGrid[r - 1][c].card === "object" ||
            typeof unmapedGrid[r][c - 1].card === "object"
          ) {
            unmapedGrid[r][c] = { card: true };
          }
        } else if (
          typeof unmapedGrid[r - 1][c].card === "object" ||
          typeof unmapedGrid[r][c - 1].card === "object" ||
          typeof unmapedGrid[r + 1][c].card === "object" ||
          typeof unmapedGrid[r][c + 1].card === "object"
        ) {
          unmapedGrid[r][c] = { card: true };
        }
      }
    }
    console.log(unmapedGrid, "remappper");
  }

  function expandGrid(cell, newCard) {
    const { position } = cell;
    const grid = [...gameGrid];
    grid[position.row][position.col].card = newCard;

    if (position.col === 0) {
      grid.forEach((row) => row.unshift({ card: false }));
    }
    if (position.col === grid[0].length - 1) {
      grid.forEach((row) => row.push({ card: false }));
    }
    if (position.row === 0) {
      grid.unshift(Array(grid[0].length).fill({ card: false }));
    }
    if (position.row === grid.length - 1) {
      grid.push(Array(grid[0].length).fill({ card: false }));
    }
    remapGrid(grid);
    setGameGrid([...grid]);
  }

  useEffect(() => {
    setGameGrid([...grid]);
  }, []);

  return (
    <Grid className={"Grid"}>
      {gameGrid.map((row, i) => {
        return (
          <Row key={i} style={{ flexWrap: "nowrap" }}>
            {row.map((cell, j) => {
              cell.position = { row: i, col: j };

              return (
                <Col key={j}>
                  <Card props={{ cell, expandGrid, newCard }}></Card>
                </Col>
              );
            })}
          </Row>
        );
      })}
    </Grid>
  );
}

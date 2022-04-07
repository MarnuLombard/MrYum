import React, { useEffect, useState } from 'react';
import { ToyRobot } from '../robot/toy-robot';
import { Position } from '../robot/position';
import { Tile } from './Tile';
import { Direction, TurningDirection } from '../types/direction';

export function App() {
  // Create one row of count 5.
  // Reversed so that we go from 4 -> 0
  const rowTiles = [...Array(5).keys()].reverse();
  // Create one row of count 5.
  const columnTiles = [...Array(5).keys()];
  const [robot, updateRobot] = useState(new ToyRobot());

  const [tileVisible, setTileVisible] = useState('');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(Direction.NORTH);

  function move() {
    const newRobot = robot.move();
    updateRobot(newRobot);
    const { y: y1, x: x1 } = newRobot.position as Position;
    setX(x1);
    setY(y1);
  }

  useEffect(() => {
    setTimeout(() => setTileVisible('visible'), 500);
  }, []);

  return (
    <div className="container full_height">
      <div className="wrapper">
        <p>
          {robot.report()}
        </p>
        <button type="button" onClick={() => updateRobot(robot.turn(TurningDirection.LEFT))}>Left</button>
        <button type="button" onClick={move}>Move</button>
        <button type="button" onClick={() => updateRobot(robot.turn(TurningDirection.RIGHT))}>Right</button>
        <input type="number" value={x} onChange={(e) => setX(Number(e.target.value))} />
        <input type="number" value={y} onChange={(e) => setY(Number(e.target.value))} />
        <select value={direction} onChange={(e) => setDirection(e.target.value as Direction)}>
          {
            Object.entries(Direction)
              .map(([key, value]) => <option key={key} value={value}>{value}</option>)
          }
        </select>
        <button type="button" onClick={() => updateRobot(robot.place(x, y, direction))}>Place</button>
        <div className="board">
          { rowTiles.map((rowTile) => (
            <div key={rowTile} className="tile_row">
              { columnTiles.map((tile) => (
                <Tile
                  key={`${rowTile}:${tile}`}
                  tileVisible={tileVisible}
                  row={rowTile}
                  column={tile}
                  position={robot.position}
                />
              ))}
            </div>
          )) }
        </div>
      </div>
    </div>
  );
}

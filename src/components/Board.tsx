import './Board.scss';
import React, { useEffect, useState } from 'react';
import { ToyRobot } from '../robot/toy-robot';
import { Tile } from './Tile';

type Params = {
  robot: ToyRobot,
}

export function Board({ robot }: Params) {
  // Create one row of count 5.
  // Reversed so that we go from 4 -> 0
  const rowTiles = [...Array(5).keys()].reverse();
  // Create one row of count 5.
  const columnTiles = [...Array(5).keys()];
  const [tileVisible, setTileVisible] = useState('');

  useEffect(() => {
    setTimeout(() => setTileVisible('visible'), 800);
  }, [tileVisible]);

  return (
    <div className="board" data-testid="board">
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
  );
}

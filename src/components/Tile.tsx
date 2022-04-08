import React from 'react';
import { Direction } from 'types/direction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUp, faArrowRight, faArrowDown, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { Position } from '../robot/position';

type Props = {
  tileVisible: string,
  row: number,
  column: number,
  position: Position|undefined
}

export function Tile({
  tileVisible, row, column, position,
}: Props): React.ReactElement {
  const { x, y, direction } = position || {};
  const isActive = y === row && x === column;

  if (!position || !isActive) {
    return <div className={`tile ${tileVisible}`} />;
  }
  let icon = faArrowUp;
  switch (direction) {
    case Direction.EAST:
      icon = faArrowRight;
      break;
    case Direction.SOUTH:
      icon = faArrowDown;
      break;
    case Direction.WEST:
      icon = faArrowLeft;
      break;
    default:
      break;
  }
  return (
    <div data-testid={isActive && 'active'} className={`tile ${tileVisible} ${isActive ? 'active' : null}`}>
      <FontAwesomeIcon className="icon" icon={icon} />
    </div>
  );
}

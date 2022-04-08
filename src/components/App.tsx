import './App.scss';
import React, { useState } from 'react';
import { ToyRobot } from 'robot/toy-robot';
import { Position } from 'robot/position';
import { Direction, TurningDirection } from 'types/direction';
import { Board } from 'components/Board';
import {
  faArrowsToDot, faArrowUpRightDots, faRotateLeft, faRotateRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function App() {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [direction, setDirection] = useState<Direction>(Direction.NORTH);
  const [robot, updateRobot] = useState(new ToyRobot());

  function move() {
    const newRobot = robot.move();
    updateRobot(newRobot);
    const { y: y1, x: x1 } = newRobot.position as Position;
    setX(x1);
    setY(y1);
  }

  return (
    <>
      <div className="header">
        <h1>ToyRobot</h1>
      </div>
      <div className="container">
        <div className="wrapper">
          <p>
            {
              robot.report() || <em className="text--light">Place me first</em>
            }
          </p>
          <button
            className="button button--move button--icon_right"
            type="button"
            onClick={move}
          >
            Move
            <FontAwesomeIcon className="icon" icon={faArrowUpRightDots} />
          </button>
          <button
            type="button"
            className="button button--left button--icon_left"
            onClick={() => updateRobot(robot.turn(TurningDirection.LEFT))}
          >
            <FontAwesomeIcon className="icon" icon={faRotateLeft} />
            Left
          </button>

          <div className="board__wrapper">
            <Board robot={robot} />
          </div>

          <button
            className="button button--right button--icon_right"
            type="button"
            onClick={() => updateRobot(robot.turn(TurningDirection.RIGHT))}
          >
            Right
            <FontAwesomeIcon className="icon" icon={faRotateRight} />
          </button>

          <div className="placers__input">
            <label htmlFor="x_input">
              X
              <input
                className="input input--number"
                type="number"
                name="x_input"
                value={x}
                min="0"
                data-testid="x"
                onChange={(e) => setX(Number(e.target.value))}
              />
            </label>
            <label htmlFor="y_input">
              Y
              <input
                className="input input--number"
                type="number"
                name="y_input"
                value={y}
                min="0"
                data-testid="y"
                onChange={(e) => setY(Number(e.target.value))}
              />
            </label>
            <select
              className="input input--select"
              value={direction}
              data-testid="direction"
              onChange={(e) => setDirection(e.target.value as Direction)}
            >
              {
                Object.entries(Direction)
                  .map(([key, value]) => <option key={key} value={value}>{value}</option>)
              }
            </select>
            <button
              className="button button--place button--icon_right"
              type="button"
              onClick={() => updateRobot(robot.place(x, y, direction))}
            >
              Place
              <FontAwesomeIcon bounce={!robot.position} className="icon" icon={faArrowsToDot} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

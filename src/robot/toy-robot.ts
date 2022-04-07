import { Position } from 'robot/position';
import { Direction, TurningDirection } from 'types/direction';

export class ToyRobot {
  public position?: Position;

  place(x: number, y: number, direction: Direction) : ToyRobot {
    const robot = new ToyRobot();
    robot.position = Position.place(x, y, direction);

    return robot;
  }

  report(): string {
    if (!this.position) {
      return '';
    }

    const { x, y, direction } = this.position;
    const directionName = Direction[direction];

    return `${x},${y},${directionName}`;
  }

  move(): ToyRobot {
    if (this.position) {
      const { x, y, direction } = this.position;
      const robot = this.place(x, y, direction);
      robot.position?.move();

      return robot;
    }

    return this;
  }

  turn(turnDirection: TurningDirection): ToyRobot {
    if (this.position) {
      const { x, y, direction } = this.position;
      const robot = this.place(x, y, direction);
      robot.position?.turn(turnDirection);

      return robot;
    }

    return this;
  }
}

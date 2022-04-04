import { Position } from '@/robot/position';
import { Direction, TurningDirection } from '@/types/direction';

export class ToyRobot {
  private position?: Position;

  place(x: number, y: number, direction: Direction) : ToyRobot {
    this.position = Position.place(x, y, direction);

    return this;
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
      this.position.move();
    }

    return this;
  }

  turn(turnDirection: TurningDirection): ToyRobot {
    if (this.position) {
      this.position.turn(turnDirection);
    }

    return this;
  }
}

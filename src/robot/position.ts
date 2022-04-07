import { Direction, TurningDirection } from 'types/direction';

interface Next {
  increment: 1|-1;
  plane: 'x'|'y';
  [TurningDirection.LEFT]: Direction,
  [TurningDirection.RIGHT]: Direction,
}

const directionMap: Record<Direction, Next> = {
  [Direction.NORTH]: {
    increment: 1,
    plane: 'y',
    [TurningDirection.LEFT]: Direction.WEST,
    [TurningDirection.RIGHT]: Direction.EAST,
  },
  [Direction.EAST]: {
    increment: 1,
    plane: 'x',
    [TurningDirection.LEFT]: Direction.NORTH,
    [TurningDirection.RIGHT]: Direction.SOUTH,
  },
  [Direction.SOUTH]: {
    increment: -1,
    plane: 'y',
    [TurningDirection.LEFT]: Direction.EAST,
    [TurningDirection.RIGHT]: Direction.WEST,
  },
  [Direction.WEST]: {
    increment: -1,
    plane: 'x',
    [TurningDirection.LEFT]: Direction.SOUTH,
    [TurningDirection.RIGHT]: Direction.NORTH,
  },
};

export class Position {
  public x: number;

  public y: number;

  /**
   * Use the named static constructor in the form of `Position.place()`
   * that method ensures a level of immutability as it returns a new instance.
   */
  private constructor(x: number, y: number, public direction: Direction, public next: Next) {
    this.x = this.clampPosition(x);
    this.y = this.clampPosition(y);
  }

  static place(x: number, y: number, direction: Direction): Position {
    const next = directionMap[direction];

    return new Position(x, y, direction, next);
  }

  turn(turningDirection: TurningDirection) {
    const direction = this.next[turningDirection];

    this.next = directionMap[direction];
    this.direction = direction;
  }

  move() {
    const { plane, increment } = this.next;

    this[plane] = this.clampPosition(this[plane] + increment);
  }

  private clampPosition(position: number): number {
    // The board only has 5 tiles in any direction
    return Math.max(
      Math.min(position, 4),
      0,
    );
  }
}

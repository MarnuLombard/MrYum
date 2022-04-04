import { describe, expect, test } from '@jest/globals';
import { Position } from '@/robot/position';
import { Direction, TurningDirection } from '@/types/direction';

const { LEFT, RIGHT } = TurningDirection;
const {
  NORTH, EAST, SOUTH, WEST,
} = Direction;

describe('Position state tracking and updating', () => {
  test('It should maintain state', () => {
    const x = 1;
    const y = 2;
    const direction = WEST;
    const position = Position.place(x, y, direction);

    expect(position.x).toBe(x);
    expect(position.y).toBe(y);
    expect(position.direction).toBe(direction);
  });
  test('It composes next state correctly', () => {
    const x = 4;
    const y = 2;
    const position = Position.place(x, y, NORTH);

    const { next } = position;
    expect(next.plane).toBe('y');
    expect(next.increment).toBe(1);
    expect(next[LEFT]).toBe(WEST);
    expect(next[RIGHT]).toBe(EAST);
  });
  test('It can\'t be placed off the board', () => {
    const position1 = Position.place(5, 6, EAST);
    const position2 = Position.place(-2, -7, EAST);

    expect(position1.x).toBe(4);
    expect(position1.y).toBe(4);
    expect(position2.x).toBe(0);
    expect(position2.y).toBe(0);
  });

  describe('It moves forward by one block', () => {
    const position = Position.place(0, 0, NORTH);
    position.move();

    expect(position.x).toBe(0);
    expect(position.y).toBe(1);

    position.move();
    expect(position.x).toBe(0);
    expect(position.y).toBe(2);
  });

  describe('It can\'t fall off the board', () => {
    const position = Position.place(4, 4, EAST);

    expect(position.x).toBe(4);
    expect(position.y).toBe(4);

    position.move();
    expect(position.x).toBe(4);
    expect(position.y).toBe(4);
  });

  describe('It can be turned left and right', () => {
    const position = Position.place(1, 3, NORTH);

    expect(position.direction).toBe(NORTH);

    position.turn(RIGHT);
    expect(position.direction).toBe(EAST);
    position.turn(RIGHT);
    expect(position.direction).toBe(SOUTH);
    position.turn(RIGHT);
    expect(position.direction).toBe(WEST);
    position.turn(RIGHT);
    expect(position.direction).toBe(NORTH);

    position.turn(LEFT);
    expect(position.direction).toBe(WEST);
    position.turn(LEFT);
    expect(position.direction).toBe(SOUTH);
    position.turn(LEFT);
    expect(position.direction).toBe(EAST);
    position.turn(LEFT);
    expect(position.direction).toBe(NORTH);
  });
});

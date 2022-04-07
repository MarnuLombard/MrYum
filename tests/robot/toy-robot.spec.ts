import { describe, expect, test } from '@jest/globals';
import { Direction, TurningDirection } from 'types/direction';
import { ToyRobot } from 'robot/toy-robot';

const { NORTH, SOUTH } = Direction;
const { LEFT } = TurningDirection;

describe('Toy Robot Movement and Reporting', () => {
  test('It only reports after being placed', () => {
    let toyRobot = new ToyRobot();

    expect(toyRobot.report()).toBe('');

    toyRobot = toyRobot.place(0, 0, NORTH);
    expect(toyRobot.report()).toBe('0,0,NORTH');

    toyRobot = toyRobot.place(3, 4, SOUTH);
    expect(toyRobot.report()).toBe('3,4,SOUTH');
  });

  test('It ensures methods are fluent', () => {
    const toyRobot = new ToyRobot().place(0, 0, SOUTH);

    expect(toyRobot).toBe(toyRobot);
    expect(toyRobot.move()).toBeInstanceOf(ToyRobot);
    expect(toyRobot.turn(LEFT)).toBeInstanceOf(ToyRobot);
  });

  test('It ensures methods are immutable', () => {
    const toyRobot = new ToyRobot();

    const toyRobot1 = toyRobot.place(0, 0, SOUTH);
    expect(toyRobot1).not.toBe(toyRobot);

    const toyRobot2 = toyRobot1.move();
    expect(toyRobot2).not.toBe(toyRobot1);

    const toyRobot3 = toyRobot2.turn(LEFT);
    expect(toyRobot3).not.toBe(toyRobot2);
  });
});

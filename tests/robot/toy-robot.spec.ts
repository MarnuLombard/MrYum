import { describe, expect, test } from '@jest/globals';
import { Direction, TurningDirection } from '@/types/direction';
import { ToyRobot } from '@/robot/toy-robot';

const { NORTH, SOUTH } = Direction;
const { LEFT } = TurningDirection;

describe('Toy Robot Movement and Reporting', () => {
  test('It only reports after being placed', () => {
    const toyRobot = new ToyRobot();

    expect(toyRobot.report()).toBe('');

    toyRobot.place(0, 0, NORTH);
    expect(toyRobot.report()).toBe('0,0,NORTH');

    toyRobot.place(3, 4, SOUTH);
    expect(toyRobot.report()).toBe('3,4,SOUTH');
  });

  test('It ensures methods are fluent', () => {
    const toyRobot = new ToyRobot().place(0, 0, SOUTH);

    expect(toyRobot).toBe(toyRobot);
    expect(toyRobot.move()).toBe(toyRobot);
    expect(toyRobot.turn(LEFT)).toBe(toyRobot);
  });
});

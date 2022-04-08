import * as fs from 'fs';
import chalk from 'chalk';
import { ToyRobot } from 'robot/toy-robot';
import { Direction, TurningDirection } from 'types/direction';

/**
 * Split out the params when they contain a ','
 */
function splitParams(params: string[]): string[] {
  return params.reduce((paramList: string[], newParams: string) => {
    return paramList.concat(...newParams.split(','));
  }, []);
}

/**
 * My initial approach was to make the call to the method and the params dynamic
 * I found though that I was fighting against typescript and obfuscating a lot of the logic.
 * Because `action` has such a limited set of valid values, I've made the logic very explicit
 */
// eslint-disable-next-line consistent-return
function runCommand(robot: ToyRobot, line: string): ToyRobot {
  const [command, ...params] = line.split(' ');
  switch (command) {
    case 'PLACE':
      // Validation of input could be here
      return robot.place(...splitParams(params) as unknown as [number, number, Direction]);
    case 'MOVE':
      return robot.move();
    case 'LEFT':
      return robot.turn(TurningDirection.LEFT);
    case 'RIGHT':
      return robot.turn(TurningDirection.RIGHT);
    case 'REPORT':
      console.log(chalk.cyanBright(robot.report()));
      process.exit(0);
    // eslint-disable-next-line no-fallthrough
    default:
      console.error(chalk.bgRed(`${command} is not a command action name`));
      process.exit(1);
  }
}

fs.readFile('./commands.txt', (err, data) => {
  if (err) {
    console.error(chalk.bgRedBright(err.message));
    process.exit(Number(err.code));
  }

  const commands: string[] = data.toString()
    .split('\n')
    .filter((line) => line.length);

  commands.reduce((robot: ToyRobot, line) => runCommand(robot, line), new ToyRobot());
});

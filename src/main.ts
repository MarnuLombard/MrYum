import * as fs from 'fs';
import chalk from 'chalk';
import { ToyRobot } from '@/robot/toy-robot';
import { Direction, TurningDirection } from '@/types/direction';

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
function runCommand(robot: ToyRobot, line: string): void {
  const [command, ...params] = line.split(' ');
  switch (command) {
    case 'PLACE':
      // Validation of input could be here
      robot.place(...splitParams(params) as unknown as [number, number, Direction]);
      break;
    case 'MOVE':
      robot.move();
      break;
    case 'LEFT':
      robot.turn(TurningDirection.LEFT);
      break;
    case 'RIGHT':
      robot.turn(TurningDirection.RIGHT);
      break;
    case 'REPORT':
      console.log(chalk.cyanBright(robot.report()));
      process.exit(0);
      break;
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

  const robot: ToyRobot = new ToyRobot();
  const commands: string[] = data.toString()
    .split('\n')
    .filter((line) => line.length);

  commands.forEach((line) => runCommand(robot, line));
});

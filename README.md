# Mr Yum Dev Exercise
##### Toy Robot Simulator

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5
units x 5 units.

---

- <a href="#setup">Setup</a>
- <a href="#running">Running</a>
- <a href="#brief">Brief received</a>

## <a name="setup" href="#setup"></a> Setup

Pull this repo  
```bash
$ git clone git@github.com:MarnuLombard/MrYum.git \
&& cd MrYum
```
Install the dependencies
```bash
$ npm install
```
Add the `.env` (there are no secrets in the .env)
```bash
$ cp .env.example .env
```

## <a name="running" href="#running"></a> How to run

The code is setup in two parts, the [cli app](https://github.com/MarnuLombard/MrYum/tree/master/src/main.ts) and the [react web app](https://github.com/MarnuLombard/MrYum/tree/master/src/components/App.tsx).  
Both use the same [core models](https://github.com/MarnuLombard/MrYum/tree/master/src/robot).

 --- 

#### Building
To build the web app on its own run:
```bash
$ npm run build:web:prod
```

To build the cli app on its own run:
```bash
$ npm run build:cli:prod
```

_(`npm run build:prod` does both)_

---
##### Executing

To start the web app on its own run:
```bash
$ npm run start:web:prod
```

The server will start and listen on [http://localhost:3000](http://localhost:3000)

To start the cli app on its own run:
```bash
$ npm run start:cli:prod
```
The contents of `./commands.txt` are read and parsed, then executed. Results or errors will be output to console.


_(`npm run start:prod` does both)_

---

## <a name="brief" href="#brief_received"></a> Brief received
### Description:
- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5
units x 5 units.
- There are no other obstructions on the table surface.
- The robot is free to roam around the surface of the table, but must be prevented from falling to
destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
- Create an application that can read in commands of the following form -
  * `PLACE X,Y,F`
  * `MOVE`
  * `LEFT`
  * `RIGHT`
  * `REPORT`
- `PLACE` (*will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or
WEST.*)
- The origin (0,0) can be considered to be the SOUTH WEST most corner.
- The first valid command to the robot is a `PLACE` command, after that, any sequence of
commands may be issued, in any order, including another `PLACE` command. The application should discard all commands in the sequence until a valid `PLACE` command has been
executed.
- `MOVE` will move the toy robot one unit forward in the direction it is currently facing.
- `LEFT` and `RIGHT` will rotate the robot 90 degrees in the specified direction without changing
the position of the robot.
- `REPORT` will announce the X,Y and F of the robot. This can be in any form, but standard
output is sufficient.
- A robot that is not on the table can choose the ignore the `MOVE`, `LEFT`, `RIGHT` and `REPORT`
commands.
- Input can be from a file, or from standard input, as the developer chooses. Provide test data to exercise the application. (file input commands.txt)

### Constraints
- The toy robot must not fall off the table during movement. This also includes the initial
placement of the toy robot.
- Any move that would cause the robot to fall must be ignored. Example Input and Output:
  * Input:
    * `PLACE 0,0,NORTH`
    * `MOVE`
    * `REPORT`
  * Output: `0,1,NORTH`
  * --
  * Input
    * `PLACE 0,0,NORTH`
    * `LEFT`
    * `REPORT`
  * Output: `0,0,WEST`

### Deliverables
- Github repo containing the code to the solution in Typescript (node.js/react) Instructions on how to run the project
- All relevant tests
- This can be a CLI app, extra mile CRA app :)

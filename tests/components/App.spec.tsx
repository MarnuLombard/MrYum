import '@testing-library/jest-dom';
import * as React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { App } from 'components/App';
import userEvent from '@testing-library/user-event';
import { Direction } from 'types/direction';

let app: RenderResult;
let xTestIdElement: HTMLElement;
let yTestIdElement: HTMLElement;
let directionTestIdElement: HTMLElement;
let placeTextElement: HTMLElement;
let moveTextElement: HTMLElement;
let leftTextElement: HTMLElement;
let rightTextElement: HTMLElement;

describe('Renders the react app for the TestRobot', () => {
  beforeEach(() => {
    app = render(<App />);
    xTestIdElement = screen.getByTestId('x');
    yTestIdElement = screen.getByTestId('y');
    directionTestIdElement = screen.getByTestId('direction');
    placeTextElement = screen.getByText('Place');
    moveTextElement = screen.getByText('Move');
    leftTextElement = screen.getByText('Left');
    rightTextElement = screen.getByText('Right');
  });

  // Because the robot needs to be placed before anything will function.
  // This will be reused
  async function placeRobot(direction: Direction = Direction.EAST) {
    await userEvent.type(xTestIdElement, '2');
    await userEvent.type(yTestIdElement, '1');
    await userEvent.selectOptions(directionTestIdElement, direction);
    await userEvent.click(placeTextElement);
  }

  test('Ensure that we render a board 5x5 in size', async () => {
    const boardElement = screen.getByTestId('board');
    expect(boardElement.childElementCount).toBe(5);
    expect(boardElement.children.item(0)?.childElementCount).toBe(5);
  });

  test('Ensure that we have all buttons and inputs', async () => {
    const { baseElement } = app;
    expect(baseElement).toContainElement(moveTextElement);
    expect(moveTextElement.tagName).toBe('BUTTON');
    expect(baseElement).toContainElement(leftTextElement);
    expect(leftTextElement.tagName).toBe('BUTTON');
    expect(baseElement).toContainElement(rightTextElement);
    expect(rightTextElement.tagName).toBe('BUTTON');
    expect(baseElement).toContainElement(placeTextElement);
    expect(placeTextElement.tagName).toBe('BUTTON');
    expect(baseElement).toContainElement(xTestIdElement);
    expect(xTestIdElement.tagName).toBe('INPUT');
    expect(baseElement).toContainElement(yTestIdElement);
    expect(yTestIdElement.tagName).toBe('INPUT');
    expect(baseElement).toContainElement(directionTestIdElement);
    expect(directionTestIdElement.tagName).toBe('SELECT');
  });

  test('Ensure placing works', async () => {
    const boardElement = screen.getByTestId('board');
    let active = screen.queryByTestId('active');

    // Active element empty
    expect(active).toBeNull();

    await placeRobot();

    // Active tile is now set
    active = screen.getByTestId('active');
    expect(boardElement).toContainElement(active);
  });

  test('Ensure turning works', async () => {
    await placeRobot(Direction.NORTH);

    const active = screen.getByTestId('active');
    expect(active.children[0].getAttribute('data-icon')).toBe('arrow-up');

    await userEvent.click(leftTextElement);
    expect(active.children[0].getAttribute('data-icon')).toBe('arrow-left');

    await userEvent.click(rightTextElement);
    expect(active.children[0].getAttribute('data-icon')).toBe('arrow-up');
  });

  test('Ensure moving works', async () => {
    const { baseElement } = app;
    const active1 = screen.queryByTestId('active');
    expect(active1).toBeNull(); // sanity check with the minor global state we have in this test

    await placeRobot(Direction.EAST);

    const active2 = screen.getByTestId('active');
    expect(baseElement).toContainElement(active2);

    await userEvent.click(moveTextElement);

    const active3 = screen.queryByTestId('active');
    expect(baseElement).toContainElement(active3);
    expect(active3).not.toBe(active2);
  });
});

import { FoodPosition } from "./food";
import Renderer from "./renderer";

const SNAKE_COLOR = "#000";

export interface SnakePosition {
  x: number;
  y: number;
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export default class Snake {
  private positions: Array<SnakePosition>;
  private head: SnakePosition;
  private direction: Direction;
  private renderer: Renderer;

  constructor(count: number, renderer: Renderer) {
    const [positions, direction] = this.getRandomPositions(count);
    this.positions = positions;
    this.head = positions[0];
    this.direction = direction;
    this.renderer = renderer;
  }

  private getRandomPositions(count: number): [Array<SnakePosition>, Direction] {
    const initPosition = Math.floor(count / 2);
    let initPositions: Array<SnakePosition>;
    const directions = [
      Direction.Up,
      Direction.Down,
      Direction.Left,
      Direction.Right,
    ];
    const direction = directions[Math.floor(Math.random() * 4)];
    switch (direction) {
      case Direction.Up:
        initPositions = [
          { x: initPosition, y: initPosition - 1 },
          { x: initPosition, y: initPosition },
          { x: initPosition, y: initPosition + 1 },
        ];
        break;
      case Direction.Down:
        initPositions = [
          { x: initPosition, y: initPosition + 1 },
          { x: initPosition, y: initPosition },
          { x: initPosition, y: initPosition - 1 },
        ];
        break;
      case Direction.Left:
        initPositions = [
          { x: initPosition - 1, y: initPosition },
          { x: initPosition, y: initPosition },
          { x: initPosition + 1, y: initPosition },
        ];
        break;
      case Direction.Right:
        initPositions = [
          { x: initPosition + 1, y: initPosition },
          { x: initPosition, y: initPosition },
          { x: initPosition - 1, y: initPosition },
        ];
        break;
    }
    return [initPositions, direction];
  }

  getNextPosition(): SnakePosition {
    let nextPosition: SnakePosition;
    switch (this.direction) {
      case Direction.Up:
        nextPosition = { x: 0, y: -1 };
        break;
      case Direction.Down:
        nextPosition = { x: 0, y: 1 };
        break;
      case Direction.Left:
        nextPosition = { x: -1, y: 0 };
        break;
      case Direction.Right:
        nextPosition = { x: 1, y: 0 };
        break;
      default:
        const exhaustiveCheck: never = this.direction;
        throw new Error(exhaustiveCheck);
    }
    const { x, y } = this.head;
    return { x: x + nextPosition.x, y: y + nextPosition.y };
  }

  move(to: SnakePosition) {
    this.head = to;
    this.positions.unshift(this.head);
    this.positions.pop();
  }

  eat(food: FoodPosition) {
    this.head = food;
    this.positions.unshift(this.head);
  }

  setDirection(direction: Direction) {
    if (direction === Direction.Up && this.direction === Direction.Down) return;
    if (direction === Direction.Down && this.direction === Direction.Up) return;
    if (direction === Direction.Left && this.direction === Direction.Right)
      return;
    if (direction === Direction.Right && this.direction === Direction.Left)
      return;
    this.direction = direction;
  }

  isSnake(cell: SnakePosition) {
    return (
      this.positions.findIndex(
        (position) => cell.x === position.x && cell.y === position.y
      ) > -1
    );
  }

  render() {
    this.renderer.clearCanvas();
    this.positions.forEach(({ x, y }) =>
      this.renderer.drawRect(x, y, SNAKE_COLOR)
    );
  }
}

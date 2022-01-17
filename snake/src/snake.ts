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
  private renderer: Renderer;
  constructor(positions: Array<SnakePosition>, renderer: Renderer) {
    this.positions = positions;
    this.head = positions[0];
    this.renderer = renderer;
  }

  move(direction: Direction) {
    let nextPosition: SnakePosition;
    switch (direction) {
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
        const exhaustiveCheck: never = direction;
        throw new Error(exhaustiveCheck);
    }
    const { x, y } = this.head;
    this.head = { x: x + nextPosition.x, y: y + nextPosition.y };
    this.positions.unshift(this.head);
    this.positions.pop();
  }

  render() {
    this.renderer.clearCanvas();
    this.positions.forEach(({ x, y }) =>
      this.renderer.drawRect(x, y, SNAKE_COLOR)
    );
  }
}

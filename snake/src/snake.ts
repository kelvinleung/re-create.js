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

  constructor(
    positions: Array<SnakePosition>,
    initDirection: Direction,
    renderer: Renderer
  ) {
    this.positions = positions;
    this.head = positions[0];
    this.direction = initDirection;
    this.renderer = renderer;
  }

  move() {
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
    this.head = { x: x + nextPosition.x, y: y + nextPosition.y };
    this.positions.unshift(this.head);
    this.positions.pop();
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

  render() {
    this.renderer.clearCanvas();
    this.positions.forEach(({ x, y }) =>
      this.renderer.drawRect(x, y, SNAKE_COLOR)
    );
  }
}

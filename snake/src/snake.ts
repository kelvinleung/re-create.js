import { FoodPosition } from "./food";
import Renderer from "./renderer";

const SNAKE_COLOR = "#000";

export interface SnakePosition {
  x: number;
  y: number;
}

// 可移动的方向
export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export default class Snake {
  // 蛇身体每一格的位置
  private positions: Array<SnakePosition>;
  // 蛇头的位置
  private head: SnakePosition;
  // 蛇移动的方向
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
    // 随机选择一个移动的方向
    const direction = directions[Math.floor(Math.random() * 4)];
    // 根据移动方向，初始化蛇的起始位置，长度为3
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
    // 根据移动方向，计算下一个移动的位置
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
    // 移动，头加尾减，中间不动
    this.head = to;
    this.positions.unshift(this.head);
    this.positions.pop();
  }

  eat(food: FoodPosition) {
    // 吃食物，头加，其它不动
    this.head = food;
    this.positions.unshift(this.head);
  }

  setDirection(direction: Direction) {
    // 判断不能“回头”，只能往前或转弯
    if (direction === Direction.Up && this.direction === Direction.Down) return;
    if (direction === Direction.Down && this.direction === Direction.Up) return;
    if (direction === Direction.Left && this.direction === Direction.Right)
      return;
    if (direction === Direction.Right && this.direction === Direction.Left)
      return;
    this.direction = direction;
  }

  // 判断位置是否在蛇体内
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

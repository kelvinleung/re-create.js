import Snake, { Direction, SnakePosition } from "./snake";
import Renderer from "./renderer";

const INITIAL_POSITIONS: Array<SnakePosition> = [
  { x: 2, y: 10 },
  { x: 1, y: 10 },
  { x: 0, y: 10 },
];
const FRAME_PER_SEC = 1;
const GRID_COUNT = 40;
const INITIAL_DIRECTION = Direction.Right;

export default class Game {
  private snake: Snake;
  private loopId?: number;
  private lastTime: number = 0;

  constructor() {
    const renderer = new Renderer(GRID_COUNT);
    this.snake = new Snake(INITIAL_POSITIONS, renderer);
    window.addEventListener("load", () => {
      renderer.resizeCanvas();
    });
    window.addEventListener("resize", () => {
      renderer.resizeCanvas();
      this.render();
    });
  }

  loop(time: number) {
    requestAnimationFrame(this.loop.bind(this));
    if (time - this.lastTime < 1000 / FRAME_PER_SEC) return;
    this.lastTime = time;
    this.snake.move(INITIAL_DIRECTION);
    this.render();
  }

  start() {
    this.render();
    this.loopId = requestAnimationFrame(this.loop.bind(this));
  }

  stop() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
    }
  }

  render() {
    this.snake.render();
  }
}

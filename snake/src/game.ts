import Snake, { Direction, SnakePosition } from "./snake";
import Food from "./food";
import Renderer from "./renderer";

interface Config {
  fps: number;
  count: number;
}

enum GameState {
  Lose,
  Food,
  Move,
}

export default class Game {
  private isRunning: boolean = false;
  private snake!: Snake;
  private food!: Food;
  private renderer!: Renderer;
  private loopId?: number;
  private lastTime: number = 0;
  private fps: number;
  private count: number;

  constructor(config: Config) {
    this.fps = config.fps;
    this.count = config.count;

    window.addEventListener("keydown", this.keyHandler.bind(this));
    window.addEventListener("resize", () => {
      this.renderer.resizeCanvas();
      this.render();
    });
  }

  mount(container: HTMLElement) {
    this.renderer = new Renderer(this.count, container);
    this.snake = new Snake(this.count, this.renderer);
    this.food = new Food(this.count, this.renderer);
    this.renderer.resizeCanvas();
  }

  start() {
    this.render();
    this.loopId = requestAnimationFrame(this.loop.bind(this));
    this.isRunning = true;
  }

  stop() {
    if (this.loopId) {
      cancelAnimationFrame(this.loopId);
      this.loopId = undefined;
    }
    this.isRunning = false;
  }

  private loop(time: number) {
    this.loopId = requestAnimationFrame(this.loop.bind(this));
    if (time - this.lastTime < 1000 / this.fps) return;
    this.lastTime = time;
    const cell = this.snake.getNextPosition();
    const state = this.checkState(cell);
    switch (state) {
      case GameState.Lose:
        this.stop();
        return;
      case GameState.Food:
        this.snake.eat(cell);
        this.food.spawn();
        break;
      default:
        this.snake.move(cell);
        break;
    }
    this.render();
  }

  private render() {
    this.snake.render();
    this.food.render();
  }

  private checkState(cell: SnakePosition): GameState {
    if (
      cell.x < 0 ||
      cell.x >= this.count ||
      cell.y < 0 ||
      cell.y >= this.count
    ) {
      return GameState.Lose;
    }
    if (this.snake.isSnake(cell)) {
      return GameState.Lose;
    }
    if (cell.x === this.food.position.x && cell.y === this.food.position.y) {
      return GameState.Food;
    }
    return GameState.Move;
  }

  private keyHandler(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.snake.setDirection(Direction.Up);
        break;
      case "ArrowDown":
        this.snake.setDirection(Direction.Down);
        break;
      case "ArrowLeft":
        this.snake.setDirection(Direction.Left);
        break;
      case "ArrowRight":
        this.snake.setDirection(Direction.Right);
        break;
      case " ":
        if (this.isRunning) {
          this.stop();
        } else {
          this.start();
        }
        break;
    }
  }
}

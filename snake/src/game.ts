import Snake, { Direction } from "./snake";
import Renderer from "./renderer";

const INITIAL_DIRECTION = Direction.Right;

interface Config {
  fps: number;
  count: number;
}

export default class Game {
  private snake: Snake;
  private loopId?: number;
  private lastTime: number = 0;
  private fps: number;
  private count: number;
  private isRunning: boolean = false;

  constructor(config: Config) {
    this.fps = config.fps;
    this.count = config.count;

    const renderer = new Renderer(this.count);
    const initPosition = Math.floor(this.count / 2);
    const initPositions = [
      { x: initPosition - 1, y: initPosition },
      { x: initPosition, y: initPosition },
      { x: initPosition + 1, y: initPosition },
    ];
    this.snake = new Snake(initPositions, INITIAL_DIRECTION, renderer);

    renderer.resizeCanvas();
    this.render();

    window.addEventListener("keydown", this.keyHandler.bind(this));
    window.addEventListener("resize", () => {
      renderer.resizeCanvas();
      this.render();
    });
  }

  loop(time: number) {
    this.loopId = requestAnimationFrame(this.loop.bind(this));
    if (time - this.lastTime < 1000 / this.fps) return;
    this.lastTime = time;
    this.snake.move();
    this.render();
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
    console.log("stop");
  }

  render() {
    this.snake.render();
  }

  keyHandler(event: KeyboardEvent) {
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

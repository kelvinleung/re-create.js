import Snake, { Direction } from "./snake";
import Renderer from "./renderer";

interface Config {
  fps: number;
  count: number;
}

export default class Game {
  private isRunning: boolean = false;
  private snake: Snake;
  private loopId?: number;
  private lastTime: number = 0;
  private fps: number;
  private count: number;

  constructor(config: Config) {
    this.fps = config.fps;
    this.count = config.count;

    const renderer = new Renderer(this.count);

    this.snake = new Snake(this.count, renderer);

    renderer.resizeCanvas();
    this.render();

    window.addEventListener("keydown", this.keyHandler.bind(this));
    window.addEventListener("resize", () => {
      renderer.resizeCanvas();
      this.render();
    });
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

  private loop(time: number) {
    this.loopId = requestAnimationFrame(this.loop.bind(this));
    if (time - this.lastTime < 1000 / this.fps) return;
    this.lastTime = time;
    this.snake.move();
    this.render();
  }

  private render() {
    this.snake.render();
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

import Snake, { Direction, SnakePosition } from "./snake";
import Food from "./food";
import Renderer from "./renderer";

interface Config {
  fps: number;
  count: number;
}

// 游戏当前状态
enum GameState {
  Lose,
  Food,
  Move,
}

export default class Game {
  // 是否暂停
  private isRunning: boolean = false;
  private snake!: Snake;
  private food!: Food;
  private renderer!: Renderer;
  // requestAnimationFrame 的 id
  private loopId?: number;
  private lastTime: number = 0;
  // 蛇移动的速度
  private fps: number;
  // 画布的格子数
  private count: number;

  constructor(config: Config) {
    this.fps = config.fps;
    this.count = config.count;

    // 监听按键
    window.addEventListener("keydown", this.keyHandler.bind(this));
    window.addEventListener("resize", () => {
      this.renderer.resizeCanvas();
      this.render();
    });
  }

  // 挂载并初始化
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
    // 根据 fps 控制是否移动（重绘速率）
    if (time - this.lastTime < 1000 / this.fps) return;
    // 上次执行的时间
    this.lastTime = time;
    // 获取将要移动到的位置
    const cell = this.snake.getNextPosition();
    // 判断移动位置的游戏状态
    const state = this.checkState(cell);
    // 根据状态执行相应操作
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

  // 渲染蛇与食物
  private render() {
    this.snake.render();
    this.food.render();
  }

  private checkState(cell: SnakePosition): GameState {
    // 超出边界时，游戏结束
    if (
      cell.x < 0 ||
      cell.x >= this.count ||
      cell.y < 0 ||
      cell.y >= this.count
    ) {
      return GameState.Lose;
    }
    // 碰撞到蛇自身时，游戏结束
    if (this.snake.isSnake(cell)) {
      return GameState.Lose;
    }
    // 移动到食物上
    if (cell.x === this.food.position.x && cell.y === this.food.position.y) {
      return GameState.Food;
    }
    // 普通移动
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

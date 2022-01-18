import Renderer from "./renderer";
import { SnakePosition } from "./snake";

export interface FoodPosition extends SnakePosition {}

export default class Food {
  private count: number;
  private renderer: Renderer;
  position: FoodPosition;
  constructor(count: number, renderer: Renderer) {
    this.count = count;
    this.position = this.getRandomPosition();
    this.renderer = renderer;
  }

  private getRandomPosition(): FoodPosition {
    const x = Math.floor(Math.random() * (this.count - 1));
    const y = Math.floor(Math.random() * (this.count - 1));
    return { x, y };
  }

  spawn() {
    this.position = this.getRandomPosition();
  }

  render() {
    this.renderer.drawRect(this.position.x, this.position.y, "#ff0000");
  }
}

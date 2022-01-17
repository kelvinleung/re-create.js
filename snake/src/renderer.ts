export default class Renderer {
  private count: number;
  private canvasWidth: number = 0;
  private app: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(count: number) {
    this.count = count;
    this.app = document.querySelector<HTMLDivElement>("#app")!;
    this.canvas = document.querySelector<HTMLCanvasElement>("#board")!;
    this.ctx = this.canvas.getContext("2d")!;
  }

  drawRect(x: number, y: number, color: string) {
    const gridWidth = this.canvasWidth / this.count;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * gridWidth, y * gridWidth, gridWidth, gridWidth);
  }

  resizeCanvas() {
    this.canvasWidth = Math.min(this.app.offsetWidth, this.app.offsetHeight);
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasWidth;
    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasWidth}px`;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
  }
}

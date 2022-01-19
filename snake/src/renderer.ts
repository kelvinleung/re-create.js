export default class Renderer {
  private count: number;
  private canvasWidth: number = 0;
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(count: number, container: HTMLElement) {
    this.count = count;
    this.container = container;
    this.canvas = document.createElement("canvas");
    this.canvas.setAttribute("id", "board");
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;
  }

  drawRect(x: number, y: number, color: string) {
    const gridWidth = this.canvasWidth / this.count;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * gridWidth, y * gridWidth, gridWidth, gridWidth);
  }

  resizeCanvas() {
    this.canvasWidth = Math.min(
      this.container.offsetWidth,
      this.container.offsetHeight
    );
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasWidth;
    this.canvas.style.width = `${this.canvasWidth}px`;
    this.canvas.style.height = `${this.canvasWidth}px`;
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
  }
}

export default class Renderer {
  // 网格数
  private count: number;
  // 挂载 canvas 的元素
  private container: HTMLElement;
  private canvasWidth: number = 0;
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
    // 计算每个格子的宽度
    const gridWidth = this.canvasWidth / this.count;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * gridWidth, y * gridWidth, gridWidth, gridWidth);
  }

  resizeCanvas() {
    // 取短边作为画布宽度
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
    // 清空画布
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasWidth);
  }
}

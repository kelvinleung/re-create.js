import Game from "./game";
import "./style.css";

const app = document.getElementById("app")!;

const game = new Game({
  fps: 5,
  count: 21,
});

// 挂载并初始化游戏
game.mount(app);

// 开始游戏
game.start();

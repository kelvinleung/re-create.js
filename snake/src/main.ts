import Game from "./game";
import "./style.css";

const app = document.getElementById("app")!;

const game = new Game({
  fps: 5,
  count: 21,
});

game.mount(app);

game.start();

import Game from "./game";
import "./style.css";

const game = new Game({
  fps: 2,
  count: 41,
});

game.start();

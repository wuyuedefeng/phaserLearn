// 创建游戏世界
var game = new Phaser.Game(400,490,Phaser.AUTO,'');

// 玩家默认得分为 0
var score = 0;

game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('ready',readyState);
game.state.add('play', playState);
game.state.add('gameover', gameoverState);

game.state.start('load');
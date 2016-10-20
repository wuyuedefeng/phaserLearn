var gameoverState = {
    create: function () {
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start,this);


        this.bg = this.game.add.sprite(0,0,'bg');
        this.bo = this.game.add.sprite(0,0,'bo');
        this.gameover = this.game.add.sprite(0,0,'gameover');
    },
    start: function () {
        this.game.state.start('menu');
    }
}
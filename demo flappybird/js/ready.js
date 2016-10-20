var readyState = {
    create: function () {
        //载入游戏准备界面
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.start,this);

        this.bg = this.game.add.sprite(0,0,'bg');
        this.bo = this.game.add.sprite(0,0,'bo');
        this.ready = this.game.add.sprite(0,0,'ready');
        this.bird = this.game.add.sprite(50,245,'bird');
    },
    start: function () {
        console.log('go play');
        this.game.state.start('play');
    }
}
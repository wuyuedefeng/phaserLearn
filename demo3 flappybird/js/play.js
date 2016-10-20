var playState = {
    create: function () {
        //载入所需资源
        this.bg = this.game.add.sprite(0,0,'bg');
        this.bo = this.game.add.sprite(0,0,'bo');

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        //用于存放管道的组，后面会讲到
        this.pipes = game.add.group();
        this.pipes.createMultiple(20, 'pipe');
        //开启管道的物理系统
        game.physics.enable(this.pipes, Phaser.Physics.ARCADE);
        this.pipes.setAll('outOfBoundsKill', true);
        this.pipes.setAll('checkWorldBounds', true);
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        this.bird = this.game.add.sprite(100, 245, 'bird');

        //开启鸟的物理系统
        // game.physics.enable([this.bird], Phaser.Physics.ARCADE);
        game.physics.enable(this.bird,Phaser.Physics.ARCADE);
        //设置Bird锚点
        this.bird.anchor.setTo(0.5, 0.5);

        //鸟的重力,未开始游戏，先让重力为0，不然鸟会掉下来
        this.bird.body.gravity.y = 1000;

        //飞翔，实质上就是给鸟设一个向右的速度
        // this.bird.body.velocity.x = 150;

        //让地面在物理环境中固定不动
        // this.ground.body.immovable = true;

        // Not 'this.score', but just 'score'
        score = 0;

        var style = { font: "30px Arial", fill: "#ffffff" };
        this.labelScore = this.game.add.text(20, 20, "0", style);

        //加载音效
        this.jumpSound = this.game.add.audio('jump');
        this.deadSound = this.game.add.audio('dead');

    },
    update: function () {
        if (this.bird.inWorld == false){
            console.log('bird dead!!');
            this.restartGame();
        }

        //下降时鸟的头朝下的动画
        if(this.bird.angle < 90)
            this.bird.angle += 2.5;

        // 重叠检测（http://phaser.io/docs/2.6.2/Phaser.Physics.Arcade.html#overlap）
        this.game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
    },
    jump: function () {
        if (this.bird.alive == false) return;
        console.log('jump..');
        //飞翔，实质上就是给鸟设一个向上的速度
        this.bird.body.velocity.y = -350;
        //上升时头朝上的动画
        this.game.add.tween(this.bird).to({angle: -90}, 50).start();
        this.jumpSound.play();
    },
    addRowOfPipes: function () {
        var hole = Math.floor(Math.random()*4 + 1);
        for(var i = 0; i<9; i++){
            if (i != hole && i != hole+1){
                this.addOnePipe(400, i*60);
            }
        }

        score += 1;
        this.labelScore.setText(score);
    },
    addOnePipe: function (x, y) {
        var pipe = this.pipes.getFirstDead();
        console.log('pipe', pipe);
        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.outOfBoundsKill = true;

    },
    //撞管子
    hitPipe: function() {
        if (this.bird.alive == false)
            return;

        this.bird.alive = false;
        this.game.time.events.remove(this.timer);

        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
        this.deadSound.play();
    },
    //重新开始函数
    restartGame: function() {
        this.game.time.events.remove(this.timer);
        this.game.state.start('gameover');
    }
}
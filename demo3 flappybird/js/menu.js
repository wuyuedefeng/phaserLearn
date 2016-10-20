var menuState = {
    create: function () {
        //定义接受按键消息变量
        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //按键按下时调用start()函数
        spaceKey.onDown.add(this.start, this);

        //定义游戏操作说明文字风格
        var style = {font: "30px Arial", fill: "#FFFFFF"};

        //定义坐标变量x,y，(x,y)为game.world中心
        var x = game.world.width/2, y = game.world.height/2;

        //在game.world中坐标(0,0)处画出预加载游戏资源，背景图片
        this.bg = this.game.add.sprite(0,0, 'bg');
        this.bo = this.game.add.sprite(0,0, 'bo');
        //加载menu图片
        this.menu = this.game.add.sprite(0,0,'menu');
        this.bird = this.game.add.sprite(x-20,y-50,'bird');		//载入即将闯荡管子世界的Bird
        console.log('load bg..')
    },
    start:function () {
        console.log('go ready');
        this.game.state.start('ready');
    }
}
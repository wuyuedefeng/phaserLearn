// 教程 http://blog.csdn.net/hentailing/article/details/22725751
var score = 0;
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    init: function () {

    },
    preload: function () {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('star', 'assets/star.png');
        game.load.spritesheet('dude', 'assets/dude.png', 32, 48 );
    },
    create: function () {
        //  We're going to be using physics, so enable the Arcade Physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0 , 'star');

        //  We will enable physics for any object that is created in this group
        platforms = game.add.group();
        platforms.enableBody = true;

        // Here we create the ground.
        var ground = platforms.create(0, game.world.height - 64, 'ground');
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);
        platforms.create(400, 400, 'ground');
        platforms.create(-150, 250, 'ground');
        platforms.forEach(function (ground) {
           ground.body.immovable = true;
        });

        // The player and its settings
        var player = game.add.sprite(32, game.world.height - 350, 'dude', 4);
        this.player = player;
        //  We need to enable physics on the player
        game.physics.arcade.enable(player);
        //  Player physics properties. Give the little guy a slight bounce.
        // player.body.bounce = 0; //弹性系数
        player.body.gravity.y = 1000;
        player.body.collideWorldBounds = true; //是否碰撞世界边界 （物体不能超出世界边界）
        //  Our two animations, walking left and right.
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        // 给玩家添加控制
        this.cursors = game.input.keyboard.createCursorKeys();

        // 星星
        this.stars = game.add.group();
        this.stars.enableBody = true;
        //  Here we'll create 12 of them evenly spaced apart
        for (var i = 0; i < 12; i++)
        {
            //  Create a star inside of the 'stars' group
            var star = this.stars.create(i * 70, 0, 'star');
            //  Let gravity do its thing
            star.body.gravity.y = 20;
            //  This just gives each star a slightly random bounce value
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }

        // 得分
        this.scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });


    },
    update: function () {

        //  Collide the player and the stars with the platforms （碰撞检测 玩家 和 星星的平台）
        game.physics.arcade.collide(this.player, platforms);
        // 检测星星和平台的碰撞
        game.physics.arcade.collide(this.stars, platforms);
        // 检测星星和玩家的重叠
        game.physics.arcade.overlap(this.player, this.stars, function (player, star) {
            star.kill();

            //  Add and update the score
            score += 10;
            this.scoreText.text = 'Score: ' + score;
        }, null, this);

        this.player.body.velocity.x = 0;
        var keyDown = false;
        // 判断玩家按键
        if (this.cursors.left.isDown){
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
            keyDown = true;
        }
        if (this.cursors.right.isDown){
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
            keyDown = true;
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) { // Allow the player to jump if they are touching the ground.
            this.player.body.velocity.y = -650;
            keyDown = true;
        }
        if (this.cursors.down.isDown) {
            this.player.body.velocity.y = 1;
            keyDown = true;
        }
        if (!keyDown){
            this.player.frame = 4;
        }
        //  Allow the player to jump if they are touching the ground.


    },
    render: function () {

        // game.debug.inputInfo();
    }
});
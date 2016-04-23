var game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});

function preload() {
	game.load.image('bground', 'assets/background.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('wall', 'assets/wall.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('ground', 'assets/ground.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('issue', 'assets/issue.svg'); // sprites taken from https://github.com/github/octicons/blob/master/svg/issue.svg
	game.load.image('extra', 'assets/extra.svg'); // sprites taken from https://github.com/github/octicons/blob/master/svg/file-code.svg
	game.load.spritesheet('bullet', 'assets/bullet.png', 14, 16); // sprites taken from http://www.spriters-resource.com/snes/smarioworld/sheet/63051/
	game.load.spritesheet('dude', 'assets/dude.png', 96, 86); // sprites taken from https://github.com/mozilla/BrowserQuest/blob/master/client/img/3/octocat.png
}

var player;
var walls;
var enemies;
var score = 0;
var scoreText;

function create() {
	// game setup
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'bground');

	// level setup
	walls = game.add.group();

	walls.enableBody = true;

	var ground = walls.create(0, game.world.height - 50, 'ground');

	ground.body.immovable = true;

	var wall = walls.create(0, 0, 'wall');

	wall.body.immovable = true;

	wall = walls.create(game.world.width - 50, 0, 'wall');

	wall.body.immovable = true;

	player = new Player(game);
	player.initialize();

	// enemy setup
	enemies = new Enemy(game);
	enemies.init();

	enemies.spawn();

	scoreText = game.add.text(16, 16, 'Score: 0', {
		fontSize: '32px',
		fill: '#000'
	});
}

function update() {
	game.physics.arcade.collide(player.getSprite(), walls); // player collision with walls

	game.physics.arcade.collide(enemies.getEnemies(), walls); // enemy collision with walls

	// game.physics.arcade.overlap(player.getSprite(), enemies.getEnemies(), killEnemy, null, this);
	game.physics.arcade.overlap(player.getBullets(), enemies.getEnemies(), killEnemy, null, this);

	player.update();
}

function killEnemy(player, enemy) {
	enemy.kill();

	score += 10;
	scoreText.text = 'Score: ' + score;
}
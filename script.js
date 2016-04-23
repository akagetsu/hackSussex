var game = new Phaser.Game(480, 640, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});

function preload() {
	game.load.image('bground', 'assets/background.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('wall', 'assets/wall.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('ground', 'assets/ground.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('bullet', 'assets/bullet.png', 19, 17); // sprites taken from http://www.spriters-resource.com/snes/smarioworld/sheet/63051/
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
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
	enemies = game.add.group();

	enemies.enableBody = true;

	for (var i = 1; i < 7; i++) {
		var enemy = enemies.create(i * 65, 0, 'star');

		enemy.body.gravity.y = 500;
	}

	scoreText = game.add.text(16, 16, 'Score: 0', {
		fontSize: '32px',
		fill: '#000'
	});
}

function update() {
	game.physics.arcade.collide(player.getSprite(), walls); // player collision with walls

	game.physics.arcade.collide(enemies, walls); // enemy collision with walls

	game.physics.arcade.overlap(player.getSprite(), enemies, collectStar, null, this);

	player.update();
}

function collectStar(player, star) {
	star.kill();

	score += 10;
	scoreText.text = 'Score: ' + score;
}
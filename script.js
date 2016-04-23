var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
	preload: preload,
	create: create,
	update: update
});

function preload() {
	game.load.image('bground', 'assets/background.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('wall', 'assets/wall.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('ground', 'assets/ground.png'); // sprites taken from http://www.spriters-resource.com/nes/supermariobros/sheet/65962/
	game.load.image('star', 'assets/star.png');
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var walls;
var cursors;
var stars;
var score = 0;
var scoreText;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'bground');

	walls = game.add.group();

	walls.enableBody = true;

	var ground = walls.create(0, game.world.height - 50, 'ground');

	ground.body.immovable = true;

	var wall = walls.create(0, 0, 'wall');

	wall.body.immovable = true;

	wall = walls.create(game.world.width - 50, 0, 'wall');

	wall.body.immovable = true;

	player = game.add.sprite(game.world.width/2, game.world.height - 150, 'dude');

	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.1;
	player.body.gravity.y = 500;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);

	cursors = game.input.keyboard.createCursorKeys();

	stars = game.add.group();

	stars.enableBody = true;

	for (var i = 0; i < 12; i++) {
		var star = stars.create(i * 70, 0, 'star');

		star.body.gravity.y = 200;

		star.body.bounce.y = 0.7 * Math.random() * 0.2;
	}

	scoreText = game.add.text(16, 16, 'Score: 0', {
		fontSize: '32px',
		fill: '#000'
	});
}

function update() {
	game.physics.arcade.collide(player, walls);

	game.physics.arcade.collide(stars, walls);

	game.physics.arcade.overlap(player, stars, collectStar, null, this);

	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
		player.body.velocity.x = -250;
		player.animations.play('left');
	} else if (cursors.right.isDown) {
		player.body.velocity.x = 250;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	if (cursors.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -400;
	}
}

function collectStar(player, star) {
	star.kill();

	score += 10;
	scoreText.text = 'Score: ' + score;
}
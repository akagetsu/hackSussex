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
	game.load.image('watchers', 'assets/watchers.png'); // sprites taken from https://github.com/github/octicons/blob/master/svg/eye.svg
	game.load.image('release', 'assets/release.svg'); // sprites taken from https://github.com/github/octicons/blob/master/svg/tag.svg
	game.load.spritesheet('bullet', 'assets/bullet.png', 14, 16); // sprites taken from http://www.spriters-resource.com/snes/smarioworld/sheet/63051/
	game.load.spritesheet('dude', 'assets/dude.png', 96, 86); // sprites taken from https://github.com/mozilla/BrowserQuest/blob/master/client/img/3/octocat.png
}

var player;
var walls;
var ground;
var enemies;
var score;
var pad;

function create() {
	// game setup
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'bground');

	// level setup
	walls = game.add.group();

	walls.enableBody = true;

	ground = walls.create(0, game.world.height - 50, 'ground');

	ground.body.immovable = true;

	var wall = walls.create(0, 0, 'wall');

	wall.body.immovable = true;

	wall = walls.create(game.world.width - 50, 0, 'wall');

	wall.body.immovable = true;

	pad = new Gamepad(game).init();

	player = new Player(game);
	player.initialize();

	// enemy setup
	enemies = new Enemy(game);
	enemies.init();

	releases = new Release(game);
	releases.init();


	score = new Score(game);
	score.setScoreElem();
}

function update() {
	physicsHandler();

	player.update();
	controlHandler();
}

function physicsHandler() {
	game.physics.arcade.collide(player.getSprite(), walls); // player collision with walls
	game.physics.arcade.collide(enemies.getEnemies(), walls); // enemy collision with walls
	game.physics.arcade.overlap(player.getSprite(), enemies.getEnemies(), takeDamage, null, this);
	game.physics.arcade.overlap(player.getBullets(), enemies.getEnemies(), dealDamage, null, this);
	game.physics.arcade.overlap(player.getSprite(), releases.getReleases(), goodRelease, null, this);
	game.physics.arcade.overlap(ground, releases.getReleases(), failRelease, null, this);
}

// Controls
function controlHandler() {
	if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
		player.move(-350);
	} else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
		player.move(350);
	}

	if (pad.justPressed(Phaser.Gamepad.XBOX360_A) && player.getSprite().body.touching.down) {
		player.jump();
	}

	if (pad.justPressed(Phaser.Gamepad.XBOX360_X, 100)) {
		player.fire();
	}
}

function takeDamage(player, enemy) {
	score.modScore(-2);
}

function goodRelease(player, release) {
	score.modScore(100);
	release.kill();
}

function failRelease(ground, release) {
	score.modScore(-50);
	release.kill();
}

function dealDamage(bullet, enemy) {
	enemy.kill();
	bullet.kill();
	score.modScore(10);
}
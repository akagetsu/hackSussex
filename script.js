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
	game.load.image('watchers', 'assets/watchers.png'); // sprites taken from https://github.com/github/octicons/blob/master/svg/eye.svg
	game.load.image('release', 'assets/release.svg'); // sprites taken from https://github.com/github/octicons/blob/master/svg/tag.svg
	game.load.image('gamepad', 'assets/gamepad.png'); // font used http://www.dafont.com/8bit-wonder.font
	game.load.image('keyboard', 'assets/keyboard.png'); // font used http://www.dafont.com/8bit-wonder.font
	game.load.image('start', 'assets/start.png'); // font used http://www.dafont.com/8bit-wonder.font
	game.load.image('win', 'assets/win.png'); // font used https://github.com/photonstorm/phaser-examples/blob/master/examples/assets/particlestorm/particles/white.png
	game.load.spritesheet('bullet', 'assets/bullet.png', 14, 16); // sprites taken from http://www.spriters-resource.com/snes/smarioworld/sheet/63051/
	game.load.spritesheet('dude', 'assets/dude.png', 96, 86); // sprites taken from https://github.com/mozilla/BrowserQuest/blob/master/client/img/3/octocat.png
	game.load.audio('intro', 'assets/intro.mp3'); // music taken from http://ericskiff.com/music/
	game.load.audio('main', 'assets/main.mp3'); // music taken from http://ericskiff.com/music/
	game.load.audio('shoot', 'assets/shoot.wav'); // generated using bfxr
	game.load.audio('shoot2', 'assets/shoot2.wav'); // generated using bfxr
	game.load.audio('explode', 'assets/explode.wav'); // generated using bfxr
	game.load.audio('powerup', 'assets/powerup.wav'); // generated using bfxr
	game.load.audio('jump', 'assets/jump.wav'); // generated using bfxr
	game.load.audio('miss', 'assets/miss.wav'); // generated using bfxr
	game.load.audio('hurt', 'assets/hurt.wav'); // generated using bfxr
	game.load.audio('nuke', 'assets/nuke.wav'); // generated using bfxr
}

var player;
var walls;
var ground;
var enemies;
var score;

var pad;
var cursors;
var attKey;
var jmpKey;
var restartKey;

var keyImg;
var padImg;
var startImg;

var music;
var shoot;
var explode;
var powerup;
var jump;
var miss;
var hurt;
var nuke;

var options = {
	sounds: true,
	gamepad: true
};
var gameState = {
	menu: true,
	game: false,
	end: false
};

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

	player = new Player(game);
	player.initialize();

	pad = new Gamepad(game).init();
	cursors = game.input.keyboard.createCursorKeys();
	attKey = game.input.keyboard.addKey(Phaser.Keyboard.X);
	jmpKey = game.input.keyboard.addKey(Phaser.Keyboard.Z);
	restartKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

	menus();
}

function update() {
	physicsHandler();
	player.update();
	controlHandler();
	checkEndGame();
}

function physicsHandler() {
	game.physics.arcade.collide(player.getSprite(), walls); // player collision with walls
	if (gameState.game) {
		game.physics.arcade.collide(enemies.getEnemies(), walls); // enemy collision with walls
		game.physics.arcade.overlap(player.getSprite(), enemies.getEnemies(), takeDamage, null, this);
		game.physics.arcade.overlap(player.getBullets(), enemies.getEnemies(), dealDamage, null, this);
		game.physics.arcade.overlap(player.getSprite(), releases.getReleases(), goodRelease, null, this);
		game.physics.arcade.overlap(ground, releases.getReleases(), failRelease, null, this);
	}
}

function menus() {
	gameState.game = false;
	gameState.menu = true;
	if (music)
		music.stop();
	music = game.add.audio('intro');
	music.volume = 1;
	music.play();
	shoot = game.add.audio('shoot');
	shoot.volume = 0.3;
	keyImg = game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 - 70, 'keyboard');
	keyImg.inputEnabled = true;
	keyImg.tint = 0x8B0000;
	keyImg.events.onInputDown.add(function() {
		options.gamepad = false;
		keyImg.tint = 0x0000A0;
		padImg.tint = 0x8B0000;
	}, this);

	padImg = game.add.sprite(this.game.width / 2 - 90, this.game.height / 2, 'gamepad');
	padImg.inputEnabled = true;
	padImg.tint = 0x0000A0;
	padImg.events.onInputDown.add(function() {
		options.gamepad = true;
		keyImg.tint = 0x8B0000;
		padImg.tint = 0x0000A0;
	}, this);

	startImg = game.add.sprite(this.game.width / 2 - 90, this.game.height / 2 + 70, 'start');
	startImg.inputEnabled = true;
	startImg.tint = 0x008000;
	startImg.events.onInputDown.add(function() {
		music.stop();
		shoot.play();
		init();
	}, this);
}

function init() {
	keyImg.destroy();
	padImg.destroy();
	startImg.destroy();

	music = game.add.audio('main');
	music.loop = true;
	music.volume = 1;
	music.play();

	shoot = game.add.audio('shoot2');
	shoot.volume = 0.2;
	shoot.allowMultiple = true;

	powerup = game.add.audio('powerup');
	powerup.volume = 0.5;

	explode = game.add.audio('explode');
	explode.volume = 0.3;
	explode.allowMultiple = true;

	jump = game.add.audio('jump');
	jump.volume = 0.5;

	miss = game.add.audio('miss');
	miss.volume = 0.5;

	hurt = game.add.audio('hurt');
	hurt.volume = 0.2;
	hurt.allowMultiple = true;

	nuke = game.add.audio('nuke');
	nuke.volume = 1;

	gameState.menu = false;
	gameState.game = true;

	enemies = new Enemy(game);
	enemies.init();

	releases = new Release(game);
	releases.init();

	score = new Score(game);
	score.setScoreElem();
}

// Controls
function controlHandler() {
	if (gameState.game) {
		if (options.gamepad) {
			if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
				player.move(-350);
			} else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
				player.move(350);
			}

			if (pad.justPressed(Phaser.Gamepad.XBOX360_A) && player.getSprite().body.touching.down) {
				player.jump();
				jump.play();
			}

			if (pad.justPressed(Phaser.Gamepad.XBOX360_X)) {
				player.fire();
				shoot.play();
			}
			if (pad.justPressed(Phaser.Gamepad.XBOX360_START)) {
				game.state.restart();
			}
		} else {
			if (cursors.left.isDown) {
				player.move(-350);
			} else if (cursors.right.isDown) {
				player.move(350);
			}

			if (jmpKey.isDown && player.getSprite().body.touching.down) {
				jump.play();
				player.jump();
			}

			if (attKey.isDown) {
				player.fire();
				shoot.play();
			}

			if (restartKey.isDown) {
				game.state.restart();
			}
		}
	} else if (gameState.menu) {
		if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || cursors.up.isDown && options.gamepad) {
			options.gamepad = false;
			keyImg.tint = 0x0000A0;
			padImg.tint = 0x8B0000;
		} else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || cursors.down.isDown && !options.gamepad) {
			options.gamepad = true;
			keyImg.tint = 0x8B0000;
			padImg.tint = 0x0000A0;
		}

		if (restartKey.isDown || pad.justPressed(Phaser.Gamepad.XBOX360_Y)) {
			music.stop();
			shoot.play();
			init();
		}
	} else {
		if (restartKey.isDown || pad.justPressed(Phaser.Gamepad.XBOX360_START)) {
			create();
		}
	}
}

function checkEndGame() {
	if (score && score.getScore() >= 2000 && !gameState.end) {
		gameState.game = false;
		gameState.end = true;

		game.add.sprite(this.game.width / 2 - 90, this.game.height / 2, 'win');
	}
}

function takeDamage(player, enemy) {
	score.modScore(-2);
	hurt.play();
}

function goodRelease(player, release) {
	powerup.play();
	score.modScore(100);
	release.kill();
	if (Math.random() > 0.8) {
		enemies.nuke();
		nuke.play();
	}
}

function failRelease(ground, release) {
	score.modScore(-50);
	release.kill();
	miss.play();
}

function dealDamage(bullet, enemy) {
	explode.play();
	enemy.kill();
	bullet.kill();
	score.modScore(10);
}
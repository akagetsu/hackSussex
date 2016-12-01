var app = new App(),
	game = app.game,
	player = new Player(),
	walls,
	ground,
	enemies,
	score,
	soundMan = new SoundMan(),
	controls = new Controls(),
	keyImg,
	padImg,
	startImg,
	leftTouch,
	rightTouch,
	jumpTouch,
	killTouch,
	touchDir = {
		left: false,
		right: false,
		jump: false,
		kill: false
	},
	options = {
		sounds: true,
		gamepad: true,
		touch: false
	},
	gameState = {
		menu: true,
		game: false,
		end: false
	};


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
	game.load.image('btnup', 'assets/btnup.png'); // sprite generated using GIMP
	game.load.image('btndn', 'assets/btndn.png'); // sprite generated using GIMP
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

function create() {
	// game setup
	app.initialise();

	// level setup
	walls = game.add.group();

	walls.enableBody = true;

	ground = walls.create(0, game.world.height - 50, 'ground');

	ground.body.immovable = true;

	var wall = walls.create(0, 0, 'wall');

	wall.body.immovable = true;

	wall = walls.create(game.world.width - 50, 0, 'wall');

	wall.body.immovable = true;

	player.initialise(game);
	controls.initialise(game);
	soundMan.initialise(game);

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
	soundMan.stopSound('intro');
	soundMan.stopSound('main');

	soundMan.playSound('intro');

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
		soundMan.stopSound('intro');
		soundMan.playSound('shoot1');
		init();
	}, this);
}

function init() {
	keyImg.destroy();
	padImg.destroy();
	startImg.destroy();

	soundMan.playSound('main');

	gameState.menu = false;
	gameState.game = true;

	enemies = new Enemy(game);
	enemies.init();

	releases = new Release(game);
	releases.init();

	score = new Score(game);
	score.setScoreElem();

	if (options.touch) {
		leftTouch = game.add.sprite(20, this.game.height - 60, 'btnup');
		leftTouch.inputEnabled = true;
		leftTouch.events.onInputDown.add(function() {
			leftTouch.loadTexture('btndn');
			touchDir.left = true;
		}, this);
		leftTouch.events.onInputUp.add(function() {
			leftTouch.loadTexture('btnup');
			touchDir.left = false;
		}, this);

		rightTouch = game.add.sprite(150, this.game.height - 60, 'btnup');
		rightTouch.inputEnabled = true;
		rightTouch.events.onInputDown.add(function() {
			rightTouch.loadTexture('btndn');
			touchDir.right = true;
		}, this);
		rightTouch.events.onInputUp.add(function() {
			rightTouch.loadTexture('btnup');
			touchDir.right = false;
		}, this);

		jumpTouch = game.add.sprite(280, this.game.height - 60, 'btnup');
		jumpTouch.inputEnabled = true;
		jumpTouch.events.onInputDown.add(function() {
			jumpTouch.loadTexture('btndn');
			touchDir.jump = true;
		}, this);
		jumpTouch.events.onInputUp.add(function() {
			jumpTouch.loadTexture('btnup');
			touchDir.jump = false;
		}, this);

		killTouch = game.add.sprite(410, this.game.height - 60, 'btnup');
		killTouch.inputEnabled = true;
		killTouch.events.onInputDown.add(function() {
			killTouch.loadTexture('btndn');
			touchDir.kill = true;
		}, this);
		killTouch.events.onInputUp.add(function() {
			killTouch.loadTexture('btnup');
			touchDir.kill = false;
		}, this);
	}
}

// Controls
function controlHandler() {
	if (gameState.game) {
		if (options.gamepad) {
			if (controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
				player.move(-350);
			} else if (controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
				player.move(350);
			}

			if (controls.pad.justPressed(Phaser.Gamepad.XBOX360_A) && player.getSprite().body.touching.down) {
				player.jump();
				soundMan.playSound('jump');
			}

			if (controls.pad.justPressed(Phaser.Gamepad.XBOX360_X)) {
				player.fire();
				soundMan.playSound('shoot2');
			}
			if (controls.pad.justPressed(Phaser.Gamepad.XBOX360_START)) {
				soundMan.stopSound('main');
				game.state.restart();
			}
		} else if (!options.gamepad && !options.touch) {
			if (controls.keyboard.cursorKeys.left.isDown) {
				player.move(-350);
			} else if (controls.keyboard.cursorKeys.right.isDown) {
				player.move(350);
			}

			if (controls.keyboard.jumpKey.isDown && player.getSprite().body.touching.down) {
				soundMan.playSound('jump');
				player.jump();
			}

			if (controls.keyboard.attackKey.isDown) {
				player.fire();
				soundMan.playSound('shoot2');
			}

			if (controls.keyboard.restartKey.isDown) {
				soundMan.stopSound('main');
				game.state.restart();
			}
		} else if (!options.gamepad && options.touch) {
			if (touchDir.left) {
				player.move(-350);
			} else if (touchDir.right) {
				player.move(350);
			}

			if (touchDir.jump && player.getSprite().body.touching.down) {
				soundMan.playSound('jump');
				player.jump();
			}

			if (touchDir.kill) {
				player.fire();
				soundMan.playSound('shoot2');
			}
		}
	} else if (gameState.menu) {
		if (controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || controls.keyboard.cursorKeys.up.isDown && options.gamepad) {
			options.gamepad = false;
			keyImg.tint = 0x0000A0;
			padImg.tint = 0x8B0000;
		} else if (controls.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || controls.keyboard.cursorKeys.down.isDown && !options.gamepad) {
			options.gamepad = true;
			keyImg.tint = 0x8B0000;
			padImg.tint = 0x0000A0;
		}

		if (controls.keyboard.restartKey.isDown || controls.pad.justPressed(Phaser.Gamepad.XBOX360_Y)) {
			soundMan.stopSound('intro');
			soundMan.stopSound('main');
			soundMan.playSound('shoot1');
			init();
		}
	} else {
		if (controls.keyboard.restartKey.isDown || controls.pad.justPressed(Phaser.Gamepad.XBOX360_START)) {
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
	soundMan.playSound('hurt');
}

function goodRelease(player, release) {
	soundMan.playSound('powerup');
	score.modScore(100);
	release.kill();
	if (Math.random() > 0.8) {
		enemies.nuke();
		soundMan.playSound('nuke');
	}
}

function failRelease(ground, release) {
	score.modScore(-50);
	release.kill();
	soundMan.playSound('miss');
}

function dealDamage(bullet, enemy) {
	soundMan.playSound('explode');
	enemy.kill();
	bullet.kill();
	score.modScore(10);
}
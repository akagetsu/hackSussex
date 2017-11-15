var game = new Game(),
	player,
	scene,
	enemies,
	score,
	soundMan,
	controls,
	menu,
	keyImg,
	padImg,
	startImg,
	options = {
		gamepad: false,
		keyboard: false,
		touch: true
	},
	touchDir = {
		left: false,
		right: false,
		jump: false,
		kill: false
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
	game.load.image('touch', 'assets/touch.png'); // font used http://www.dafont.com/8bit-wonder.font
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
	game.initialise();

	scene = new Scene(game);
	player = new Player(game);
	controls = new Controls(game);
	soundMan = new SoundMan(game);
	menu = new Menu(game);
	options = menu.options;
}

function update() {
	physicsHandler();
	player.update();

	if (options.gamepad) {
		controls.handleGamepadControls();
	} else if (options.keyboard) {
		controls.handleKeyControls();
	} else if (options.touch && menu.touchDir) {
		controls.handleTouchControls(menu.touchDir);
	}

	checkEndGame();
}

function physicsHandler() {
	player.scenePhysics(scene.walls);
	if (gameState.game) {
		game.physics.arcade.collide(enemies.getEnemies(), scene.walls); // enemy collision with walls
		game.physics.arcade.overlap(player.getSprite(), enemies.getEnemies(), takeDamage, null, this);
		game.physics.arcade.overlap(player.getBullets(), enemies.getEnemies(), dealDamage, null, this);
		game.physics.arcade.overlap(player.getSprite(), releases.getReleases(), goodRelease, null, this);
		game.physics.arcade.overlap(scene.ground, releases.getReleases(), failRelease, null, this);
	}
}

function init() {
	menu.destroyImg();

	soundMan.playSound('main');

	gameState.menu = false;
	gameState.game = true;

	enemies = new Enemies(game);

	releases = new Release(game);
	releases.init();

	score = new Score(game);
	score.setScoreElem();

	if (options.touch) {
		menu.initialiseTouchMenu();
	}
}

// Controls
function controlHandler() {
	if (gameState.game) {
		controls.handleGameControls();
	} else if (gameState.menu) {
		controls.handleMenuControls();
	} else {
		controls.handleGenericControls();
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
function SoundMan() {
	this.game = null;
	this.intro = null;
	this.main = null;
	this.shoot1 = null;
	this.shoot2 = null;
	this.powerup = null;
	this.jump = null;
	this.miss = null;
	this.hurt = null;
	this.nuke = null;
}

SoundMan.prototype.initialise = function initialise(game) {
	this.game = game;

	this.intro = this.game.add.audio('intro');
	this.intro.volume = 1;

	this.main = this.game.add.audio('main');
	this.main.loop = true;
	this.main.volume = 1;

	this.shoot = this.game.add.audio('shoot');
	this.shoot.volume = 0.3;

	this.shoot2 = this.game.add.audio('shoot2');
	this.shoot2.volume = 0.2;
	this.shoot2.aloowMultiple = true;

	this.powerup = this.game.add.audio('powerup');
	this.powerup.volume = 0.5;

	this.explode = this.game.add.audio('explode');
	this.explode.volume = 0.3;
	this.explode.allowMultiple = true;

	this.jump = this.game.add.audio('jump');
	this.jump.volume = 0.5;

	this.miss = this.game.add.audio('miss');
	this.miss.volume = 0.5;

	this.hurt = this.game.add.audio('hurt');
	this.hurt.volume = 0.2;
	this.hurt.allowMultiple = true;

	this.nuke = this.game.add.audio('nuke');
	this.nuke.volume = 1;
};

SoundMan.prototype.playSound = function playSound(sound) {
	if(!this[sound])
		return;
	this[sound].play();
};

SoundMan.prototype.stopSound = function stopSound(sound) {
	if(!this[sound])
		return;
	this[sound].stop();
};
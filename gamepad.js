function Gamepad(game) {
	this.game = game;
	this.pad = null;
}

Gamepad.prototype.init = function init() {
	this.game.input.gamepad.start();
	this.pad = game.input.gamepad.pad1;
	return this.pad;
};
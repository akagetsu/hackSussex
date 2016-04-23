function Score(game) {
	this.game = game;
	this.val = 0;
	this.scoreElem = null;
}

Score.prototype.modScore = function modScore(val) {
	this.val += val;
	if (this.val < 0) {
		this.val = 0;
	}
	this.upText();
};

Score.prototype.upText = function upText() {
	this.scoreElem.text = this.val;
};

Score.prototype.setScoreElem = function setScoreElem() {
	this.scoreElem = this.game.add.text(this.game.width / 2, 10, '0', {
		fontSize: '32px',
		fill: '#fff'
	});
	this.game.add.sprite(10, 10, 'watchers').scale.setTo(2);
	this.game.add.sprite(this.game.width - 40, 10, 'watchers').scale.setTo(2);
};

Score.prototype.getScore = function getScore() {
	return this.val;
};

Score.prototype.getText = function getText() {
	return this.scoreElem.text;
};
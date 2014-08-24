// Components
// =================================================================
Crafty.c("PC", {
	facing: {x:0, y:1},
	laserHeat: 0,
	points: 0,
	scoreTally: null,
	init: function() {
		this.addComponent("2D, DOM, Collision, Fourway, Color, Keyboard");
		this.fourway(4);
		this.attr({x: 20, y: 20, w:20, h:20});
		this.bind("EnterFrame", this.update);
		this.bind("bisonKilled", this.score);
		this.collision(new Crafty.polygon([0, 0], [this.w, 0], [this.w, this.h], [0, this.h]));
		this.onHit("Enemy", function() {
			Crafty.scene("GameOver");
		});
		this.addComponent("AlienSprite, SpriteAnimation").reel('WalkRight', 400, 0,0,2);
		this.reel('WalkLeft', 400, 2,0,2);
		this.reel('WalkUp', 400, 0,1,2);
		this.reel('WalkDown', 400, 2,1,2);
		this.animate('WalkRight', -1);
		this.scoreTally = Crafty.e("2D, DOM, Text").attr({x: 10, y: 460})
				 .text(0).textColor("#FF0000").textFont({size:'30px'});

	},
	update: function() {
		if(this.isDown('SPACE')){
			if(!this.laserHeat) {
				Crafty.e("LaserBlast")
				.attr({x: this.x, y: this.y})
				.direction(this.facing.x, this.facing.y);
				this.laserHeat = 15;
			}
		}
		if(this.isDown('RIGHT_ARROW')) {
			this.changeDirection('RIGHT');
		}
		else if(this.isDown('LEFT_ARROW')) {
			this.changeDirection('LEFT');
		}
		else if(this.isDown('DOWN_ARROW')) {
			this.changeDirection('DOWN');
		}
		else if(this.isDown('UP_ARROW')) {
			this.changeDirection('UP');
		}
		if(this.laserHeat) {
			this.laserHeat -= 1;
		}
	},
	score: function() {
		this.points += 1;
		this.scoreTally.text(this.points);
		if(this.points >= 20) {
			Crafty.scene("Transition");
		}
	},
	changeDirection: function(direction) {
		switch(direction) {
			case 'RIGHT':
				this.facing = {x: 1, y:0};
				this.animate('WalkRight', -1);
				break;
			case 'LEFT':
				this.facing = {x: -1, y:0};
				this.animate('WalkLeft', -1);
				break;
			case 'DOWN':
				this.facing = {x: 0, y: 1};
				this.animate('WalkDown', -1);
				break;
			case 'UP':
				this.facing = {x: 0, y: -1};
				this.animate('WalkUp', -1);
				break;
		}
	},
});

Crafty.c("LaserBlast", {
	velocity: {x: 5, y: 0},
	init: function() {
		this.addComponent("2D, DOM, Collision, Color");
		this.color("#FFFF00");
		this.w = 40;
		this.h = 10;
		this.velocity = {x: 5, y: 0};
		this.bind("EnterFrame", this.update);
		Crafty.audio.play("Laser");
	},
	update: function() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		if(this.x > 700 || this.x - this.w < 0 || this.y > 500 || this.y - this.h < 0){
			this.destroy();
		}
	},
	direction: function(x, y) {
		this.velocity.x = 5 * x;
		this.velocity.y = 5 * y;
		if(this.velocity.x){
			this.w = 40;
			this.h = 10;
		}
		else {
			this.w = 10;
			this.h = 40;
		}
	}
});

Crafty.c("Enemy", {
	target: false,
	init: function() {
		this.addComponent("2D, DOM, Collision, Color, SpriteAnimation, BisonSprite");
		this.attr({x:680, y: Crafty.math.randomInt(0, 480), w: 20, h: 20});
		this.collision(new Crafty.polygon([0,0],[this.w,0],[this.w, this.h], [0,this.h]));
		this.onHit("LaserBlast", function() {
			Crafty.trigger("bisonKilled");
			this.destroy();
		});
		this.bind("EnterFrame", this.update);
		this.reel('Movement', 400, 0,0,2);
		this.animate("Movement", -1);
	},
	update: function() {
		if(this.target) {
			if(this.target.y < this.y) {
				this.y -= 1;
				this.animate("MoveUp", -1);
			}
			else if(this.target.y > this.y) {
				this.y += 1;
				this.animate("MoveDown", -1);
			}
			if(this.target.x < this.x) {
				this.x -= 1;
				this.animate("MoveLeft", -1);
			}
			else if(this.target.x > this.x) {
				this.x += 1;
				this.animate("MoveRight", -1);
			}
		}
		else {
		this.x -= 1;
		if(this.x - this.w < 0) {
			this.destroy();
			}
		}
	},
	setTarget: function(target) {
		this.target = target;
		this.removeComponent("BisonSprite");
		this.addComponent("CreepyHead");
		this.reel("MoveDown", 1000, 0,0,1);
		this.reel("MoveRight", 1000, 1,0,1);
		this.reel("MoveLeft", 1000, 0,1,1);
		this.reel("MoveUp", 1000, 1,1,1);
	}
});
// Components
// =================================================================
Crafty.c("PC", {
	facing: {x:0, y:1},
	laserHeat: 0,
	init: function() {
		this.addComponent("2D, DOM, Collision, Fourway, Color,Keyboard");
		this.color("#FF0000");
		this.fourway(4);
		this.attr({x: 20, y: 20, w:20, h:20});
		this.bind("EnterFrame", this.update);
	},
	update: function() {
		if(this.isDown('SPACE')){
			if(!this.laserHeat) {
				var dude = Crafty.e("LaserBlast")
				.attr({x: this.x, y: this.y})
				.direction(this.facing);
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
	changeDirection: function(direction) {
		switch(direction) {
			case 'RIGHT':
				this.facing = {x: 1, y:0};
				break;
			case 'LEFT':
				this.facing = {x: -1, y:0};
				break;
			case 'DOWN':
				this.facing = {x: 0, y: 1};
				break;
			case 'UP':
				this.facing = {x: 0, y: -1};
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
		this. h = 10;
		this.bind("EnterFrame", this.update);
	},
	update: function() {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		if(this.x > 700 || this.x - this.w < 0 || this.y > 500 || this.y - this.h < 0){
			this.destroy();
		}
	},
	direction: function(way) {
		this.velocity.x = 5 * way.x;
		this.velocity.y = 5 * way.y;
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
	init: function() {
		this.addComponent("2D, DOM, Collision, Color");
		this.color("#00FFFF");
		this.attr({x:680, y: 480, w: 20, h: 20});
	}
});
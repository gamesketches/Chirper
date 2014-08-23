// Components
// =================================================================
Crafty.c("PC", {
	init: function() {
		this.addComponent("2D, DOM, Collision, Fourway, Color,Keyboard");
		this.color("#FF0000");
		this.fourway(4);
		this.attr({x: 20, y: 20, w:20, h:20});
		this.bind("EnterFrame", this.update);
	},
	update: function() {
		if(this.isDown('SPACE')){
			Crafty.e("LaserBlast")
			.attr({x: this.x, y: this.y});
		}
	}
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
	}
});

Crafty.c("Enemy", {
	init: function() {
		this.addComponent("2D, DOM, Collision, Color");
		this.color("#00FFFF");
		this.attr({x:680, y: 480, w: 20, h: 20});
	}
});
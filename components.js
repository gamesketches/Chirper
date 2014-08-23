// Components
// =================================================================
Crafty.c("PC", {
	init: function() {
		this.addComponent("2D, DOM, Collision, Fourway, Color");
		this.color("#FF0000");
		this.fourway(4);
		this.attr({x: 20, y: 20, w:20, h:20});
	}
});
var Zombie = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/zombie.png' );
        this.hp = 10;
    },
    update: function( dt ) {
		var pos = this.getPosition();
		if ( pos.x > -40 ) {
	    	this.setPosition( new cc.Point( pos.x -1, pos.y ) );
		} else {
	    	this.setPosition( new cc.Point( 840, pos.y ) );
		}
		if(this.hp <= 0) {
    		this.removeFromParent(true);
    	}
    },
    getShot: function( dmg ) {
    	this.hp -= dmg;
    	console.log("remaining hp : " + this.hp);
    }
});
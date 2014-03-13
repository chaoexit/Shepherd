var Zombie = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/zombie.png' );
    },
    update: function( dt ) {
		var pos = this.getPosition();
		if ( pos.x > -40 ) {
	    	this.setPosition( new cc.Point( pos.x -5, pos.y ) );
		} else {
	    	this.setPosition( new cc.Point( 840, pos.y ) );
		}
    }
});
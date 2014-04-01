var Zombie = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/zombie.png' );
        this.hp = 10;
    },
    update: function( dt ) {
		var pos = this.getPosition();
		if ( pos.x > -40 ) {
	    	this.setPosition( new cc.Point( pos.x - 0.3, pos.y ) );
		} else {
	    	this.setPosition( new cc.Point( 840, pos.y ) );
		}
		if(this.hp <= 0) {
    		this.removeFromParent(true);
    	}
    },
    getShot: function( dmg ) {
        if( this.hp - dmg == 0 ) {
            this.hp -= dmg;
            console.log("remaining hp : " + this.hp);
            return true;
        }
    	this.hp -= dmg;
    	console.log("remaining hp : " + this.hp);
        return false;
    }
});
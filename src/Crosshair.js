var Crosshair = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/crosshair2.png' );
    },
    move: function( input ) {
    var pos = this.getPosition();
    	if( input == 37 ) {
			if ( pos.x > 5 ) {
		    	this.setPosition( new cc.Point( pos.x -10, pos.y ) );
			} 
			else {
		    	this.setPosition( new cc.Point( 0, pos.y ) );
		    }
    	}
    	else if ( input == 38 ) {
			if ( pos.y < 600 ) {
		    	this.setPosition( new cc.Point( pos.x , pos.y + 10 ) );
			} 
			else {
		    	this.setPosition( new cc.Point( pos.x, 600 ) );
		    }
    	}
    	else if ( input == 39 ) {
			if ( pos.x < 800 ) {
		    	this.setPosition( new cc.Point( pos.x + 10, pos.y ) );
			} 
			else {
		    	this.setPosition( new cc.Point( 800, pos.y ) );
		    }
    	}
    	else if ( input == 40 ) {
			if ( pos.y > 0 ) {
		    	this.setPosition( new cc.Point( pos.x , pos.y - 10 ) );
			} 
			else {
		    	this.setPosition( new cc.Point( pos.x, 0 ) );
		    }
    	}
	}
});
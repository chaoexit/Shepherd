var Crosshair = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/crosshair2.png' );
        this.isLeft = false;
        this.isRight = false;
        this.isUp = false;
        this.isDown = false;
    },
    press: function( input ) {
    	if ( input == 37 ) {
    		this.isLeft = true;
    	}
    	if ( input == 38 ) {
    		this.isUp = true;
    	}
    	if ( input == 39 ) {
    		this.isRight = true;
    	}
    	if ( input == 40 ) {
    		this.isDown = true;
    	}
	},
	release: function( input ) {
    	if ( input == 37 ) {
    		this.isLeft = false;
    	}
    	if ( input == 38 ) {
    		this.isUp = false;
    	}
    	if ( input == 39 ) {
    		this.isRight = false;
    	}
    	if ( input == 40 ) {
    		this.isDown = false;
    	}
	},
	update: function() {
		var pos = this.getPosition();
	    if(this.isLeft) {
	    	if ( pos.x > 5 ) {
		    	this.setPosition( new cc.Point( pos.x - 4, pos.y ) );
			} 
			else {
		    	this.setPosition( new cc.Point( 0, pos.y ) );
		    }
	    }
	    if(this.isUp) {
	    	if ( pos.y < 600 ) {
		    	this.setPosition( new cc.Point( pos.x , pos.y + 4 ) );
			} 
			else {
		    	this.setPosition( new cc.Point( pos.x, 600 ) );
		    }
	    }
	    if(this.isRight) {
	    	if ( pos.x < 800 ) {
		    	this.setPosition( new cc.Point( pos.x + 4, pos.y ) );
			} 
			else {
		    	this.setPosition( new cc.Point( 800, pos.y ) );
		    }
	    }
	    if(this.isDown) {
	    	if ( pos.y > 0 ) {
		    	this.setPosition( new cc.Point( pos.x , pos.y - 4 ) );
			} 
			else {
		    	this.setPosition( new cc.Point( pos.x, 0 ) );
		    }
	    }
    },
    closeTo: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( ( Math.abs( myPos.x - oPos.x ) <= 23 ) &&
		 ( Math.abs( myPos.y - oPos.y ) <= 35 ) );
    },
    closeToHead: function( obj ) {
        var myPos = this.getPosition();
        var oPos = obj.getPosition();
        return ( ( Math.abs( myPos.x - oPos.x ) <= 5 ) &&
         ( myPos.y - oPos.y ) <= 35 && (myPos.y - oPos.y) >= 18 );
    }
});
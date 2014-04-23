var Crosshair = cc.Sprite.extend({
    ctor: function( obj ) {
        this._super();
        this.initWithFile( 'images/crosshair2.png' );
        this.gameLayer = obj;
        this.isLeft = false;
        this.isRight = false;
        this.isUp = false;
        this.isDown = false;
        this.ammo = 7;
        this.fireRate = 0;
        this.reloadTime = 1.5;
        this.reloading = false;
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
        this.gameLayer.ammoLabel.setString( 'ammo  ' + this.ammo );
        if ( this.fireRate > 0) {
            this.fireRate -= 1;
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
    },

    fire:function () {
        if(this.ammo <= 0) {
            return;
        }
        if(this.fireRate > 0) {
            return;
        }
        if( this.ammo == 1) {
            this.gameLayer.addChild(this.gameLayer.outOfAmmoLabel);
        }
        this.ammo -= 1;
        this.fireRate = 20;
        cc.AudioEngine.getInstance().playEffect( 'effects/gunfire.wav' );
        var tempDistance = 0;
        var target = 0;
        for(var i = 0; i < this.gameLayer.zombie.length; i++) {
            if(this.gameLayer.zombie[i].state == 0) {
                continue;
            }
            var x = Math.pow(this.getPosition().x-this.gameLayer.zombie[i].getPosition().x, 2);
            var y = Math.pow(this.getPosition().y-this.gameLayer.zombie[i].getPosition().y, 2);
            var distance = Math.sqrt(x+y)
            if( i == 0 || distance < tempDistance) {
                target = i;
                tempDistance = distance;
            }
        }
        var randomAmount = Math.round(Math.random()*100);
        var randomAmountHeadShot = Math.round(Math.random()*200);
        if(this.closeToHead(this.gameLayer.zombie[target])) {
            console.log('headshot!!');
            if ( this.gameLayer.zombie[target].getShot(5) ) {
                    this.gameLayer.money += randomAmountHeadShot;
                    this.gameLayer.moneyLabel.setString('' + this.gameLayer.money );
                    this.gameLayer.activeScore(randomAmountHeadShot);
            }
        }        
        else if(this.closeTo(this.gameLayer.zombie[target]) && this.gameLayer.zombie[target].state != 3) {
            if ( this.gameLayer.zombie[target].getShot(1) ) {
                this.gameLayer.money += randomAmount;
                this.gameLayer.moneyLabel.setString('' + this.gameLayer.money );
                this.gameLayer.activeScore(randomAmount);
            }
        }
    },

    reload: function() {
        if(this.reloading == false) {
            cc.AudioEngine.getInstance().playEffect( 'effects/reload.wav' );
            this.ammo = 0;
            this.reloading = true;
            this.gameLayer.removeChild(this.gameLayer.outOfAmmoLabel);
            this.gameLayer.addChild(this.gameLayer.reloadLabel);
            this.scheduleOnce(function() {
                this.ammo = 7;
                this.gameLayer.removeChild(this.gameLayer.reloadLabel);
                this.reloading = false
            }    , this.reloadTime);
        }
    }
});
var Crosshair = cc.Sprite.extend({
    ctor: function( obj ) {
        this._super();
        this.initWithFile( 'images/crosshair2.png' );
        this.currentGun = Crosshair.Gun.Deagle;
        this.initialGunData();
        this.gameLayer = obj;
        this.isLeft = false;
        this.isRight = false;
        this.isUp = false;
        this.isDown = false;
        this.magazine = 10;
        this.ammo = this.ammoList[this.currentGun];
        this.fireRate = 0;
        this.reloadTime = 1.5;
        this.reloading = false;
    },

    initialGunData: function() {
        this.ammoList = new Array(3);
        this.ammoList[0] = 7;
        this.ammoList[1] = 15;
        this.ammoList[2] = 30;

        this.fireRateList = new Array(3);
        this.fireRateList[0] = 14;
        this.fireRateList[1] = 7;
        this.fireRateList[2] = 3;
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
        this.gameLayer.magazineLabel.setString( 'magazine  ' + this.magazine );
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
        this.fireRate = this.fireRateList[this.currentGun];
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

    buy: function(input) {
        if( this.gameLayer.gameState != GameLayer.STATE.NORMAL ) {
            return;
        }
        if( input == 49 ) {
            if( this.gameLayer.money >= 200 ) {
                this.gameLayer.minusMoney(200);
                this.gameLayer.money -= 200;
                this.magazine += 1;
                this.gameLayer.magazineLabel.setString( 'magazine  ' + this.magazine );
            }
            else {
                this.gameLayer.warn("Not enough money, require 200 gold");
            }
        }
        else if ( input == 50 ) {
            if( this.gameLayer.money >= 3000 && this.currentGun < Crosshair.Gun.MP5 ) {
                this.gameLayer.minusMoney(3000);
                this.gameLayer.money -= 3000;
                this.currentGun = Crosshair.Gun.MP5;
                this.ammo = this.ammoList[this.currentGun];
            }
            else if ( this.currentGun >= Crosshair.Gun.MP5 ) {
                this.gameLayer.warn("You already have MP5 or higher destructive gun");
            }
            else {
                this.gameLayer.warn("Not enough money, require 3000 gold for MP5");
            }            
        }
        else if ( input == 51 ) {
            if( this.gameLayer.money >= 7000 && this.currentGun < Crosshair.Gun.M4A1 ) {
                this.gameLayer.minusMoney(7000);
                this.gameLayer.money -= 7000;
                this.currentGun = Crosshair.Gun.M4A1;
                this.ammo = this.ammoList[this.currentGun];
            }
            else if ( this.currentGun >= Crosshair.Gun.M4A1 ) {
                this.gameLayer.warn("You already have M4A1 or higher destructive gun");
            }
            else {
                this.gameLayer.warn("Not enough money, require 7000 gold for M4A1");
            }            
        }
    },

    reload: function() {
        if( this.magazine <= 0 ) {
            return;
        }
        if(this.reloading == false) {
            cc.AudioEngine.getInstance().playEffect( 'effects/reload.wav' );
            this.ammo = 0;
            this.reloading = true;
            this.gameLayer.removeChild(this.gameLayer.outOfAmmoLabel);
            this.gameLayer.addChild(this.gameLayer.reloadLabel);
            this.scheduleOnce(function() {
                this.ammo = this.ammoList[this.currentGun];
                this.magazine -= 1;
                this.gameLayer.removeChild(this.gameLayer.reloadLabel);
                this.reloading = false
            }, this.reloadTime);
        }
    }
});

Crosshair.Gun = {
    Deagle: 0,
    MP5: 1,
    M4A1: 2
};

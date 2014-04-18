var Zombie = cc.Layer.extend({
    spriteSheet:null,
    runningAction:null,
    sprite:null,
    ctor: function( dt , gameLayer) {
        this._super();
        this.init();
        this.gameLayer = gameLayer;
        if( dt == 1 ) {
            this.state = 2;
        }
    },
    init: function() { 
        this._super();
        this.hp = 10;
        this.state = 1;
        cc.SpriteFrameCache.getInstance().addSpriteFrames("images/testSprite.plist");
        this.sprite = cc.Sprite.createWithSpriteFrameName("walk1.png");
        this.sprite.setAnchorPoint( new cc.Point( 0.5, 0.5 ) );
        this.actionRun();
        this.addChild(this.sprite);
    },
    update: function( dt ) {
		var pos = this.getPosition();
        if(this.state == 0) {
            return;
        }
		if ( pos.x > 144 ) {
	    	this.setPosition( new cc.Point( pos.x - ((Math.random() + 0.3)/ 2), pos.y ) );
		} else {
	    	this.gameLayer.gameOver();
		}
		if(this.hp <= 0) {
            this.deadAnim();
    	}
    },
    removeMe: function( dts ) {
        this.removeFromParent(true);
    },
    deadAnim: function() {
        if( this.state == 0) {
            return;
        }
        this.sprite.stopAllActions();
        this.state = 0;
        var deadAnimFrames = [];
        for (var i = 1; i < 4; i++) {
            var str = "dead" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            deadAnimFrames.push(frame);
        }
        var animation = cc.Animation.create(deadAnimFrames, 0.2);
        this.runningAction =  cc.Repeat.create(cc.Animate.create(animation), 1);
        this.sprite.runAction(this.runningAction);
        this.scheduleOnce(this.removeMe, 3);
    },
    getShot: function( dmg ) {
    	this.hp -= dmg;
    	console.log("remaining hp : " + this.hp);
        if( this.hp == 0 ) {
            return true; //Zombie Died
        }
        console.log(this.getPosition().x + " , " + this.getPosition().y); //Debug
        return false; //Zombie Alive
    }, 

    pause: function() {
        this.unscheduleUpdate();
        this.sprite.stopAllActions();
    },

    resume: function() {
        this.scheduleUpdate();
        this.actionRun();
    },

    actionRun: function() {
        var animFrames = [];
        for (var i = 1; i < 11; i++) {
            var str = "walk" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = cc.Animation.create(animFrames, 0.25);
        this.runningAction = cc.RepeatForever.create(cc.Animate.create(animation));
        this.sprite.runAction(this.runningAction);
    }
});
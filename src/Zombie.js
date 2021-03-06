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
        this.isMoneyDrop = 0;
        this.speed = ((Math.random() + 0.3)/ 2);
        cc.SpriteFrameCache.getInstance().addSpriteFrames("images/testSprite.plist");
        this.sprite = cc.Sprite.createWithSpriteFrameName("walk1.png");
        this.sprite.setAnchorPoint( new cc.Point( 0.5, 0.5 ) );
        this.HealthBar = new HealthBar();
        this.HealthBar.setPosition(this.HealthBar.getPosition().x + 20, this.HealthBar.getPosition().y);
        this.sprite.addChild(this.HealthBar);
        this.actionRun();
        this.addChild(this.sprite);
    },
    update: function( dt ) {
		var pos = this.getPosition();
        this.HealthBar.setScaleX(this.hp/10);
        if(this.state == 0) {
            return;
        }
		if ( pos.x > 144 ) {
	    	this.setPosition( new cc.Point( pos.x - this.speed, pos.y ) );
		} else {
	    	this.gameLayer.gameOver();
		}
		if(this.hp <= 0) {
            this.sprite.removeChild(this.HealthBar);
            this.deadAnim();
            this.state = 0;
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
        var deadAnimFrames = [];
        for (var i = 1; i < 4; i++) {
            var str = "dead" + i + ".png";
            var frame = cc.SpriteFrameCache.getInstance().getSpriteFrame(str);
            deadAnimFrames.push(frame);
        }
        cc.AudioEngine.getInstance().playEffect( 'effects/zombiedead.mp3' );
        var animation = cc.Animation.create(deadAnimFrames, 0.2);
        this.runningAction =  cc.Repeat.create(cc.Animate.create(animation), 1);
        this.sprite.runAction(this.runningAction);
        this.scheduleOnce(this.removeMe, 3);
    },
    getShot: function( dmg ) {
        if( this.hp <= 0 ) {
            return false;
        }
    	this.hp -= dmg;
        if( this.hp <= 0 ) {
            return true; //Zombie Died
        }
        else {
            cc.AudioEngine.getInstance().playEffect( 'effects/zombiegetshot.mp3' );
            return false; //Zombie Alive
        }
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
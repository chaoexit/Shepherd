var IntroScene = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );

        this.background = new IntroBG();
        this.background.setPosition( 400, 350);
        this.background.setOpacity(50);
        this.runAction( cc.FadeIn.create(2.0) );
        this.addChild(this.background);

        this.introLabel = cc.LabelTTF.create( 'Introduction', 'Arial', 40 );
        this.introLabel.setPosition( new cc.Point( 410, 650 ) );
        this.introLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.introLabel);

        this.movementIntroLabel = cc.LabelTTF.create( 'Move the crosshair by moving your cursor', 'Arial', 25 );
        this.movementIntroLabel.setPosition( new cc.Point( 410, 600 ) );
        this.movementIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.movementIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.movementIntroLabel);

        this.reloadIntroLabel = cc.LabelTTF.create( 'Press spacebar to fire     |     Press R to reload', 'Arial', 25 );
        this.reloadIntroLabel.setPosition( new cc.Point( 410 , 550 ) );
        this.reloadIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.reloadIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.reloadIntroLabel);   

        this.pauseIntroLabel = cc.LabelTTF.create( 'Press P to pause/resume the game', 'Arial', 25 );
        this.pauseIntroLabel.setPosition( new cc.Point( 400 , 500 ) );
        this.pauseIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.pauseIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.pauseIntroLabel);  

        this.buyMagazineIntroLabel = cc.LabelTTF.create( 'Press 1(not numpad) to buy a magazine(200)', 'Arial', 25 );
        this.buyMagazineIntroLabel.setPosition( new cc.Point( 400 , 450 ) );
        this.buyMagazineIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.buyMagazineIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.buyMagazineIntroLabel);   

        this.buyMP5IntroLabel = cc.LabelTTF.create( 'Press 2(not numpad) to buy a MP5(2000)', 'Arial', 25 );
        this.buyMP5IntroLabel.setPosition( new cc.Point( 400 , 400 ) );
        this.buyMP5IntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.buyMP5IntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.buyMP5IntroLabel);      

        this.buyM4A1IntroLabel = cc.LabelTTF.create( 'Press 3(not numpad) to buy a M4A1(7000)', 'Arial', 25 );
        this.buyM4A1IntroLabel.setPosition( new cc.Point( 400 , 350 ) );
        this.buyM4A1IntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.buyM4A1IntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.buyM4A1IntroLabel); 

        this.buyGrenadeIntroLabel = cc.LabelTTF.create( 'Press 4(not numpad) to buy a grenade(2000)', 'Arial', 25 );
        this.buyGrenadeIntroLabel.setPosition( new cc.Point( 400 , 300 ) );
        this.buyGrenadeIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.buyGrenadeIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.buyGrenadeIntroLabel); 

        this.modeIntroLabel = cc.LabelTTF.create( 'Press G to switch between gun,grenade mode', 'Arial', 25 );
        this.modeIntroLabel.setPosition( new cc.Point( 400 , 250 ) );
        this.modeIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.modeIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.modeIntroLabel); 

        this.muteIntroLabel = cc.LabelTTF.create( 'Press M to toggle mute', 'Arial', 25 );
        this.muteIntroLabel.setPosition( new cc.Point( 400 , 200 ) );
        this.muteIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.muteIntroLabel.runAction( cc.FadeIn.create(1.0));
        this.addChild(this.muteIntroLabel); 

        this.startButton = new startButton();
        this.startButton.setScaleX(0.5);
        this.startButton.setScaleY(0.3);
        this.startButton.setAnchorPoint(0.5, 0.5);
        this.startButton.setOpacity(100);
        this.startButton.setPosition( new cc.Point( 400 , 100 ) );
        this.addChild(this.startButton);
    },

    onMouseMoved: function (event) {
        var myPos = event.getLocation();
        var oPos = this.startButton.getPosition();
        if ( ( Math.abs( myPos.x - oPos.x ) <= 150 ) &&
         ( Math.abs( myPos.y - oPos.y ) <= 60 ) ) {
            this.startButton.setOpacity(200);
        }
        else {
            this.startButton.setOpacity(100);
        }
    },

    onMouseDown: function(events) {
        var myPos = events.getLocation();
        var oPos = this.startButton.getPosition();
        if ( ( Math.abs( myPos.x - oPos.x ) <= 150 ) &&
         ( Math.abs( myPos.y - oPos.y ) <= 60 ) ) {
            this.runAction( cc.FadeOut.create(1.0) );
            this.introLabel.runAction( cc.FadeOut.create(1.0) );
            this.movementIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.reloadIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.pauseIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyMagazineIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyMP5IntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyM4A1IntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyGrenadeIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.modeIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.startButton.runAction( cc.FadeOut.create(1.0) );
            this.muteIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.scheduleOnce(function() {
                cc.Director.getInstance().replaceScene( GameLayer.scene() );
            }, 3);
        }        
    },

});

var IntroBG = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/introBG.png' );
    }
});

var startButton = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/start.png' );
    }
});
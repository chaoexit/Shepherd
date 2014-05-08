var IntroScene = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.setKeyboardEnabled( true );

        this.background = new IntroBG();
        this.background.setPosition( 400, 350);
        this.background.setOpacity(50);
        this.runAction( cc.FadeIn.create(2.0) );
        this.addChild(this.background);

        this.introLabel = cc.LabelTTF.create( 'Introduction', 'Arial', 40 );
        this.introLabel.setPosition( new cc.Point( 410, 600 ) );
        this.addChild(this.introLabel);

        this.movementIntroLabel = cc.LabelTTF.create( 'Move the crosshair by moving your cursor', 'Arial', 25 );
        this.movementIntroLabel.setPosition( new cc.Point( 410, 550 ) );
        this.movementIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this.movementIntroLabel);

        this.reloadIntroLabel = cc.LabelTTF.create( 'Press spacebar to shoot     |     Press R to reload', 'Arial', 25 );
        this.reloadIntroLabel.setPosition( new cc.Point( 410 , 500 ) );
        this.reloadIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this.reloadIntroLabel);   

        this.pauseIntroLabel = cc.LabelTTF.create( 'Press P to pause/resume the game', 'Arial', 25 );
        this.pauseIntroLabel.setPosition( new cc.Point( 400 , 450 ) );
        this.pauseIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this.pauseIntroLabel);  

        this.buyMagazineIntroLabel = cc.LabelTTF.create( 'Press 1(not numpad) to buy a magazine', 'Arial', 25 );
        this.buyMagazineIntroLabel.setPosition( new cc.Point( 400 , 400 ) );
        this.buyMagazineIntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this.buyMagazineIntroLabel);   

        this.buyMP5IntroLabel = cc.LabelTTF.create( 'Press 2(not numpad) to buy a MP5(2500)', 'Arial', 25 );
        this.buyMP5IntroLabel.setPosition( new cc.Point( 400 , 350 ) );
        this.buyMP5IntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this.buyMP5IntroLabel);      

        this.buyM4A1IntroLabel = cc.LabelTTF.create( 'Press 3(not numpad) to buy a M4A1(7000)', 'Arial', 25 );
        this.buyM4A1IntroLabel.setPosition( new cc.Point( 400 , 300 ) );
        this.buyM4A1IntroLabel.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.addChild(this.buyM4A1IntroLabel); 
    },

    onKeyDown: function( e ) {
        if( e == 32) {
            this.runAction( cc.FadeOut.create(1.0) );
            this.introLabel.runAction( cc.FadeOut.create(1.0) );
            this.movementIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.reloadIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.pauseIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyMagazineIntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyMP5IntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.buyM4A1IntroLabel.runAction( cc.FadeOut.create(1.0) );
            this.scheduleOnce(function() {
                cc.Director.getInstance().replaceScene( GameLayer.scene() );
            }, 1);
        }
    }
});

var IntroBG = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/introBG.png' );
    }
});
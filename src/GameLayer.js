var GameLayer = cc.LayerColor.extend({
    init: function() {

        this.money = 0;
        this.spawnPosY = [547, 460, 377, 293, 212, 121, 44];

        this.gameState = GameLayer.STATE.NORMAL;
        this.muted = 0;

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.runAction( cc.FadeIn.create(3.0) );

        this.crosshair = new Crosshair(this);
        this.crosshair.scheduleUpdate()
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.initLabel();

        this.grass = new Grass();
        this.grass.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.grass);

        this.upperbar = new UpperBar();
        this.upperbar.setPosition( new cc.Point( 400, 650 ) );
        this.upperbar.setOpacity(100);
        this.addChild(this.upperbar);

        this.redline = new Redline();
        this.redline.setPosition( new cc.Point( 144, 300 ) );
        this.redline.setOpacity(200);

        this.initZombie();


        this.addChild(this.redline);
        this.addChild(this.ammoLabel);
        this.addChild(this.magazineLabel)
        this.addChild(this.moneyLabel);
        this.addChild(this.moneyTextLabel);
        this.addChild(this.crosshair, 1);
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );
        cc.AudioEngine.getInstance().setMusicVolume(0.7);
        cc.AudioEngine.getInstance().playMusic( 'effects/song.mp3', 100 );


        this.initGrenade();

        this.scheduleUpdate();
        return true;
    },

    update: function() {
        this.moneyLabel.setString('' + this.money );
    },

    initZombie: function() {
        this.zombie = new Array(15);
        for(var i = 0; i < this.zombie.length; i++) {
              this.zombie[i] = new Zombie(1, this);
        }
        this.scheduleOnce(this.spawnZombieAll, 1);
        this.schedule(this.spawnZombie, 2);
        cc.AudioEngine.getInstance().playEffect( 'effects/ambiance1.mp3' , 100 );
        cc.AudioEngine.getInstance().playEffect( 'effects/ambiance2.mp3' , 100 );
    },

    initLabel: function() {
        this.ammoLabel = cc.LabelTTF.create( 'ammo  ' + this.crosshair.ammo, 'Arial', 25 );
        this.ammoLabel.setPosition( new cc.Point( 670, 620 ) );

        this.magazineLabel = cc.LabelTTF.create( 'magazine  ' + this.crosshair.magazine, 'Arial', 25 );
        this.magazineLabel.setPosition( new cc.Point( 670, 660 ) );

        this.moneyLabel = cc.LabelTTF.create('' + this.money, 'Arial', 40 );
        this.moneyLabel.setPosition( new cc.Point( 250, 640 ) );

        this.moneyTextLabel = cc.LabelTTF.create( 'Money : ', 'Arial', 40 );
        this.moneyTextLabel.setPosition( new cc.Point( 100, 640 ) );

        this.reloadLabel = cc.LabelTTF.create( 'Reloading' , 'Arial', 40 );
        this.reloadLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.outOfAmmoLabel = cc.LabelTTF.create( 'Out of Ammo!!!' , 'Arial', 40 );
        this.outOfAmmoLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
    },

    initGrenade: function() {
        this.grenade = new Array(3);
        this.grenade[0] = new grenadeSprite();
        this.grenade[0].setPosition(350, 640);

        this.grenade[1] = new grenadeSprite();
        this.grenade[1].setPosition(450, 640);

        this.grenade[2] = new grenadeSprite();
        this.grenade[2].setPosition(550, 640);

        for(var i = 0; i < this.crosshair.grenade; i++) {
            this.addChild(this.grenade[i]);
        }
    },

    updateGrenade: function() {
        for(var i = 0; i < this.crosshair.grenade; i++) {
            this.addChild(this.grenade[i]);
        }
        for(var i = this.crosshair.grenade; i < this.grenade.length; i++) {
            this.removeChild(this.grenade[i]);
        }
    },

    onKeyDown: function( e ) {
        console.log(e);
        if(e == 77) {
            this.mute();
        }
        if( e == 71 ) {
            this.crosshair.changeMode();
        }
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.press(e);
        }
        if(e == 49 || e == 50 || e == 51 || e == 52) {
            this.crosshair.buy(e);
        }
        if( e == 80 ) {
            if ( this.gameState == GameLayer.STATE.NORMAL ) {
                this.gamePause();
            }
            else if ( this.gameState == GameLayer.STATE.PAUSE ) {
                this.gameResume();
            }
        }
        if( e == 81 && this.gameState == GameLayer.STATE.END ) {
            this.runAction( cc.FadeOut.create(2.0));
            this.scheduleOnce( function() {
                cc.Director.getInstance().replaceScene( new myApp.startScene() );
            }, 1);
        }
        if( e == 82 ) {
            if ( this.gameState != GameLayer.STATE.NORMAL ) {
                return;
            }
            this.crosshair.reload();
        }
        if( e == 32) {
            if ( this.gameState != GameLayer.STATE.NORMAL ) {
                return;
            }
            this.crosshair.fire();
        }
    },

    onKeyUp: function( e ) {
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.release(e);
        }
    },

    onMouseMoved: function (event) {
        this.crosshair.setPosition(cc.p( event.getLocation().x, event.getLocation().y));
        return true;
    },

    onMouseDown:function (events) {
        if ( this.gameState != GameLayer.STATE.NORMAL ) {
            return;
        }
        this.crosshair.fire();
        return true;
    },

    spawnZombieAll: function ( ) {
        var tempSpawnPosY = 0;
        var tempSpawnPosYNew = 0;
        var randomArray = 0;
        var lastX = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            randomArray = Math.round((Math.random()*6));    
            if( this.zombie[i] == null || this.zombie[i].state == 2 ) {
                if ( i == 0 ) {
                    tempSpawnPosY = this.spawnPosY[randomArray];
                    tempSpawnPosYNew = tempSpawnPosY;
                    lastX = 820 + (Math.random()*300);
                }
                else if ( i != 0 ) {
                    tempSpawnPosYNew = this.spawnPosY[randomArray];
                    while ( tempSpawnPosYNew == tempSpawnPosY ) {
                        tempSpawnPosYNew = this.spawnPosY[Math.round((Math.random()*6))];
                    }
                    tempSpawnPosY = tempSpawnPosYNew;
                }
                this.zombie[i] = new Zombie( 0, this);
                this.zombie[i].setPosition( lastX, tempSpawnPosYNew );
                this.addChild(this.zombie[i]);
                this.zombie[i].scheduleUpdate();
                lastX = this.zombie[i].getPosition().x + (Math.random()*200);
            }
        }
    },

    spawnZombie: function ( ) {
        var amount = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            if( this.zombie[i] == null || this.zombie[i].state == 0 ) {
                var randomArray = Math.round((Math.random()*6));
                this.zombie[i] = new Zombie( 0, this);
                this.zombie[i].setPosition( 820, this.spawnPosY[randomArray] );
                this.addChild(this.zombie[i]);
                this.zombie[i].scheduleUpdate();
                return;
            }
        }
    },

    gameOver: function() {
        this.gameOverLabel = cc.LabelTTF.create( '      Game Over\n Press Q to restart', 'Arial', 40 );
        this.gameOverLabel.setPosition( new cc.Point( 400, 550 ) );
        this.addChild(this.gameOverLabel);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i].pause();
        }
        this.unschedule(this.spawnZombie);
        this.gameState = GameLayer.STATE.END;
    },

    gamePause: function() {
        this.gamePauseLabel = cc.LabelTTF.create( '         Paused\n Press P to resume', 'Arial', 40 );
        this.gamePauseLabel.setPosition( new cc.Point( 400, 550 ) );
        this.addChild(this.gamePauseLabel);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i].pause();
        }
        this.unschedule(this.spawnZombie);
        this.gameState = GameLayer.STATE.PAUSE;
    },

    gameResume: function() {
        this.removeChild(this.gamePauseLabel);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i].resume();
        }
        this.schedule(this.spawnZombie, 2);  
        this.gameState = GameLayer.STATE.NORMAL;      
    }, 

    activeScore: function( amount ){
        var score = cc.LabelTTF.create( '+ ' + amount,  'Arial', 40 );
        score.setPosition( cc.p(250,610) );
        score.setVisible( false );
        var actions = [];
        actions.push( cc.Show.create() );
        actions.push( cc.FadeIn.create(0.1) );
        actions.push( cc.MoveBy.create( 0.2, cc.p( 0, 30 ) ) );
        actions.push( cc.FadeOut.create(0.5) );
        // actions.push( cc.Hide.create() );
        actions.push( cc.CallFunc.create( score.removeFromParent, score, true));
        score.runAction( cc.Sequence.create( actions ) );
        this.addChild( score );
    },

    minusMoney: function( amount ){
        var score = cc.LabelTTF.create( '- ' + amount,  'Arial', 40 );
        score.setPosition( cc.p(250,640) );
        score.setVisible( false );
        var actions = [];
        actions.push( cc.Show.create() );
        actions.push( cc.FadeIn.create(0.1) );
        actions.push( cc.MoveBy.create( 0.2, cc.p( 0, -30 ) ) );
        actions.push( cc.FadeOut.create(0.5) );
        // actions.push( cc.Hide.create() );
        actions.push( cc.CallFunc.create( score.removeFromParent, score, true));
        score.runAction( cc.Sequence.create( actions ) );
        this.addChild( score );
    },

    warn: function( message ){
        var score = cc.LabelTTF.create( '' + message,  'Arial', 35 );
        score.setPosition( cc.p(400,450) );
        score.setVisible( false );
        var actions = [];
        actions.push( cc.Show.create() );
        actions.push( cc.FadeIn.create(0.1) );
        actions.push( cc.FadeOut.create(1.0) );
        // actions.push( cc.Hide.create() );
        actions.push( cc.CallFunc.create( score.removeFromParent, score, true));
        score.runAction( cc.Sequence.create( actions ) );
        this.addChild( score );
    },

    mute: function () {
        if( this.muted == 0 ) {
            cc.AudioEngine.getInstance().setMusicVolume(0);
            cc.AudioEngine.getInstance().setEffectsVolume(0);    
            this.muted = 1;
        }
        else {
            cc.AudioEngine.getInstance().setMusicVolume(0.7);
            cc.AudioEngine.getInstance().setEffectsVolume(1);    
            this.muted = 0;            
        }
    }

});

GameLayer.STATE = {
    NORMAL: 1,
    PAUSE: 2,
    END: 0
};
var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new IntroScene();
        layer.init();
        this.addChild( layer );
    }
});

GameLayer.scene = function() {
    var scene = cc.Scene.create();
    var layer = new GameLayer();
    layer.init();
    scene.addChild(layer);
    return scene;
}

var grenadeSprite = cc.Sprite.extend({
    ctor: function() {
        this._super();
        this.initWithFile( 'images/grenade.png' );
        this.setScaleX(0.1);
        this.setScaleY(0.1);
    }
});



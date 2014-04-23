    var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.money = 0;
        this.spawnPosY = [547, 460, 377, 293, 212, 121, 44];

        this.gameState = 1;

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.initLabel();

        this.grass = new Grass();
        this.grass.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.grass);

        this.redline = new Redline();
        this.redline.setPosition( new cc.Point( 144, 300 ) );
        this.redline.setOpacity(200);

        this.initZombie();

        this.crosshair = new Crosshair(this);
        this.crosshair.scheduleUpdate()
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.addChild(this.redline);
        this.addChild(this.ammoLabel);
        this.addChild(this.moneyLabel);
        this.addChild(this.moneyTextLabel);
        this.addChild(this.crosshair, 1);
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );
        return true;
    },

    initZombie: function() {
        this.zombie = new Array(15);
        for(var i = 0; i < this.zombie.length; i++) {
              this.zombie[i] = new Zombie(1, this);
        }
        this.scheduleOnce(this.spawnZombieAll, 1);
        this.schedule(this.spawnZombie, 2);
    },

    initLabel: function() {
        this.ammoLabel = cc.LabelTTF.create( 'ammo  ' + this.ammo, 'Arial', 40 );
        this.ammoLabel.setPosition( new cc.Point( 670, 640 ) );

        this.moneyLabel = cc.LabelTTF.create('' + this.money, 'Arial', 40 );
        this.moneyLabel.setPosition( new cc.Point( 250, 640 ) );

        this.moneyTextLabel = cc.LabelTTF.create( 'Money : ', 'Arial', 40 );
        this.moneyTextLabel.setPosition( new cc.Point( 100, 640 ) );

        this.reloadLabel = cc.LabelTTF.create( 'Reloading' , 'Arial', 40 );
        this.reloadLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );

        this.outOfAmmoLabel = cc.LabelTTF.create( 'Out of Ammo!!!' , 'Arial', 40 );
        this.outOfAmmoLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
    },

    onKeyDown: function( e ) {
        console.log(e);
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.press(e);
        }
        if( e == 80 ) {
            if ( this.gameState == 1 ) {
                this.gameState = 2;
                this.gamePause();
            }
            else if ( this.gameState == 2 ) {
                this.gameState = 1;
                this.gameResume();
            }
        }
        if( e == 81 && this.gameState == 0) {
            cc.Director.getInstance().replaceScene( new myApp.startScene() );
        }
        if( e == 82 ) {
            if ( this.gameState != 1 ) {
                return;
            }
            this.crosshair.reload();
        }
        if( e == 32) {
            if ( this.gameState != 1 ) {
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
    },
    onMouseDown:function (events) {
        console.log(cc.p( events.getLocation().x, events.getLocation().y));
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
        this.gameOverLabel = cc.LabelTTF.create( '      Game Over\n Press q to restart', 'Arial', 40 );
        this.gameOverLabel.setPosition( new cc.Point( 400, 300 ) );
        this.addChild(this.gameOverLabel);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i].pause();
        }
        this.unschedule(this.spawnZombie);
        this.gameState = 0;
    },

    gamePause: function() {
        this.gamePauseLabel = cc.LabelTTF.create( '         Paused\n Press p to resume', 'Arial', 40 );
        this.gamePauseLabel.setPosition( new cc.Point( 400, 300 ) );
        this.addChild(this.gamePauseLabel);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i].pause();
        }
        this.unschedule(this.spawnZombie);
    },

    gameResume: function() {
        this.removeChild(this.gamePauseLabel);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i].resume();
        }
        this.schedule(this.spawnZombie, 2);        
    }

});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});



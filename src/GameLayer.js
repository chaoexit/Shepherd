    var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.score = 0;
        this.spawnPosY = [547, 460, 377, 293, 212, 121, 44];
        this.ammo = 30;
        this.fireRate = 0;
        this.reloadTime = 1.5;
        this.reloading = false;
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.ammoLabel = cc.LabelTTF.create( 'ammo  ' + this.ammo, 'Arial', 40 );
        this.ammoLabel.setPosition( new cc.Point( 650, 550 ) );
        this.scoreLabel = cc.LabelTTF.create( 'score  ' + this.score, 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 450, 550 ) );
        this.reloadLabel = cc.LabelTTF.create( 'Reloading' , 'Arial', 40 );
        this.reloadLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.outOfAmmoLabel = cc.LabelTTF.create( 'Out of Ammo!!!' , 'Arial', 40 );
        this.outOfAmmoLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.grass = new Grass();
        this.grass.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.grass);
        this.redline = new Redline();
        this.redline.setPosition( new cc.Point( 144, 300 ) );
        this.redline.setOpacity(200);
        this.zombie = new Array(10);
        for(var i = 0; i < this.zombie.length; i++) {
            this.zombie[i] = new Zombie(1);
        }
        this.schedule(this.spawnZombieAll, 4, 4);
        this.schedule(this.spawnZombie, 2);
        this.crosshair = new Crosshair();
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.ammoLabel);
        this.addChild(this.scoreLabel);
        this.addChild(this.redline);
        this.addChild(this.crosshair, 1);
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );
        this.crosshair.scheduleUpdate()
        this.scheduleUpdate()
        return true;
    },
    onKeyDown: function( e ) {
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.press(e);
        }
        if( e == 82 ) {
            if(this.reloading == false) {
                cc.AudioEngine.getInstance().playEffect( 'effects/reload.wav' );
                this.ammo = 0;
                this.reloading = true;
                this.scheduleOnce(this.reload, this.reloadTime);
                this.addChild(this.reloadLabel);
            }
        }
        if( e == 32) {
            this.fire();
        }
    },
    onKeyUp: function( e ) {
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.release(e);
        }
    },
    removeZombie: function ( object1 ) {
        object1 = null;
    },
    onMouseMoved: function (event) {
        this.crosshair.setPosition(cc.p( event.getLocation().x, event.getLocation().y));
    },
    onMouseDown:function (events) {
        console.log(cc.p( events.getLocation().x, events.getLocation().y));
        this.fire();
        this.crosshair.setPosition(cc.p( events.getLocation().x, events.getLocation().y));
    },
    fire:function () {
        if(this.ammo <= 0) {
            return;
        }
        if(this.fireRate > 0) {
            return;
        }
        if( this.ammo == 1) {
            this.addChild(this.outOfAmmoLabel);
        }
        this.ammo -= 1;
        this.fireRate = 3;
        cc.AudioEngine.getInstance().playEffect( 'effects/gunfire.wav' );
        var tempDistance = 0;
        var target = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            var x = Math.pow(this.crosshair.getPosition().x-this.zombie[i].getPosition().x, 2);
            var y = Math.pow(this.crosshair.getPosition().y-this.zombie[i].getPosition().y, 2);
            var distance = Math.sqrt(x+y)
            if( i == 0 || distance < tempDistance) {
                target = i;
                tempDistance = distance;
            }
        }
        if(this.crosshair.closeToHead(this.zombie[target])) {
            console.log('headshot!!');
            if ( this.zombie[target].getShot(10) ) {
                this.score += 1;
                this.scoreLabel.setString( 'score  ' + this.score );
            }
        }        
        else if(this.crosshair.closeTo(this.zombie[target])) {
            if ( this.zombie[target].getShot(1) ) {
                this.score += 1;
                this.scoreLabel.setString( 'score  ' + this.score );
            }
        }
    },
    spawnZombieAll: function ( ) {
        var amount = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            if(amount == 3) {
                return;
            }
            if( this.zombie[i] == null || this.zombie[i].state == 2 ) {
                amount += 1;
                var randomArray = Math.round((Math.random()*6));
                this.zombie[i] = new Zombie();
                this.zombie[i].setPosition( 820, this.spawnPosY[randomArray] );
                this.addChild(this.zombie[i]);
                this.zombie[i].scheduleUpdate();
            }
        }
    },
    spawnZombie: function ( ) {
        var amount = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            if( this.zombie[i] == null || this.zombie[i].state == 0 ) {
                var randomArray = Math.round((Math.random()*6));
                this.zombie[i] = new Zombie();
                this.zombie[i].setPosition( 820, this.spawnPosY[randomArray] );
                this.addChild(this.zombie[i]);
                this.zombie[i].scheduleUpdate();
                return;
            }
        }
    },
    update: function( dt ) {
        this.ammoLabel.setString( 'ammo  ' + this.ammo );
        if ( this.fireRate > 0) {
            this.fireRate -= 1;
        }
    },
    reload: function() {
        this.ammo = 30;
        this.removeChild(this.reloadLabel);
        this.reloading = false;
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



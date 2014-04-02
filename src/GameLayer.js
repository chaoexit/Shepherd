var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.score = 0;
        this.ammo = 30;
        this.reloadTime = 0;
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
        this.zombie = new Array(10);
        this.spawnZombieAll();
        this.schedule(this.spawnZombie, 3);
        // for(var i = 0; i < 50; i++) {
        //     this.zombie[i] = new Zombie();
        //     //this.zombie[i].setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        //     this.zombie[i].setPosition( Math.floor((Math.random()*700)+1), Math.floor((Math.random()*500)+1) );
        //     this.addChild(this.zombie[i]);
        //     this.zombie[i].scheduleUpdate();
        // }
        this.crosshair = new Crosshair();
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.ammoLabel);
        this.addChild(this.scoreLabel);
        this.addChild(this.crosshair);
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
            if(this.reloadTime === 0) {
                cc.AudioEngine.getInstance().playEffect( 'effects/reload.wav' );
                this.ammo = 0;
                this.reloadTime = 50;
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
        this.fire();
        this.crosshair.setPosition(cc.p( events.getLocation().x, events.getLocation().y));
    },
    fire:function () {
        if(this.ammo <= 0) {
            return;
        }
        if( this.ammo == 1) {
            this.addChild(this.outOfAmmoLabel);
        }
        this.ammo -= 1;
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
        if(this.crosshair.closeTo(this.zombie[target])) {
            if ( this.zombie[target].getShot(1) ) {
                this.score += 1;
                this.scoreLabel.setString( 'score  ' + this.score );
            }
        }
    },
    spawnZombieAll: function ( ) {
        var amount = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            if( this.zombie[i] == null || this.zombie[i].state == 0 ) {
                amount += 1;
                this.zombie[i] = new Zombie();
                this.zombie[i].setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
                this.zombie[i].setPosition( 820, Math.floor((Math.random()*550)+1) );
                this.addChild(this.zombie[i]);
                this.zombie[i].scheduleUpdate();
            }
        }
        console.log(amount);
    },
    spawnZombie: function ( ) {
        var amount = 0;
        for(var i = 0; i < this.zombie.length; i++) {
            if( this.zombie[i] == null || this.zombie[i].state == 0 ) {
                amount += 1;
                this.zombie[i] = new Zombie();
                this.zombie[i].setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
                this.zombie[i].setPosition( 820, Math.floor((Math.random()*550)+1) );
                this.addChild(this.zombie[i]);
                this.zombie[i].scheduleUpdate();
                return;
            }
        }
        console.log(amount);
    },
    update: function( dt ) {
        this.ammoLabel.setString( 'ammo  ' + this.ammo );
        if( this.reloadTime > 1) {
            this.removeChild(this.outOfAmmoLabel);
            this.reloadTime -= 1;
        }
        if( this.reloadTime == 1) {
            this.reloadTime = 0;
            this.ammo = 30;
            this.removeChild(this.reloadLabel);
        }
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


var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.ammo = 6;
        this.reloadTime = 0;
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.scoreLabel = cc.LabelTTF.create( 'ammo  ' + this.ammo, 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 650, 550 ) );
        this.reloadLabel = cc.LabelTTF.create( 'Reloading' , 'Arial', 40 );
        this.reloadLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.outOfAmmoLabel = cc.LabelTTF.create( 'Out of Ammo!!!' , 'Arial', 40 );
        this.outOfAmmoLabel.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.grass = new Grass();
        this.grass.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.grass);
        this.zombie = new Array();
        for(var i = 0; i < 4; i++) {
            this.zombie[i] = new Zombie();
            //this.zombie[i].setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
            this.zombie[i].setPosition( Math.floor((Math.random()*800)+1), Math.floor((Math.random()*600)+1) );
            this.addChild(this.zombie[i]);
            this.zombie[i].scheduleUpdate();
        }
        this.crosshair = new Crosshair();
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
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
    onMouseMoved:function (event) {
        this.crosshair.setPosition(cc.p( event.getLocation().x, event.getLocation().y));
    },
    onMouseDown:function () {
        this.fire();
    },
    fire:function () {
        if(this.ammo <= 0) {
            return;
        }
        if( this.ammo == 1) {
            this.addChild(this.outOfAmmoLabel);
        }
        this.ammo -= 1;
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
            this.zombie[target].getShot(1);
        }
    },
    update: function( dt ) {
        this.scoreLabel.setString( 'ammo  ' + this.ammo );
        if( this.reloadTime > 1) {
            this.removeChild(this.outOfAmmoLabel);
            this.reloadTime -= 1;
        }
        if( this.reloadTime == 1) {
            this.reloadTime = 0;
            this.ammo = 6;
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


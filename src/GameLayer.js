var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.grass = new Grass();
        this.grass.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.grass);
        this.zombie = new Zombie();
        this.zombie.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.crosshair = new Crosshair();
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.zombie);
        this.addChild(this.crosshair);
        this.zombie.scheduleUpdate();
        this.setKeyboardEnabled( true );
        this.setMouseEnabled( true );
        this.crosshair.scheduleUpdate()
        return true;
    },
    onKeyDown: function( e ) {
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.press(e);
        }
    },
    onKeyUp: function( e ) {
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.release(e);
        }
    },
    onMouseMoved:function (event) {
        this.crosshair.setPosition(cc.p( event.getLocation().x, event.getLocation().y));
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


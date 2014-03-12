var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
        this.zombie = new Zombie();
        this.zombie.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.crosshair = new Crosshair();
        this.crosshair.setPosition( new cc.Point( screenWidth / 2, screenHeight / 2 ) );
        this.addChild(this.zombie);
        this.addChild(this.crosshair);
        this.zombie.scheduleUpdate();
        this.setKeyboardEnabled( true );
        return true;
    },
    onKeyDown: function( e ) {
        if(e == 37 || e == 38 || e == 39 || e == 40) {
            this.crosshair.move(e);
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


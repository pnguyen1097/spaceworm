var Physics = this.Physics;

function LevelRenderer(level, canvasId, width, height) {
  var renderer = this.renderer = Physics.renderer("pixi", {
    el: canvasId,
    width: width,
    height: height
  });

  var texture = PIXI.Texture.fromImage("images/Starfield.png");
  var bg = new PIXI.TilingSprite(texture, width, height);
  renderer.stage.addChild(bg);

  this.level = level;
  var world = level.world;
  world.add(this.renderer);
  world.on('step', function() {
    world.render();
  });


}

LevelRenderer.prototype = {

  update: function() {
    var world = this.level.world;
    var renderer = this.renderer;
    this.level.world.getBodies().forEach(function(body) {
      if (body.body_type === "star") {
        body.view = renderer.createDisplay('sprite', {
          texture: 'images/Sun2.png',
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });
        body.view.scale = new PIXI.Point(body.radius / 100.0, body.radius / 100.0);
      } else if (body.body_type === "wormhole") {
        body.view = renderer.createDisplay('sprite', {
          texture: 'images/WormHole.png',
          anchor: {
            x: 0.5,
            y: 0.5
          }
        });
        body.view.scale = new PIXI.Point(body.radius / 5.0, body.radius / 5.0);
      } else if (body.body_type === "ship") {
        body.view = renderer.createDisplay('sprite', {
          texture: 'images/SpaceShip.png',
          anchor: {
            x: 0.5,
            y: 0.5
          },
        });
        body.view.visible = false;
        body.view.scale = new PIXI.Point(body.radius / 100.0, body.radius / 100.0);
      }
    });
  }

}

Spacehole.LevelRenderer = LevelRenderer;

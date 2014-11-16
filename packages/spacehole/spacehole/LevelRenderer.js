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

  var world = level.world;
  world.add(this.renderer);
  world.on('step', function() {
    world.render();
  });

  world.getBodies().forEach(function(body) {
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
      body.view.scale = new PIXI.Point(body.radius / 100.0, body.radius / 100.0);
      body.view.rotate = Math.PI / 3;
    }
  });

}

Spacehole.LevelRenderer = LevelRenderer;

console.log(Physics);
var Physics = this.Physics;

function LevelRenderer(level, canvasId, width, height) {
  this.renderer = Physics.renderer("canvas", {
    el: canvasId,
    width: width,
    height: height
  });

  var world = level.world;

  world.add(this.renderer);

  world.on('step', function() {
    world.render();
  });

}

Spacehole.LevelRenderer = LevelRenderer;

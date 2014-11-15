Template.home.rendered = function() {

  //TODO: move this else where.

  var level = new Spacehole.Level();

  var renderer = new Spacehole.LevelRenderer(level, "viewport", 800, 600);

  var world = level.world;

  Physics.util.ticker.on(function( time, dt ){
    world.step(time);
  });

  Physics.util.ticker.start();

}

Template.home.rendered = function() {

  var world = new Physics.world();

  var renderer = Physics.renderer('canvas', {
    el: 'viewport', // id of the canvas element
    width: 500,
    height: 500
  });

  world.add( renderer );

  var square = Physics.body('rectangle', {
    x: 250,
    y: 250,
    width: 50,
    height: 50
  });

  world.add( square );
  world.render();

}


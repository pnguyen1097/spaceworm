(function(global) {

  var Physics = global.Physics;

  var data = {
    start: { x: 100, y: 100 },
    end: { x: 600, y: 600 },
    planets: [
      { x: 200, y: 200, r: 30 },
      { x: 500, y: 250, r: 30 },
    ]
  };


  function Level(data) {

    this.world = new Physics.world({
      timestep: 1000.0 / 120,
      maxIPF: 16,
      integrator: 'verlet'
    });

    this.start = data[start];
    this.end = data[end];

    planets.forEach(function(planet) {

      //TODO: replace body with a planet class
      world.addBody(new Physics.body('circle', {
        x: planet.x,
        y: planet.y,
        radius: planet.r
      }));

    });

  }

  global.Spacehole = global.Spacehole || {};
  global.Spacehole.Level = Level;

}(this));

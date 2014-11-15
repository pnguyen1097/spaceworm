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

  function Level() {

    var self = this;

    self.world = new Physics.world({
      timestep: 1000.0 / 120,
      maxIPF: 16,
      integrator: 'verlet'
    });

    self.start = data.start;
    self.end = data.end;

    data.planets.forEach(function(planet) {

      //TODO: replace body with a planet class
      self.world.addBody(new Physics.body('circle', {
        x: planet.x,
        y: planet.y,
        radius: planet.r
      }));

    });

  }

  global.Spacehole = global.Spacehole || {};
  global.Spacehole.Level = Level;

}(this));

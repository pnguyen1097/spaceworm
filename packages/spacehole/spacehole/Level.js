var Physics = this.Physics;

var data = {
  start: { x: 100, y: 100 },
  end: { x: 600, y: 600 },
  planets: [
    { x: 200, y: 200, r: 30 },
    { x: 500, y: 250, r: 80 },
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
      radius: planet.r,
      mass: 0.1 * planet.r
    }));

  });

  self.world.add([
    Physics.behavior('newtonian', { strength: .5 }),
    Physics.behavior('body-impulse-response'),
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune')
  ]);

}

Spacehole.Level = Level;

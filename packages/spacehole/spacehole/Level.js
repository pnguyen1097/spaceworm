var Physics = this.Physics;

function Level(data) {

  var self = this;

  self.world = new Physics.world({
    timestep: 1000.0 / 120,
    maxIPF: 16,
    integrator: 'verlet'
  });

  self.start = data.start;
  self.end = data.end;

  data.static_star.forEach(function(star) {
    //TODO: replace body with a planet class
    self.world.addBody(Spacehole.StaticStar({
      x: star.x,
      y: star.y,
      radius: star.r,
      mass: 0.1 * star.r
    }));
  });

  data.dynamic_star.forEach(function(star) {
    //TODO: replace body with a planet class
    self.world.addBody(Spacehole.DynamicStar({
      x: star.x,
      y: star.y,
      radius: star.r,
      mass: 0.1 * star.r
    }));
  });

  self.world.add(Spacehole.Wormhole({
      x: data.end.x,
      y: data.end.y
  }));

  self.world.add([
    Physics.behavior('newtonian', { strength: .5 }),
    Physics.behavior('body-impulse-response'),
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune')
  ]);

}

Spacehole.Level = Level;

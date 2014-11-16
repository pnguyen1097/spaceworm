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
    self.world.addBody(Spacehole.StaticStar({
      x: star.x,
      y: star.y,
      radius: star.r,
      mass: 0.035 * star.r
    }));
  });

  data.dynamic_star.forEach(function(star) {
    self.world.addBody(Spacehole.DynamicStar({
      x: star.x,
      y: star.y,
      radius: star.r,
      mass: 0.035 * star.r
    }));
  });

  self.world.add(Spacehole.Wormhole({
      x: data.end.x,
      y: data.end.y
  }));
  self.world.add(Spacehole.Attractor({
    pos: data.end
  }));

  self.player = Spacehole.Ship({
    x: data.start.x,
    y: data.start.y
  });

  self.world.addBody(self.player)

  self.world.add([
    Physics.behavior('newtonian', { strength: .5 }),
    Physics.behavior('body-impulse-response'),
    Physics.behavior('body-collision-detection'),
    Physics.behavior('sweep-prune')
  ]);

}

Spacehole.Level = Level;

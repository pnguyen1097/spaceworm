var Physics = this.Physics;

function Attractor(options) {
  options = options || {};
  options.strength = 10;
  options.max = 50;

  var body = new Physics.behavior('attractor', options);
  body.body_type = 'attractor';

  return body;
}

Spacehole.Attractor = Attractor;

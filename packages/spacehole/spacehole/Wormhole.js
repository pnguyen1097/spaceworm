var Physics = this.Physics;

function Wormhole(options) {
  options.treatment = 'static';
  options.radius = 1;
  options.mass = 0.0001;

  var body = new Physics.body('circle', options);
  body.body_type = 'wormhole';

  return body;
}

Spacehole.Wormhole = Wormhole;

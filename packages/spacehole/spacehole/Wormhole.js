var Physics = this.Physics;

function Wormhole(options) {
  options.treatment = 'static';
  options.radius = 20;
  options.mass = .0001;

  var body = new Physics.body('circle', options);
  body.body_type = 'wormhole';

  return body;
}

Spacehole.Wormhole = Wormhole;

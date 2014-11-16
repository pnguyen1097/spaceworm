var Physics = this.Physics;

function DynamicStar(options) {
  var body = new Physics.body('circle', options);
  body.body_type = 'dynamic_star';

  return body;
}

Spacehole.DynamicStar = DynamicStar;

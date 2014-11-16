var Physics = this.Physics;

function StaticStar(options) {
  options.treatment = 'static';

  var body = new Physics.body('circle', options);
  body.body_type = 'star';

  return body;
}

Spacehole.StaticStar = StaticStar;

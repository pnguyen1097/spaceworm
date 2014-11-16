var Physics = this.Physics;

function Ship(options) {
  options.radius = 15;
  options.mass = 0.1 * options.radius;
  options.restitution = 0;

  var body = new Physics.body('circle', options);
  body.body_type = 'ship';

  body.turn = function(amount) {
    amount *= 0.000005;
    this.state.angular.acc = amount;
  };

  body.thrust = function(amount) {
    var angle = this.state.angular.pos;
    var scratch = Physics.scratchpad();
    amount *= 0.0001;
    var v = scratch.vector().set(
      amount * Math.cos( angle ),
      amount * Math.sin( angle )
    );
    this.accelerate(v);
    scratch.done();
  }


  //body.turn(1);
  return body;
}

Spacehole.Ship = Ship;

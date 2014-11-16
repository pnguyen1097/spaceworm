var Physics = this.Physics;

var STATE = {
  Start: 0,
  Running: 1,
  Paused: 2,
  Win: 3,
  Lose: 4
};

function GameManager() {
  //this.state = STATE.nunning;
  this.resume();
}

GameManager.prototype = {

  restart: function() {

    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    var data = Spacehole.generateLevel(innerWidth, innerHeight, 20, 10);
    console.log(data);

    var level = this.level = new Spacehole.Level(data);
    var renderer = this.renderer =
      new Spacehole.LevelRenderer(level, "viewport", innerWidth, innerHeight);
    var world = this.world = level.world;

    var player = this.player = this.level.player;

    world.add(Physics.behavior('interactive', {el: renderer.renderer.el}));

    var self = this;
    Physics.util.ticker.on(function( time, dt ){
      if (self.turningRight) {
        player.turn(5);
      } else if (self.turningLeft) {
        player.turn(-5);
      } else {
        player.turn(0);
      }

      if (self.thrusting) {
        player.thrust(1);
      } else {
        player.thrust(0);
      }

      self.updateShipImage();

      world.step(time);
    });

    world.render();

    this.startListening();

    this.noThrustSprite = renderer.renderer.createDisplay('sprite', {
      texture: 'images/SpaceShip.png',
      anchor: {
        x: 0.5,
        y: 0.5
      },
    });

    this.thrustSprite = renderer.renderer.createDisplay('sprite', {
      texture: 'images/SpaceShipFiring.png',
      anchor: {
        x: 0.5,
        y: 0.5
      },
    });

    this.thrustSprite.visible = false;
    this.noThrustSprite.visible = false;


  },

  startListening: function() {
    
    self = this;  
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

    this.world.on('interact:poke', this.handlePoke.bind(this));

    this.renderer.renderer.el.addEventListener('mousemove', function( e ){
      var theta = Math.atan2(pos.y - y, pos.x - x);
      self.player.angular.pos = theta;
      self.player.recalc(); 
    });

    var world = this.world;
    world.on('collisions:detected', function( data ){
      var c;
      for (var i = 0, l = data.collisions.length; i < l; i++){
        c = data.collisions[i];
        world.emit('collision-pair', {
          bodyA: c.bodyA,
          bodyB: c.bodyB
        });
      }
    });

    this.world.on('collision-pair', this.handleCollision.bind(this));

  },

  handlePoke: function( pos ){ 
 
    var vectorScratch = Physics.scratchpad()

    var x = this.player.state.pos.x;
    var y = this.player.state.pos.y;
    var amount = 0.00005;
    var launchVector = vectorScratch.vector().set( 
      amount * (pos.x - x), 
      amount * (pos.y - y));
    

    var theta = Math.atan2(pos.y - y, pos.x - x);
    this.player.state.angular.pos = theta;
    this.player.treatment = 'dynamic';
    this.player.recalc();
    this.player.accelerate(launchVector);
    
    this.world.removeBehavior('interactive'); 
    this.world.off('interact:poke');
    vectorScratch.done();
  },

  handleCollision: function(data) {
    console.log(data);
    var player = null, body = null;
    if (data.bodyA.body_type === 'ship') { player = data.bodyA; }
    if (data.bodyB.body_type === 'ship') { player = data.bodyB; }

    if (data.bodyA.body_type !== 'ship') { body = data.bodyA; }
    if (data.bodyB.body_type !== 'ship') { body = data.bodyB; }

    if (player) {
      if (body.body_type === 'star') {
        this.lose();
      } else {
        this.win();
      }
    }
  },

  handleKeyDown: function(event) {
    if (event.keyCode === 80) {
      if (this.state === STATE.Paused) {
        this.resume();
      } else if (this.state === STATE.Running) {
        this.pause();
      }
    } else if (event.keyCode === 38 && !this.thrusting) { // Up
      this.thrusting = true;
    } else if (event.keyCode === 39 && !this.turningRight) { // Right
      this.turningRight = true;
    } else if (event.keyCode === 37 && !this.turningLeft) { // Left
      this.turningLeft = true;
    }
  },

  handleKeyUp: function(event) {
    if (event.keyCode === 38) { // Up
      this.thrusting = false;
    } else if (event.keyCode === 39) { // Right
      this.turningRight = false;
    } else if (event.keyCode === 37) { // Left
      this.turningLeft = false;
    }
  },

  updateShipImage: function() {
    var renderer = this.renderer.renderer;
      if (this.thrusting && this.player.treatment === 'dynamic') {
        this.player.view = this.thrustSprite;
        this.noThrustSprite.visible = false;
      } else {
        this.player.view = this.noThrustSprite;
        this.thrustSprite.visible = false;
      }
      this.player.view.visible = true;
      this.player.view.scale = new PIXI.Point(this.player.radius / 100.0, this.player.radius / 100.0);
  },

  resume: function() {
    console.log('resuming');
    this.state = STATE.Running;
    Physics.util.ticker.start();
  },

  pause: function() {
    console.log('pausing');
    this.state = STATE.Paused;
    Physics.util.ticker.stop();
  },

  win: function() {
    console.log('Winning!');
    this.state = STATE.Win;
    this.pause();
  },

  lose: function() {
    console.log('Losing!');
    this.state = STATE.Lose;
    this.pause();
  }

};

Spacehole.GameManager = GameManager;

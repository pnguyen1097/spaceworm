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

    var data = {
      start: { x: 100, y: 100 },
      end: { x: 300, y: 300 },
      static_star: [
        { x: 200, y: 200, r: 30 },
        { x: 500, y: 250, r: 40 },
      ],
      dynamic_star: [
        { x: 300, y: 200, r: 8 },
        { x: 500, y: 150, r: 8 },
      ]
    };

    var level = this.level = new Spacehole.Level(data);
    var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
    var renderer = this.renderer =
      new Spacehole.LevelRenderer(level, "viewport", innerWidth, innerHeight);
    var world = this.world = level.world;

    var player = this.player = this.level.player;

    var self = this;
    Physics.util.ticker.on(function( time, dt ){
      if (self.turningRight) {
        console.log('turningRight');
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

      world.step(time);
    });

    world.render();

    this.startListening();

  },

  startListening: function() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
    document.addEventListener("keyup", this.handleKeyUp.bind(this));

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

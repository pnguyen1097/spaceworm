var Physics = this.Physics;

var STATE = {
  Start: 0,
  Running: 1,
  Paused: 2,
  Win: 3,
  Lose: 4
};

function GameManager() {
  var innerWidth = window.innerWidth, innerHeight = window.innerHeight;
  this.level = new Spacehole.Level();
  this.renderer = new Spacehole.LevelRenderer(this.level, "viewport", innerWidth, innerHeight);
  this.world = this.level.world;

  this.resume();
}

GameManager.prototype = {

  restart: function(newLevel) {

    if (newLevel) {
      this.data = Spacehole.generateLevel(innerWidth, innerHeight, 20, 10);
    } else {
      if (!this.data) {
        this.data = Spacehole.generateLevel(innerWidth, innerHeight, 20, 10);
      }
    }

    var data = this.data;


    var level = this.level;
    var renderer = this.renderer;
    var world = this.world;



    level.resetData(data);
    renderer.update();
    var player = this.level.player;

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

    if (!this.startedListening) {
      this.startListening();
      this.startedListening = true;
    }

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


    this.resume();
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
    console.log(event.keyCode);
    if (event.keyCode === 80) {
      console.log(this.state);
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
    } else if (event.keyCode === 82) {
      this.restart();
    } else if (event.keyCode === 78) {
      this.restart(true);
    }
  },

  updateShipImage: function() {
    var renderer = this.renderer.renderer;
    var player = this.level.player;
      if (this.thrusting) {
        player.view = this.thrustSprite;
        this.noThrustSprite.visible = false;
      } else {
        player.view = this.noThrustSprite;
        this.thrustSprite.visible = false;
      }
      player.view.visible = true;
      player.view.scale = new PIXI.Point(player.radius / 100.0, player.radius / 100.0);
  },

  resume: function() {
    console.log('resuming');
    Spacehole.playMusic();
    this.state = STATE.Running;
    Physics.util.ticker.start();
    document.querySelector('#gameState').innerHTML = "";
    console.log('set hidden');
    document.querySelector('#overlay').style.visibility = "hidden";
  },

  pause: function() {
    console.log('pausing');
    Spacehole.pauseMusic();
    this.state = STATE.Paused;
    Physics.util.ticker.stop();
    document.querySelector('#gameState').innerHTML = "Paused";
    document.querySelector('#overlay').style.visibility = "visible";
  },

  win: function() {
    console.log('Winning!');
    this.state = STATE.Win;
    this.pause();
    document.querySelector('#gameState').innerHTML = "You Won!";
  },

  lose: function() {
    console.log('Losing!');
    this.state = STATE.Lose;
    this.pause();
    document.querySelector('#gameState').innerHTML = "You Lose!<br/>";
  }

};

Spacehole.GameManager = GameManager;

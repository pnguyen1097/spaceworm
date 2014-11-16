function LevelGenerator(canvasWidth, canvasHeight) {

  var data = {};

  return generateLevel();

  function generateLevel() {
    setStart();
    setEnd();
    setStaticStars();
    setDynamicStars();
    return data;
  }

  function setStart() {
    data.start = {};
    data.start.x = randomN(10, canvasWidth * 0.15);
    data.start.y = randomN(0, canvasHeight);
  }

  function setEnd() {
    data.end = {};
    data.end.x = randomN(canvasWidth * 0.80, canvasWidth * 0.15 );
    data.end.y = randomN(0, canvasHeight);
  }

  function setStaticStars() {
    data.static_star = [];
    for (var i = 0; i < randomN(2,5); i++) {
      var star = {};
      star.x = randomN(canvasWidth * 0.25, canvasWidth * 0.5);
      star.y = randomN(0, canvasHeight);
      star.r = randomN(20,10);
      data.static_star.push(star);
    }
  }

  function setDynamicStars() {
    data.dynamic_star = [];
    for (var i = 0; i < randomN(0,3); i++) {
      var star = {};
      star.x = randomN(canvasWidth * 0.25, canvasWidth * 0.5);
      star.y = randomN(0, canvasHeight);
      star.r = randomN(5,7);
      data.dynamic_star.push(star);
    }
  }

  function randomN(min, range) {
    return min + Math.random() * range;
  }

}

Spacehole.generateLevel = LevelGenerator;

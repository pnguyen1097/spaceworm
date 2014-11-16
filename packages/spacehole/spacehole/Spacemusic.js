var buzz = this.buzz;

function playMusic(filename) {

  if (buzz.sounds[0]) {
    buzz.sounds[0].play();
  } else {
    (new buzz.sound("sounds/TheMagician", {
      formats: ["ogg", "mp3", "aac"]
    })).play().fadeIn().loop();
  }

}

function pauseMusic(filename) {

  return buzz.sounds[0].pause();

}

Spacehole.playMusic = playMusic;
Spacehole.pauseMusic = pauseMusic;

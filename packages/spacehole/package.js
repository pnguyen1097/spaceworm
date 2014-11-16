Package.describe({
  // Short two-sentence summary.
  summary: "Spacehole code",
  // Version number.
  version: "0.0.1",
  // Optional.  Default is package directory name.
  name: "spacehole",
});

Package.onUse(function (api) {
  // Use Underscore package, but only on the server.
  // Version not specified, so it will be as of Meteor 0.9.0.
  api.use('physicsjs');
  api.use('brentjanderson:buzz');
  // Use application-configuration package, version 1.0.0 or newer.
  //api.use('application-configuration@1.0.0');
  // Give users of this package access to the Templating package.
  //api.imply('templating')
  // Export the object 'Email' to packages or apps that use this package.
  api.export('Spacehole');
  // Specify the source code for the package.
  api.addFiles([
    'Spacehole.js',
    'spacehole/StaticStar.js',
    'spacehole/DynamicStar.js',
    'spacehole/Wormhole.js',
    'spacehole/Attractor.js',
    'spacehole/Ship.js',
    'spacehole/generateLevel.js',
    'spacehole/Spacemusic.js',
    'spacehole/Level.js',
    'spacehole/LevelRenderer.js',
    'spacehole/GameManager.js'
  ]);
});

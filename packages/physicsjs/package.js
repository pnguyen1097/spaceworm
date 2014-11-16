Package.describe({
  // Short two-sentence summary.
  summary: "PhysicsJS library",
  // Version number.
  version: "0.6.0",
  // Optional.  Default is package directory name.
  name: "physicsjs",
});

Package.onUse(function (api) {
  // Use Underscore package, but only on the server.
  // Version not specified, so it will be as of Meteor 0.9.0.
  // Use application-configuration package, version 1.0.0 or newer.
  //api.use('application-configuration@1.0.0');
  // Give users of this package access to the Templating package.
  //api.imply('templating')
  // Export the object 'Email' to packages or apps that use this package.
  api.export('Physics');
  // Specify the source code for the package.
  api.addFiles('physicsjs-full-0.6.0.min.js', 'client');
});

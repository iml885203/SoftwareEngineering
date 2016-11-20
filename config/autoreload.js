module.exports.autoreload = {
  active: false,
  usePolling: false,
  dirs: [
    "api/models",
    "api/controllers",
    // "api/services",
    "config/passport",
    "assets/styles",
    "assets/js",
  ],
  ignored: [
    // Ignore all files with .ts extension
    "**.ts"
  ]
};

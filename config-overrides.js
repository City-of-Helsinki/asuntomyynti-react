/*
* config-overrides.js
* This is for creating bundled js for Drupal without hashes
* */
module.exports = function override(config, env) {
// Use external version of React
    config.externals = {
        "react": "React",
        "react-dom": "ReactDOM"
    };
    return config;
}
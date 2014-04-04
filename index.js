// Node Socket Proxy
// ========

// Set the process title
process.title = 'socket proxy';

exports.version = require('./package.json').version;
exports.server = require('./lib/server');

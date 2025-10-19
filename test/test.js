const assert = require('assert');
const { listServers } = require('../src/mcpClient');

const servers = listServers();
console.log('Servers:', servers);
assert(Array.isArray(servers), 'listServers should return an array');
console.log('Test passed.');

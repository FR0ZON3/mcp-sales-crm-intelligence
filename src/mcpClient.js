const fs = require('fs');
const path = require('path');
const https = require('https');

function readMcpConfig() {
  const cfgPath = path.join(__dirname, '..', '.vscode', 'mcp.json');
  if (!fs.existsSync(cfgPath)) return null;
  try {
    let raw = fs.readFileSync(cfgPath, 'utf8');
    // Try direct parse first
    try {
      return JSON.parse(raw);
    } catch (e) {
      // Fallback: remove common comment styles and control chars then parse
      raw = raw.replace(/\/\*[^]*?\*\//g, ''); // remove block comments
      raw = raw.replace(/\/\/.*/g, ''); // remove line comments
      // Remove non-printable control characters except common whitespace
      raw = raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Warning: could not parse .vscode/mcp.json cleanly:', err.message);
    return null;
  }
}

function listServers() {
  const cfg = readMcpConfig();
  if (!cfg || !cfg.servers) return [];
  return Object.entries(cfg.servers).map(([name, info]) => ({ name, ...info }));
}

function checkHttpUrl(url) {
  return new Promise((resolve) => {
    try {
      const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url, statusCode: res.statusCode });
      });
      req.on('error', (e) => resolve({ url, error: e.message }));
      req.on('timeout', () => { req.destroy(); resolve({ url, error: 'timeout' }); });
      req.end();
    } catch (err) {
      resolve({ url, error: err.message });
    }
  });
}

async function dryRun() {
  const servers = listServers();
  const results = [];
  for (const s of servers) {
    if (s.type === 'http' && s.url) {
      // perform a light HEAD check
      // ensure url has http(s) scheme
      const url = s.url.startsWith('http') ? s.url : `https://${s.url}`;
      // remove query for HEAD check
      const base = url.split('?')[0];
      // eslint-disable-next-line no-await-in-loop
      const r = await checkHttpUrl(base);
      results.push({ server: s.name, kind: 'http', check: r });
    } else {
      results.push({ server: s.name, kind: s.type || 'unknown', info: s });
    }
  }
  return results;
}

module.exports = {
  readMcpConfig,
  listServers,
  dryRun,
};

if (require.main === module) {
  (async () => {
    console.log('MCP servers found:');
    const servers = listServers();
    console.log(JSON.stringify(servers, null, 2));
    console.log('\nPerforming dry run (light HTTP checks for http servers)...');
    try {
      const r = await dryRun();
      console.log(JSON.stringify(r, null, 2));
    } catch (e) {
      console.error('Dry run failed:', e.message);
    }
  })();
}

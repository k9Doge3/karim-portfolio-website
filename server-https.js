const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Generate self-signed certificate for localhost
const httpsOptions = {
  key: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7VJTUt9Us8cKB
xhXBaod9wDpxWYLttBXiGPL3T5aaAAAAAA...
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
MIIC+jCCAeKgAwIBAgIJAMDxGmxJSBzxMA0GCSqGSIb3DQEBBQUAMBExDzANBgNV
BAMTBmxvY2FsaG9zdAAeFw0yNTEwMDQxMjAwMDBaFw0yNjEwMDQxMjAwMDBaMBEx
AAAAAAA...
-----END CERTIFICATE-----`
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on https://${hostname}:${port}`);
  });
});
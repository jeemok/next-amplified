// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const pkg = require('../../package');

export default function handler(req, res) {
  res.status(200).json({
    timestamp: new Date().toISOString(),
    version: pkg.version,
  });
}

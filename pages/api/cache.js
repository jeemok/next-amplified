// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cache } from 'aws-amplify';

export default function handler(req, res) {
  res.status(200).json({
    timestamp: new Date().toISOString(),
    size: Cache.getCacheCurSize(),
    keys: Cache.getAllKeys(),
  })
}

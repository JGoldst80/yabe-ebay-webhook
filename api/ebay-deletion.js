import { createHash } from 'crypto';

// Use the same verification token you’ll enter in the eBay form.
const verificationToken = 'YABEYABEYABEYABEYABEYABEYABEYABE';
// The endpoint must match exactly what you register with eBay.
const endpoint = 'https://yabe-ebay-webhook.vercel.app/api/ebay-deletion';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // eBay sends a challenge_code as a query parameter to verify ownership.
    const challengeCode = req.query.challenge_code;
    if (!challengeCode) {
      return res.status(400).json({ error: 'Missing challenge_code' });
    }
    // Compute SHA256 hash of challengeCode + verificationToken + endpoint.
    const hash = createHash('sha256');
    hash.update(challengeCode);
    hash.update(verificationToken);
    hash.update(endpoint);
    const challengeResponse = hash.digest('hex');
    return res.status(200).json({ challengeResponse });
  }
  // Acknowledge account-deletion notifications.
  if (req.method === 'POST') {
    return res.status(204).end();
  }
  return res.status(405).end();
}

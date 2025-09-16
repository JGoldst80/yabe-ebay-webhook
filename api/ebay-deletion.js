export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  // Optionally verify req.headers['x-ebay-signature'] or other fields
  return res.status(204).end();
}

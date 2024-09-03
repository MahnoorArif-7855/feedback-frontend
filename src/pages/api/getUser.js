// pages/api/firebase.js
import * as admin from 'firebase-admin';

import serviceAccount from '../../../serviceAccount.json';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const userId = req.query.userId;

      const userRecord = await admin.auth().getUser(userId);
      res.status(200).json({ user: userRecord });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

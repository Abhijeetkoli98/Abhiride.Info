// AbhiRide Backend Firebase Admin SDK Initialization
import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

if (!admin.apps.length) {
  try {
    const serviceAccountPath = path.join(__dirname, '../../serviceAccountKey.json');
    
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: 'abhiride'
      });
      console.log('🔥 Firebase Admin SDK Initialized using Service Account (abhiride)');
    } else {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'abhiride'
      });
      console.log('🔥 Firebase Admin SDK Initialized with default credentials (abhiride)');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

export const firebaseAdmin = admin;
export const db = admin.firestore();

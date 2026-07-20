import { Request, Response, NextFunction } from 'express';
import { firebaseAdmin } from '../config/firebase';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export async function verifyFirebaseAuthToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. No Firebase Bearer token provided.'
    });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
    req.user = decodedToken;
    return next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized. Invalid or expired Firebase token.',
      details: error.message
    });
  }
}

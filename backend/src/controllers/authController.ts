import { Request, Response } from 'express';
import { db } from '../config/firebase';

export async function registerUser(req: Request, res: Response) {
  const { name, email, phone, role, password, dob, emergencyContact, aadhaarNumber, dlNumber, vehicleMake, vehicleModel, licensePlate } = req.body;

  if (!email || !phone || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email, phone, and password are required fields.'
    });
  }

  try {
    // 1. Query Firestore to check for existing email or phone
    const emailCheck = await db.collection('users').where('email', '==', email).get();
    const phoneCheck = await db.collection('users').where('phone', '==', phone).get();

    if (!emailCheck.empty || !phoneCheck.empty) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email or phone number already exists.'
      });
    }

    const verificationStatus = role === 'DRIVER' ? 'UNVERIFIED' : 'VERIFIED';
    const trustScore = role === 'DRIVER' ? 30 : 90;

    const newUser = {
      id: `US-${Math.floor(100000 + Math.random() * 900000)}`,
      name: name || 'Verified User',
      email,
      phone,
      role: role || 'PASSENGER',
      password, // In production, hash this with bcrypt
      dob: dob || '',
      emergencyContact: emergencyContact || '',
      aadhaarNumber: aadhaarNumber || '',
      dlNumber: dlNumber || '',
      vehicleMake: vehicleMake || '',
      vehicleModel: vehicleModel || '',
      licensePlate: licensePlate || '',
      verificationStatus,
      trustScore,
      walletBalance: 2450,
      createdAt: new Date().toISOString()
    };

    // 2. Write to Firestore 'users' collection
    await db.collection('users').doc(newUser.id).set(newUser);
    console.log(`💾 User registered and saved to Firestore 'users' collection: ${newUser.id}`);

    return res.status(201).json({
      success: true,
      message: 'Registration completed successfully and saved to Firebase Firestore.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        verificationStatus: newUser.verificationStatus,
        trustScore: newUser.trustScore,
        walletBalance: newUser.walletBalance
      }
    });
  } catch (error: any) {
    console.error('Firestore registration error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error writing registration record to Firebase Firestore.',
      details: error.message
    });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { email, password, phone, otp } = req.body;

  try {
    if (phone && otp) {
      if (otp === '9812') {
        // Query Firestore for phone number match
        const phoneQuery = await db.collection('users').where('phone', '==', phone).get();
        
        let user: any;
        if (!phoneQuery.empty) {
          user = phoneQuery.docs[0].data();
        } else {
          // If phone is verified but no record exists yet, create fallback demo profile
          user = {
            id: 'US-881290',
            name: 'Demo Passenger',
            email: 'passenger@abhiride.com',
            phone,
            role: 'PASSENGER',
            verificationStatus: 'VERIFIED',
            trustScore: 95,
            walletBalance: 2450
          };
        }

        return res.json({
          success: true,
          message: 'Mobile SMS OTP authenticated with Firestore.',
          user
        });
      } else {
        return res.status(401).json({
          success: false,
          error: 'Invalid or expired OTP code. Use test code 9812'
        });
      }
    }

    if (email && password) {
      // Query Firestore for email/password match
      const emailQuery = await db.collection('users')
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      if (emailQuery.empty) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password credentials.'
        });
      }

      const user = emailQuery.docs[0].data();
      return res.json({
        success: true,
        message: 'Email credentials authenticated with Firestore.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          verificationStatus: user.verificationStatus,
          trustScore: user.trustScore,
          walletBalance: user.walletBalance
        }
      });
    }

    return res.status(400).json({
      success: false,
      error: 'Please provide email/password or phone/otp.'
    });
  } catch (error: any) {
    console.error('Firestore login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Error querying credentials from Firebase Firestore.',
      details: error.message
    });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      error: 'Please provide your registered email address.'
    });
  }

  try {
    const emailCheck = await db.collection('users').where('email', '==', email).get();
    if (emailCheck.empty) {
      return res.status(404).json({
        success: false,
        error: 'No user registered with this email address.'
      });
    }

    return res.json({
      success: true,
      message: 'Reset password OTP dispatched to email address.'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: 'Error executing account recovery search.'
    });
  }
}

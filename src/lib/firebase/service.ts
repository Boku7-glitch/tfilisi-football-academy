import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as fbSignOut,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  addDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from './config';

export const firebaseService = {
  // 1. Sign Up User (Parent or Coach)
  async signUp(email: string, password: string, userData: { fullName: string; role: 'parent' | 'coach'; phone?: string }) {
    if (!isFirebaseConfigured() || !auth || !db) {
      return { success: false, fallback: true, error: 'Firebase is not configured yet. Running in local mode.' };
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: userData.fullName });

      // Save user profile in Firestore 'users' collection
      await setDoc(doc(db, 'users', userCred.user.uid), {
        uid: userCred.user.uid,
        email: email,
        fullName: userData.fullName,
        role: userData.role,
        phone: userData.phone || '',
        createdAt: new Date().toISOString()
      });

      return { success: true, user: userCred.user };
    } catch (error: any) {
      console.error('Firebase sign up error:', error);
      return { success: false, error: error.message };
    }
  },

  // 2. Sign In User
  async signIn(email: string, password: string) {
    if (!isFirebaseConfigured() || !auth || !db) {
      return { success: false, fallback: true, error: 'Firebase is not configured yet. Running in local mode.' };
    }

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      // Fetch profile
      const userDoc = await getDoc(doc(db, 'users', userCred.user.uid));
      const profileData = userDoc.exists() ? userDoc.data() : null;

      return { success: true, user: userCred.user, profile: profileData };
    } catch (error: any) {
      console.error('Firebase sign in error:', error);
      return { success: false, error: error.message };
    }
  },

  // 3. Sign Out
  async signOut() {
    if (!isFirebaseConfigured() || !auth) return;
    try {
      await fbSignOut(auth);
    } catch (e) {
      console.error('Firebase sign out error:', e);
    }
  },

  // 4. Save Player to Firestore
  async savePlayer(playerData: any) {
    if (!isFirebaseConfigured() || !db) return null;
    try {
      const docRef = await addDoc(collection(db, 'players'), {
        ...playerData,
        createdAt: new Date().toISOString()
      });
      return docRef.id;
    } catch (e) {
      console.error('Firestore save player error:', e);
      return null;
    }
  },

  // 5. Get Players for Parent by Email
  async getPlayersForParent(parentEmail: string) {
    if (!isFirebaseConfigured() || !db) return [];
    try {
      const q = query(collection(db, 'players'), where('parentEmail', '==', parentEmail));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error('Firestore get players error:', e);
      return [];
    }
  }
};

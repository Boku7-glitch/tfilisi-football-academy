import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
    locationsData,
    teamGroupsData,
    coachesData,
    staffData,
    newsData,
} from '../src/data/mockData';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('Missing NEXT_PUBLIC_FIREBASE_* variables in .env.local');
    process.exit(1);
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedCollection<T extends { id: string }>(
    collectionName: string,
    items: T[]
) {
    for (const item of items) {
        const ref = doc(db, collectionName, item.id);
        await setDoc(ref, item, { merge: true });
    }
    console.log(`Seeded ${items.length} items into "${collectionName}"`);
}

async function main() {
    console.log('Starting Firestore seed...');
    await seedCollection('locations', locationsData);
    await seedCollection('teamGroups', teamGroupsData);
    await seedCollection('coaches', coachesData);
    await seedCollection('staff', staffData);
    await seedCollection('news', newsData);
    console.log('Done! All mock data uploaded to Firestore.');
    process.exit(0);
}

main().catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
});
import { getFirestore } from 'firebase/firestore';
import app from './use-firebase';

const db = getFirestore(app);
export default db;

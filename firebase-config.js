// firebase-config.js — FRALEN CALLING CRM
// Same Firebase project as the main FRALEN Optical CRM. Shop owners log in
// with the SAME email/password here as on the main CRM — this app reads
// their existing customers/orders and writes new data (calls, leads,
// follow-ups, complaints, feedback, servicing, eye check-ups) into new
// subcollections under the same users/{uid} tree. Existing Firestore rules
// (users/{uid}/{document=**} owner-only) already cover any new
// subcollection automatically — no rules changes needed on the main CRM.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBHSFdvPAI1kz91whHbTj0rgUefVhPthLc",
  authDomain: "loginpage1-16430.firebaseapp.com",
  projectId: "loginpage1-16430",
  storageBucket: "loginpage1-16430.firebasestorage.app",
  messagingSenderId: "438297643443",
  appId: "1:438297643443:web:a2a75a2873d2746613e3c6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function tenantCollection(uid, collectionName) {
  if (!uid) throw new Error("tenantCollection() called without a uid");
  return collection(db, "users", uid, collectionName);
}

function tenantDoc(uid, collectionName, docId) {
  if (!uid) throw new Error("tenantDoc() called without a uid");
  return doc(db, "users", uid, collectionName, docId);
}

function profileDoc(uid) {
  return doc(db, "users", uid);
}

/**
 * Guard for every page. Redirects to index.html if nobody is logged in
 * (this app does NOT have its own signup — accounts are created on the
 * main FRALEN CRM and shared here via the same Firebase project).
 */
function requireAuth(onReady) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }
    onReady(user);
  });
}

export {
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  tenantCollection,
  tenantDoc,
  profileDoc,
  requireAuth,
};

/**
 * @file src/lib/firebase/admin-db.ts
 * @purpose Export Firestore and Auth server instances from Firebase Admin.
 * @tags firebase, firestore, auth, admin, server
 */
import { getAdminApp } from "./admin";
import admin from "firebase-admin";

export function getAdminDb(): admin.firestore.Firestore {
  const app = getAdminApp();
  return app.firestore();
}

export function getAdminAuth(): admin.auth.Auth {
  const app = getAdminApp();
  return app.auth();
}

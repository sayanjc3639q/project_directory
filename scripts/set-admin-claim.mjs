/**
 * @file scripts/set-admin-claim.mjs
 * @purpose Script to assign custom admin claim to a Firebase user email or UID.
 * @tags script, admin, firebase, claims
 */
import admin from "firebase-admin";

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error("Usage: node scripts/set-admin-claim.mjs <user-email>");
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp();
}

async function setAdmin() {
  try {
    const user = await admin.auth().getUserByEmail(targetEmail);
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    console.log(`Successfully assigned { admin: true } claim to: ${targetEmail} (${user.uid})`);
  } catch (err) {
    console.error("Failed to set admin claim:", err.message);
    process.exit(1);
  }
}

setAdmin();

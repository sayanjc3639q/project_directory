/**
 * @file scripts/create-admin-user.mjs
 * @purpose Creates or updates admin user and configures credentials in Firebase.
 * @tags admin, auth, user, credentials
 */
import fs from "node:fs";
import admin from "firebase-admin";

const credsPath = "D:/DDownload/bilibili-edu-firebase-adminsdk-fbsvc-3e71cc25ec.json";
const serviceAccount = JSON.parse(fs.readFileSync(credsPath, "utf8"));

let env = fs.readFileSync(".env.local", "utf8");
env = env.replace(/FIREBASE_CLIENT_EMAIL=.*(?:\r?\n|$)/, `FIREBASE_CLIENT_EMAIL=${serviceAccount.client_email}\n`);
const escapedKey = JSON.stringify(serviceAccount.private_key);
env = env.replace(/FIREBASE_PRIVATE_KEY=.*(?:\r?\n|$)/, `FIREBASE_PRIVATE_KEY=${escapedKey}\n`);
fs.writeFileSync(".env.local", env);
console.log(".env.local updated with service account credentials.");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

const email = process.argv[2] || "jcsayan7@gmail.com";
const password = process.argv[3] || "Sayan@300";

async function main() {
  let user;
  try {
    user = await admin.auth().getUserByEmail(email);
    console.log(`Found existing user: ${user.uid}. Updating password...`);
    await admin.auth().updateUser(user.uid, { password });
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      console.log(`Creating user: ${email}...`);
      user = await admin.auth().createUser({ email, password });
    } else {
      throw err;
    }
  }

  await admin.auth().setCustomUserClaims(user.uid, { admin: true });
  console.log(`SUCCESS: User ${email} created/updated with { admin: true } claim!`);
}

main().catch((err) => {
  console.error("Error creating admin user:", err);
  process.exit(1);
});

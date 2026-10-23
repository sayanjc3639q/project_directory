/**
 * @file scripts/seed-sample-data.mjs
 * @purpose Seed sample topics and blogs into Firestore for local testing.
 * @tags script, seed, firestore, sample-data
 */
import admin from "firebase-admin";

import fs from "node:fs";

const credsPath = "D:/DDownload/bilibili-edu-firebase-adminsdk-fbsvc-3e71cc25ec.json";
const serviceAccount = JSON.parse(fs.readFileSync(credsPath, "utf8"));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id,
  });
}

const db = admin.firestore();

async function seed() {
  console.log("Seeding sample topics and blogs...");
  const tRef = db.collection("topics").doc("EE0101");
  await tRef.set({
    id: "EE0101",
    name: "Electrical Engineering",
    slug: "electrical-engineering",
    parentId: null,
    level: 0,
    ancestors: [],
    slugPath: ["electrical-engineering"],
    pathKey: "electrical-engineering",
    nameChain: ["Electrical Engineering"],
    childCount: 0,
    blogCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  await db.collection("meta").doc("topicTree").set({
    tree: [
      {
        id: "EE0101",
        name: "Electrical Engineering",
        slug: "electrical-engineering",
        pathKey: "electrical-engineering",
        level: 0,
        children: []
      }
    ],
    updatedAt: new Date().toISOString()
  });

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

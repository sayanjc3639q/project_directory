/**
 * @file src/features/admin-topics/server/generateUniqueId.ts
 * @purpose Generates unique 6-character topic ID within a transaction with retries.
 * @tags topic, firestore, transaction, id, unique
 */
import { generateSubtopicId } from "@/lib/id/subtopicId";
import { COLLECTIONS } from "@/lib/firestore/collections";
import type admin from "firebase-admin";

const MAX_RETRIES = 5;

export async function generateUniqueTopicId(
  db: admin.firestore.Firestore,
  transaction: admin.firestore.Transaction
): Promise<string> {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    const candidateId = generateSubtopicId();
    const docRef = db.collection(COLLECTIONS.TOPICS).doc(candidateId);
    const snap = await transaction.get(docRef);

    if (!snap.exists) {
      return candidateId;
    }
  }

  throw new Error("Failed to generate unique subtopic ID after maximum attempts");
}

import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore, Timestamp} from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

function toTimestamp(strDate?: string): Timestamp | null {
  if (!strDate) {
    return null;
  }
  const datum = new Date(strDate);
  return Timestamp.fromDate(datum);
}

export const linearIssues = onRequest(async (req, res) => {
  logger.info("issue changed");
  const issue = req.body.data;
  logger.info("issue", issue);

  const id = issue.id;
  logger.info("id", id);

  const docRef = db.collection("issues").doc(id);

  try {
    issue.timeCreated = toTimestamp(issue.createdAt);
    issue.timeUpdated = toTimestamp(issue.updatedAt);
    issue.timeCompleted = toTimestamp(issue.completedAt);
  } catch (e) {
    logger.error("Timestamp conversion", e);
  }

  // TODO: Convert timestamps to Firestore Timestamps so they can be queried
  await docRef.set(issue, {merge: true});
  res.send(200);
});

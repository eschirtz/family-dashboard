import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

initializeApp();
const db = getFirestore();

export const linearIssues = onRequest(async (req, res) => {
  logger.info("issue changed");
  const issue = req.body.data;
  logger.info("issue", issue);

  const id = issue.id;
  logger.info("id", id);

  const docRef = db.collection("issues").doc(id);

  // TODO: Convert timestamps to Firestore Timestamps so they can be queried
  await docRef.set(issue, {merge: true});
  res.send(200);
});

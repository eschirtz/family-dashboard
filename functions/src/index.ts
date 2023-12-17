/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import {LinearClient, WorkflowState} from "@linear/sdk";


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getTasks = onCall(async (request) => {
  logger.info("getTasks");
  // Api key authentication
  const linear = new LinearClient({
    apiKey: "lin_api_cLEemAQ5f6K03GCdhiFWR5LNZGFATlwskB0h8Bfa",
  });
  logger.info("linear initialization complete");
  // const text = request.data.text;
  // Authentication / user information is automatically added to the request.
  // const uid = request.auth?.uid;

  // get linear issues
  const me = await linear.viewer;
  logger.info("linear viewer", me);
  const myIssues = await me.assignedIssues();
  logger.info("myIssues", myIssues);


  const tasks: {title: string, state?: WorkflowState }[] = [];
  if (myIssues.nodes.length) {
    myIssues.nodes.map(
      async (issue) => tasks.push({
        title: issue.title,
        state: await issue.state,
      }));
  }
  const payload = {tasks};
  logger.info("getTasks", payload);
  return payload;
});

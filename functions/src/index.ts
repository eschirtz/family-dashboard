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
import {LinearClient} from "@linear/sdk";


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const getTasks = onCall(async () => {
  logger.info("getTasks");
  // Api key authentication
  const linear = new LinearClient({
    apiKey: process.env.LINEAR_API_KEY,
  });
  logger.info("linear initialization complete");
  // const text = request.data.text;
  // Authentication / user information is automatically added to the request.
  // const uid = request.auth?.uid;

  // get linear issues
  const me = await linear.viewer;
  logger.info("linear viewer", me);
  // const myIssues = await me.assignedIssues();

  const issues = await linear.issues({
    filter: {

    },
  });
  const tasks: {[id: string]: {
    title: string,
    priority?: number,
    state?: string
  }} = {};

  for (const issue of issues.nodes) {
    logger.info("issue", issue);
    const title = issue.title;
    const priority = issue.priority;
    const workflowState = await issue.state;
    tasks[issue.id] = {title, priority, state: workflowState?.name};
  }

  // if (myIssues.nodes.length) {
  //   logger.info("myIssues.nodes.length", myIssues.nodes.length);
  //   await Promise.all(myIssues.nodes.map(
  //     async (issue) => {
  //       logger.info("issue", issue);
  //       const state = await issue.state;
  //       logger.info("state", state);
  //       // tasks.push({title: issue.title, state});
  //     }
  //   ));
  // }
  const payload = {tasks};
  logger.info("getTasks", payload);
  return payload;
});

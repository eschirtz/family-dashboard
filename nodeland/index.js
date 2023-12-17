import dotenv from 'dotenv';
import { LinearClient } from '@linear/sdk';

dotenv.config();

// Api key authentication
const linearClient = new LinearClient({
  apiKey: process.env.LINEAR_API_KEY
})

async function getMyIssues() {
  const issues = await linearClient.issues();
  console.log(issues);
}

getMyIssues();
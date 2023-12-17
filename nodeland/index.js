import { LinearClient } from '@linear/sdk'

// Api key authentication
const linearClient = new LinearClient({
  apiKey: "lin_api_PMJynIC8qQGIcXqVSlqBQ0iFYpJAkW7QYMsqMiYj"
})

async function getMyIssues() {
  const me = await linearClient.viewer;
  const myIssues = await me.assignedIssues();

  if (myIssues.nodes.length) {
    myIssues.nodes.map(async issue => console.log(`${me.displayName} has issue: ${issue.title} "${(await issue.state).name}"`));
  } else {
    console.log(`${me.displayName} has no issues`);
  }
}

getMyIssues();
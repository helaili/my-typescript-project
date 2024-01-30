import { GitHubAPI } from "./api/github.js";

async function main() {
  console.log('Hello World!');

  if (!process.env.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN is not set');
  }
  const token: string = process.env.GITHUB_TOKEN;

  const api = new GitHubAPI(token);
  const orgId = await api.getOrgId('github');
  console.log(`Organization ID: ${orgId}`);
  
}

main().catch(console.error);
import { vercelLog } from './_lib/vercel-log';

const DEFAULT_PUBLIC_GITHUB_USERNAME = 'elainejlopez8';

export default async function handler(request, response) {
  try {
    const githubToken = process.env.GITHUB_TOKEN;
    const rawUsername = request.query?.username;
    const requestedUsername = Array.isArray(rawUsername)
      ? rawUsername[0]
      : typeof rawUsername === 'string'
        ? rawUsername
        : undefined;
    const fallbackUsername =
      process.env.GITHUB_USERNAME || process.env.VITE_GITHUB_USERNAME || DEFAULT_PUBLIC_GITHUB_USERNAME;
    const username = requestedUsername || (!githubToken ? fallbackUsername : undefined);
    const url = username
      ? `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
      : 'https://api.github.com/user/repos?per_page=100&sort=updated';

    const headers = { Accept: 'application/vnd.github.v3+json, application/vnd.github.mercy-preview+json' };
    if (githubToken) headers.Authorization = `token ${githubToken}`;

    const githubResponse = await fetch(url, { headers });
    const data = await githubResponse.json();

    if (!githubResponse.ok) {
      return response.status(githubResponse.status || 500).json(data);
    }

    if (request.query?.debug === 'true') {
      return response.status(200).json(data);
    }

    const enrichRepo = async (repo) => {
      try {
        const owner = repo.owner && repo.owner.login ? repo.owner.login : username || '';
        if (!owner || !repo.name) return repo;

        const repoUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo.name)}`;
        const repoResponse = await fetch(repoUrl, { headers });
        if (!repoResponse.ok) return repo;

        const repoJson = await repoResponse.json();
        const topics = Array.isArray(repoJson.topics) ? repoJson.topics : Array.isArray(repo.topics) ? repo.topics : [];

        return {
          ...repo,
          topics,
          homepage: repoJson.homepage || repo.homepage || null,
        };
      } catch {
        return repo;
      }
    };

    const trimmed = [];
    if (Array.isArray(data)) {
      const concurrency = 8;
      for (let index = 0; index < data.length; index += concurrency) {
        const batch = data.slice(index, index + concurrency);
        const results = await Promise.all(batch.map((repo) => enrichRepo(repo)));
        for (const repo of results) {
          trimmed.push({
            id: repo.id,
            name: repo.name,
            repo_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            prod_url: repo.homepage || null,
            topics: Array.isArray(repo.topics) ? repo.topics : [],
          });
        }
      }
    }

    return response.status(200).json(trimmed);
  } catch (error) {
    vercelLog('error', '[github-repos] Failed to load repositories', {
      message: error?.message || String(error),
      stack: error?.stack,
      username: request.query?.username,
    });
    return response.status(500).json({ error: error.message || String(error) });
  }
}

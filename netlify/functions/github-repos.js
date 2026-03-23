/* Netlify Function: github-repos
   - If `?username=` is provided, returns that user's public repos
   - Otherwise returns authenticated user's repos (requires GITHUB_TOKEN env var)
   - Returns a trimmed list of fields to the client
*/
const handler = async (event) => {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const username = event.queryStringParameters && event.queryStringParameters.username;
    const url = username
      ? `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
      : `https://api.github.com/user/repos?per_page=100&sort=updated`;

    if (!username && !GITHUB_TOKEN) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'GITHUB_TOKEN is required to list private repos' }),
      };
    }

    // Request topics via the topics preview media type as well
    const headers = { Accept: 'application/vnd.github.v3+json, application/vnd.github.mercy-preview+json' };
    if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!res.ok) {
      return { statusCode: res.status || 500, body: JSON.stringify(data) };
    }

    // For debugging: return the full GitHub response when ?debug=true is provided.
    const debug = event.queryStringParameters && event.queryStringParameters.debug === 'true';
    if (debug) {
      return { statusCode: 200, body: JSON.stringify(data, null, 2) };
    }

    // Always enrich per-repo details (homepage + topics) by fetching the repo endpoint.
    // To avoid blowing the rate limit, process requests in small batches.
    const enrichRepo = async (r) => {
      try {
        const owner = r.owner && r.owner.login ? r.owner.login : username || '';
        if (!owner || !r.name) return r;
        const repoUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(r.name)}`;
        const repoRes = await fetch(repoUrl, { headers });
        if (!repoRes.ok) return r;
        const repoJson = await repoRes.json();
        const topics = Array.isArray(repoJson.topics) ? repoJson.topics : Array.isArray(r.topics) ? r.topics : [];
        const name = (repoJson.name || r.name || '').toLowerCase();
        const desc = (repoJson.description || r.description || '').toLowerCase();
        const incompleteVal =
          typeof repoJson.archived === 'boolean' ||
          /(archived|unfinished|incomplete)/.test(name) ||
          /(archived|unfinished|incomplete)/.test(desc) ||
          topics.some((t) => /(archived|unfinished|incomplete)/.test((t || '').toLowerCase()))
            ? true
            : false;
        const completedFlag =
          /(completed|done|finished)/.test(name) ||
          /(completed|done|finished)/.test(desc) ||
          topics.some((t) => /(completed|done|finished)/.test((t || '').toLowerCase()));

        return Object.assign({}, r, {
          topics,
          homepage: repoJson.homepage || r.homepage || null,
          incomplete: incompleteVal,
          completed: completedFlag,
        });
      } catch (err) {
        return r;
      }
    };

    const trimmed = [];
    if (Array.isArray(data)) {
      const concurrency = 8; // number of parallel per-repo requests
      for (let i = 0; i < data.length; i += concurrency) {
        const batch = data.slice(i, i + concurrency);
        const results = await Promise.all(batch.map((r) => enrichRepo(r)));
        for (const r of results) {
          trimmed.push({
            id: r.id,
            name: r.name,
            repo_url: r.html_url,
            description: r.description,
            language: r.language,
            updated_at: r.updated_at,
            prod_url: r.homepage || null,
            topics: Array.isArray(r.topics) ? r.topics : [],
          });
        }
      }
    }

    // Always return enriched results
    return { statusCode: 200, body: JSON.stringify(trimmed, null, 2) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
  }
};

// ESM export for environments that load this file as an ES module
export default handler;
export { handler };

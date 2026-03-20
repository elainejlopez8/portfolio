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

    const headers = { Accept: 'application/vnd.github.v3+json' };
    if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

    const res = await fetch(url, { headers });
    const data = await res.json();

    if (!res.ok) {
      return { statusCode: res.status || 500, body: JSON.stringify(data) };
    }

    const trimmed = Array.isArray(data)
      ? data.map((r) => ({
          id: r.id,
          name: r.name,
          html_url: r.html_url,
          description: r.description,
          language: r.language,
          stargazers_count: r.stargazers_count,
          updated_at: r.updated_at,
        }))
      : [];

    return { statusCode: 200, body: JSON.stringify(trimmed) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || String(err) }) };
  }
};

module.exports = { handler };

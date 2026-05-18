import { NextRequest, NextResponse } from 'next/server';
import { vercelLog } from '../../../../lib/vercel-log';

const DEFAULT_PUBLIC_GITHUB_USERNAME = 'elainejlopez8';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  homepage: string | null;
  topics?: string[];
  owner?: { login?: string };
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const githubToken = process.env.GITHUB_TOKEN;
    const requestedUsername = searchParams.get('username') ?? undefined;
    const debugMode = searchParams.get('debug') === 'true';

    const fallbackUsername = process.env['GITHUB_USERNAME'] || DEFAULT_PUBLIC_GITHUB_USERNAME;
    const username = requestedUsername || (!githubToken ? fallbackUsername : undefined);
    const url = username
      ? `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
      : 'https://api.github.com/user/repos?per_page=100&sort=updated';

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json, application/vnd.github.mercy-preview+json',
    };
    if (githubToken) headers.Authorization = `token ${githubToken}`;

    const githubResponse = await fetch(url, { headers });
    const data = await githubResponse.json();

    if (!githubResponse.ok) {
      return NextResponse.json(data, { status: githubResponse.status || 500 });
    }

    if (debugMode) {
      return NextResponse.json(data);
    }

    const enrichRepo = async (repo: Repo) => {
      try {
        const owner = repo.owner?.login ?? username ?? '';
        if (!owner || !repo.name) return repo;

        const repoUrl = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo.name)}`;
        const repoResponse = await fetch(repoUrl, { headers });
        if (!repoResponse.ok) return repo;

        const repoJson = await repoResponse.json();
        return {
          ...repo,
          topics: Array.isArray(repoJson.topics) ? repoJson.topics : (repo.topics ?? []),
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
        const results = await Promise.all(batch.map((repo: Repo) => enrichRepo(repo)));
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

    return NextResponse.json(trimmed);
  } catch (error) {
    const err = error as Error;
    vercelLog('error', '[github-repos] Failed to load repositories', {
      message: err?.message || String(error),
      stack: err?.stack,
    });
    return NextResponse.json({ error: err.message || String(error) }, { status: 500 });
  }
}

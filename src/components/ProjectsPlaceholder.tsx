import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count?: number;
  updated_at?: string;
};

interface Props {
  githubUsername?: string;
  codeioEndpoint?: string;
  useAuthenticated?: boolean;
  placeholderTitle?: string;
}

const ProjectsPlaceholder: React.FC<Props> = ({
  githubUsername = (import.meta as any).env?.VITE_GITHUB_USERNAME || '',
  codeioEndpoint,
  useAuthenticated = (import.meta as any).env?.VITE_GITHUB_USE_AUTH === 'true',
  placeholderTitle = 'Projects',
}) => {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [codeio, setCodeio] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchGithub() {
      try {
        // If configured to use authenticated listing, try that first
        if (useAuthenticated) {
          const res = await fetch(`/.netlify/functions/github-repos`);
          if (res.ok) {
            const data: Repo[] = await res.json();
            if (!mounted) return;
            setRepos(data);
            return;
          }

          // if server indicates token missing and a username is available, fall back
          const body = await res.json().catch(() => ({}));
          const errMsg = body && body.error ? String(body.error) : `GitHub proxy: ${res.status}`;
          if (errMsg.includes('GITHUB_TOKEN') && githubUsername) {
            // fallback to public user repos
            const res2 = await fetch(`/.netlify/functions/github-repos?username=${encodeURIComponent(githubUsername)}`);
            if (!res2.ok) throw new Error(`GitHub proxy: ${res2.status}`);
            const data2: Repo[] = await res2.json();
            if (!mounted) return;
            setRepos(data2);
            return;
          }

          throw new Error(errMsg);
        }

        // default: fetch by username (public repos only)
        if (!githubUsername) {
          setLoading(false);
          return;
        }
        const res = await fetch(`/.netlify/functions/github-repos?username=${encodeURIComponent(githubUsername)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `GitHub proxy: ${res.status}`);
        }
        const data: Repo[] = await res.json();
        if (!mounted) return;
        setRepos(data);
      } catch (e: any) {
        if (!mounted) return;
        setError(e.message || 'Failed to load GitHub repos');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    async function fetchCodeio() {
      if (!codeioEndpoint) return;
      try {
        const res = await fetch(codeioEndpoint);
        if (!res.ok) throw new Error(`Codeio: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setCodeio(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Error fetching Codeio projects:', e);
      }
    }

    fetchGithub();
    fetchCodeio();

    return () => {
      mounted = false;
    };
  }, [githubUsername, codeioEndpoint]);

  return (
    <Container fluid='lg' className='projects-placeholder w-full'>
      <h1 className='type-display uppercase'>{placeholderTitle}</h1>

      {loading && <p className='text-muted'>Loading projects…</p>}

      {error && <p className='text-danger'>Error: {error}</p>}

      {!loading && !error && (
        <>
          {repos && repos.length > 0 ? (
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target='_blank'
                  rel='noreferrer'
                  className='block rounded border bg-white p-4 hover:shadow-sm dark:bg-slate-800'>
                  <h3 className='font-semibold'>{r.name}</h3>
                  {r.description && <p className='text-muted text-sm'>{r.description}</p>}
                  <div className='mt-2 flex gap-3 text-xs'>
                    {r.language && <span className='rounded bg-gray-100 px-2 py-1'>{r.language}</span>}
                    {typeof r.stargazers_count === 'number' && (
                      <span className='rounded bg-gray-100 px-2 py-1'>★ {r.stargazers_count}</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className='w-full'>
              <p className='text-muted'>No GitHub projects found.</p>
              <p className='text-sm'>
                To auto-populate from GitHub set `VITE_GITHUB_USERNAME` in your environment or pass a `githubUsername`
                prop to this component.
              </p>
            </div>
          )}

          {codeio && codeio.length > 0 && (
            <section className='mt-6'>
              <h4 className='uppercase'>Codeio Projects</h4>
              <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                {codeio.map((p: any, i: number) => (
                  <a key={i} href={p.url || '#'} className='block rounded border p-3'>
                    <strong>{p.title || p.name}</strong>
                    {p.description && <div className='text-sm'>{p.description}</div>}
                  </a>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </Container>
  );
};

export default ProjectsPlaceholder;

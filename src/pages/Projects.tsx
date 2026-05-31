'use client';

import errorImg from '@/assets/error.png';
import loadingImg from '@/assets/loading.gif';
import waitImg from '@/assets/wait.png';
import { usePageLayout } from '@/components/PageLayout';
import ProjectCard from '@/components/ProjectCard';
import { fallbackProjectLabels } from '@/lib/payload-content';
import type { ProjectLabels } from '@/payload/types';
import type { Repo } from '@/types';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const DEFAULT_SECTION_ID = 'projects';
const GITHUB_REPOS_ENDPOINT = '/api/github-repos';
const DEFAULT_GITHUB_USERNAME = 'elainejlopez8';

type Props = {
  sectionId?: string;
  title?: string;
  labels: ProjectLabels;
};

const Projects = ({ sectionId = DEFAULT_SECTION_ID, title, labels }: Props) => {
  const { setLoaded } = usePageLayout();
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setLoaded(true), [setLoaded]);

  useEffect(() => {
    let mounted = true;

    async function fetchGithubRepos(username?: string) {
      const url = username
        ? `${GITHUB_REPOS_ENDPOINT}?username=${encodeURIComponent(username)}`
        : GITHUB_REPOS_ENDPOINT;
      const response = await fetch(url);

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const errorMessage = body && body.error ? String(body.error) : `GitHub proxy: ${response.status}`;
        throw new Error(errorMessage);
      }

      return (await response.json()) as Repo[];
    }

    async function fetchGithub() {
      const githubUsername = process.env['NEXT_PUBLIC_GITHUB_USERNAME'] || DEFAULT_GITHUB_USERNAME;
      const shouldUseAuth = process.env['NEXT_PUBLIC_GITHUB_USE_AUTH'] !== 'false';

      try {
        if (shouldUseAuth) {
          const data = await fetchGithubRepos();
          if (!mounted) return;
          setRepos(data);
          return;
        }

        const publicRepos = await fetchGithubRepos(githubUsername);
        if (!mounted) return;
        setRepos(publicRepos);
      } catch (authError: unknown) {
        if (!shouldUseAuth) {
          if (!mounted) return;
          const message = authError instanceof Error ? authError.message : 'Failed to load GitHub repos';
          setError(message);
          return;
        }
        if (!githubUsername) {
          if (!mounted) return;
          setError(authError instanceof Error ? authError.message : 'Failed to load GitHub repos');
          return;
        }

        try {
          const publicRepos = await fetchGithubRepos(githubUsername);
          if (!mounted) return;
          setRepos(publicRepos);
        } catch (publicError: unknown) {
          if (!mounted) return;

          const message = publicError instanceof Error ? publicError.message : 'Failed to load GitHub repos';
          const authMessage = authError instanceof Error ? authError.message : null;
          setError(authMessage && authMessage !== message ? `${message} (${authMessage})` : message);
        }
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    fetchGithub();

    return () => {
      mounted = false;
    };
  }, []);

  const [activeTab, setActiveTab] = useState<string>('all');

  const completed: Repo[] = repos
    ? repos.filter(
        (r) =>
          r.topics && (r.topics.includes('completed') || r.topics.includes('finished') || r.topics.includes('done'))
      )
    : [];
  const wip: Repo[] = repos
    ? repos.filter((r) => r.topics && (r.topics.includes('wip') || r.topics.includes('in-progress')))
    : [];

  const groupByType = (arr: Repo[]) =>
    arr.reduce(
      (acc: Record<string, Repo[]>, r) => {
        const type = r.language || 'Other';
        if (!acc[type]) acc[type] = [];
        acc[type].push(r);
        return acc;
      },
      {} as Record<string, Repo[]>
    );

  const wipGroups = groupByType(wip);
  const completedGroups = groupByType(completed);
  const hasGithubProjects = Boolean(repos && repos.length > 0);

  const safeLabels = labels ?? fallbackProjectLabels;

  return (
    <Container fluid='lg' className='page-section' id={sectionId}>
      <h1 className='type-display uppercase'>{title || safeLabels.title}</h1>

      {loading && (
        <div className='d-flex flex-column align-items-center justify-content-center my-4 text-center'>
          <img src={loadingImg.src} alt='Loading projects...' className='mx-auto w-full md:w-1/3' />
          <p className='text-muted mt-2'>{safeLabels.loading}</p>
        </div>
      )}

      {error && (
        <div className='d-flex flex-column align-items-center justify-content-center my-4 text-center'>
          <img src={errorImg.src} alt='Oops' className='mx-auto' />
          <p className='text-danger mt-2'>{safeLabels.error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className='mb-4'>
            <div role='tablist' aria-label='Project categories' className='mb-2 flex flex-wrap gap-2'>
              {[
                { key: 'all', label: safeLabels.all },
                { key: 'wip', label: safeLabels.wip },
                { key: 'completed', label: safeLabels.completed },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role='tab'
                  aria-selected={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex-1 border-b-4 border-b-blue-500 px-1.5 py-2 text-sm! font-bold text-blue-500 sm:min-w-40 md:w-auto md:text-base! lg:text-lg! ${activeTab === tab.key ? 'rounded-t-lg! bg-blue-300 text-white' : 'btn-outline-secondary'} hover:rounded-t-lg! hover:border-b-pink-500 hover:bg-pink-300 hover:text-white`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {hasGithubProjects ? (
            <>
              {(activeTab === 'all' || activeTab === 'completed') && (
                <section>
                  {activeTab === 'all' && Object.keys(completedGroups).length > 0 && (
                    <h2 className='mb-4! text-purple-500!'>{safeLabels.completed}</h2>
                  )}
                  {Object.keys(completedGroups).length > 0
                    ? Object.keys(completedGroups).map((type) => (
                        <div key={`done-group-${type}`} className='mb-4'>
                          <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                            {completedGroups[type].map((r) => (
                              <ProjectCard
                                key={`done-${r.id}`}
                                r={r}
                                variant='completed'
                                goToRepo={safeLabels.goToRepo}
                                liveSite={safeLabels.liveSite}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    : activeTab === 'completed' && <p className='text-muted'>{safeLabels.noCompleted}</p>}
                </section>
              )}

              {(activeTab === 'all' || activeTab === 'wip') && (
                <section className='mb-6'>
                  {activeTab === 'all' && Object.keys(wipGroups).length > 0 && (
                    <h2 className='mb-4! text-pink-500!'>{safeLabels.wip}</h2>
                  )}
                  {Object.keys(wipGroups).length > 0
                    ? Object.keys(wipGroups).map((type) => (
                        <div key={`wip-group-${type}`} className='mb-4'>
                          <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                            {wipGroups[type].map((r) => (
                              <ProjectCard
                                key={`wip-${r.id}`}
                                r={r}
                                variant='wip'
                                goToRepo={safeLabels.goToRepo}
                                liveSite={safeLabels.liveSite}
                              />
                            ))}
                          </div>
                        </div>
                      ))
                    : activeTab === 'wip' && <p className='text-muted'>{safeLabels.noWip}</p>}
                </section>
              )}
            </>
          ) : (
            <div className='w-full'>
              <img src={waitImg.src} alt='No projects yet' className='mx-auto mb-4 w-full md:w-1/3' />
              <p className='text-muted'>{safeLabels.noProjects}</p>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Projects;

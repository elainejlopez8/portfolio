import errorImg from '@/assets/error.png';
import loadingImg from '@/assets/loading.gif';
import waitImg from '@/assets/wait.png';
import { usePageLayout } from '@/components/PageLayout';
import ProjectCard from '@/components/ProjectCard';
import { useContent } from '@/hooks/useContent';
import { CONTENT_KEYS } from '@/services/content/i18n';
import type { CodePenApiItem, CodePenProject, PageProps, Repo } from '@/types';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

const DEFAULT_SECTION_ID = 'projects';
const DEFAULT_TITLE = 'Projects';
const GITHUB_REPOS_ENDPOINT = '/api/github-repos';

const mapCodePenItem = (item: CodePenApiItem): CodePenProject => ({
  url: item.link || item.pen_link || item.url || '#',
  title: item.title || item.slug || item.name || 'Untitled',
  description: item.description || '',
});

const Projects = ({ sectionId = DEFAULT_SECTION_ID, title = DEFAULT_TITLE }: PageProps) => {
  const { setLoaded } = usePageLayout();
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [codePen, setCodePen] = useState<CodePenProject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setLoaded(true), [setLoaded]);

  useEffect(() => {
    let mounted = true;

    async function fetchGithub() {
      try {
        const res = await fetch(GITHUB_REPOS_ENDPOINT);
        if (res.ok) {
          const data: Repo[] = await res.json();
          if (!mounted) return;
          setRepos(data);
          return;
        }

        const body = await res.json().catch(() => ({}));
        const errMsg = body && body.error ? String(body.error) : `GitHub proxy: ${res.status}`;
        const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || '';

        if (errMsg.includes('GITHUB_TOKEN') && githubUsername) {
          const res2 = await fetch(`${GITHUB_REPOS_ENDPOINT}?username=${encodeURIComponent(githubUsername)}`);
          if (!res2.ok) throw new Error(`GitHub proxy: ${res2.status}`);
          const data2: Repo[] = await res2.json();

          if (!mounted) return;
          setRepos(data2);
          return;
        }

        throw new Error(errMsg);
      } catch (e: unknown) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : 'Failed to load GitHub repos');
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    }

    async function fetchCodepen() {
      const username = import.meta.env.VITE_CODEPEN_USERNAME || '';
      const endpoint = username ? `https://cpv2api.com/pens/user/${encodeURIComponent(username)}?limit=12` : '';
      if (!endpoint) return;

      try {
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`CodePen: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;

        const items = Array.isArray(data)
          ? data.map((p: CodePenApiItem) => mapCodePenItem(p))
          : Array.isArray(data?.data)
            ? data.data.map((p: CodePenApiItem) => mapCodePenItem(p))
            : [];

        setCodePen(items);
      } catch (e) {
        console.error('Error fetching CodePen projects:', e);
      }
    }

    fetchGithub();
    fetchCodepen();

    return () => {
      mounted = false;
    };
  }, []);

  const { t } = useContent(sectionId as CONTENT_KEYS);
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
  const unfinished: Repo[] = repos
    ? repos.filter(
        (r) =>
          r.topics &&
          (r.topics.includes('archived') || r.topics.includes('unfinished') || r.topics.includes('incomplete'))
      )
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

  const unfinishedGroups = groupByType(unfinished);
  const wipGroups = groupByType(wip);
  const completedGroups = groupByType(completed);
  const hasGithubProjects = Boolean(repos && repos.length > 0);
  const hasCodepenProjects = Boolean(codePen && codePen.length > 0);

  return (
    <Container fluid='lg' className='page-section' id={sectionId}>
      <h1 className='type-display uppercase'>{title || t('title')}</h1>

      {loading && (
        <div className='d-flex flex-column align-items-center justify-content-center my-4 text-center'>
          <img src={loadingImg} alt='Loading projects...' className='mx-auto w-full md:w-1/3' />
          <p className='text-muted mt-2'>{t('loading')}</p>
        </div>
      )}

      {error && (
        <div className='d-flex flex-column align-items-center justify-content-center my-4 text-center'>
          <img src={errorImg} alt='Oops' className='mx-auto' />
          <p className='text-danger mt-2'>{t('error')}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className='mb-4'>
            <div role='tablist' aria-label='Project categories' className='mb-2 flex flex-wrap gap-2'>
              {[
                { key: 'all', label: t('all') },
                { key: 'wip', label: t('wip') },
                { key: 'completed', label: t('completed') },
                { key: 'unfinished', label: t('unfinished') },
                { key: 'codepen', label: t('codepenTitle') },
              ].map((tab) => (
                <button
                  key={tab.key}
                  role='tab'
                  aria-selected={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex-1 border-b-4 border-b-pink-500 px-1.5 py-2 text-sm! font-bold text-pink-500 sm:min-w-40 md:w-auto md:text-base! lg:text-lg! ${activeTab === tab.key ? 'bg-pink-500 text-white md:rounded-t-lg!' : 'btn-outline-secondary'} hover:border-b-blue-300 hover:bg-blue-300 hover:text-white md:hover:rounded-t-lg!`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {hasGithubProjects && activeTab !== 'codepen' && (
            <>
              {(activeTab === 'all' || activeTab === 'completed') && (
                <section>
                  {activeTab === 'all' && <h2 className='mb-6 text-purple-500!'>{t('completed')}</h2>}
                  {Object.keys(completedGroups).length > 0 ? (
                    Object.keys(completedGroups).map((type) => (
                      <div key={`done-group-${type}`} className='mb-4'>
                        <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                          {completedGroups[type].map((r) => (
                            <ProjectCard key={`done-${r.id}`} r={r} variant='completed' />
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className='text-muted'>{t('noCompleted')}</p>
                  )}
                </section>
              )}

              {(activeTab === 'all' || activeTab === 'wip') && (
                <section className='mb-6'>
                  {activeTab === 'all' && <h2 className='mb-6 text-pink-500!'>{t('wip')}</h2>}
                  {Object.keys(wipGroups).map((type) => (
                    <div key={`wip-group-${type}`} className='mb-4'>
                      <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {wipGroups[type].map((r) => (
                          <ProjectCard key={`wip-${r.id}`} r={r} variant='wip' />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              )}

              {(activeTab === 'all' || activeTab === 'unfinished') && Object.keys(unfinishedGroups).length > 0 ? (
                <section className='mb-6'>
                  {activeTab === 'all' && <h2 className='mb-6 text-blue-500!'>{t('unfinished')}</h2>}
                  {Object.keys(unfinishedGroups).map((type) => (
                    <div key={`unfinished-group-${type}`} className='mb-4'>
                      <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
                        {unfinishedGroups[type].map((r) => (
                          <ProjectCard key={`archived-${r.id}`} r={r} variant='archived' />
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ) : (
                activeTab === 'unfinished' && <p className='text-muted'>{t('noUnfinished')}</p>
              )}
            </>
          )}

          {(activeTab === 'all' || activeTab === 'codepen') &&
            (hasCodepenProjects ? (
              <section className='mt-6'>
                {activeTab === 'all' && <h2 className='mb-6 text-purple-500!'>{t('codepenTitle')}</h2>}
                <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                  {(codePen ?? []).map((project) => (
                    <a
                      key={`${project.url}-${project.title}`}
                      href={project.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block rounded border bg-pink-100 p-3'>
                      <strong>{project.title}</strong>
                      {project.description && <div className='text-sm'>{project.description}</div>}
                    </a>
                  ))}
                </div>
              </section>
            ) : (
              activeTab === 'codepen' && <p className='text-muted'>{t('noCodePenProjects')}</p>
            ))}

          {!hasGithubProjects && !hasCodepenProjects && (
            <div className='w-full'>
              <img src={waitImg} alt='No projects yet' className='mx-auto mb-4 w-full md:w-1/3' />
              <p className='text-muted'>{t('noProjects')}</p>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Projects;

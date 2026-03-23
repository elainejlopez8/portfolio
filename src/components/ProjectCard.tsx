import { useContent } from '@/hooks/useContent';
import { Repo } from '@/types';
import { startCase } from 'lodash';
import React from 'react';

interface CardProps {
  r: Repo;
  variant?: 'archived' | 'wip' | 'completed';
}

const variantStyles = {
  archived: {
    bg: 'bg-blue-100',
    projectName: 'text-blue-400!',
    languageTag: 'text-blue-500',
    repoButton: 'border-blue-500 text-blue-500! hover:bg-blue-500!',
    prodButton: 'bg-blue-500 hover:text-blue-500! border-blue-500',
  },
  completed: {
    bg: 'bg-purple-100',
    projectName: 'text-purple-400!',
    languageTag: 'text-purple-500',
    repoButton: 'border-purple-500 text-purple-500! hover:bg-purple-500!',
    prodButton: 'bg-purple-500 hover:text-purple-500! border-purple-500',
  },
  wip: {
    bg: 'bg-pink-100',
    projectName: 'text-pink-400!',
    languageTag: 'text-pink-500',
    repoButton: 'border-pink-500 text-pink-500! hover:bg-pink-500!',
    prodButton: 'bg-pink-500 hover:text-pink-500! border-pink-500',
  },
} as const;

const ProjectCard: React.FC<CardProps> = ({ r, variant = 'wip' }) => {
  const { t } = useContent('projects');
  const styles = variantStyles[variant];
  const projectName = String(r.name || '');

  return (
    <div
      className={`flex h-full flex-col justify-between rounded border p-4 hover:shadow-sm dark:bg-slate-800 ${styles.bg}`}>
      <h4 className={`font-subheading text-xl! font-bold! ${styles.projectName}`}>{startCase(projectName)}</h4>
      {r.description && <p className='text-muted text-base!'>{r.description}</p>}

      <div className='mt-4 flex-1' />

      <div className='mx-auto mt-2 flex flex-col gap-2 text-xs sm:flex-row sm:flex-wrap sm:items-center'>
        {r.language && (
          <span
            className={`inline-block w-full rounded border-2 border-white bg-white px-3 py-1.5 text-xs font-medium sm:w-fit ${styles.languageTag}`}>
            {r.language}
          </span>
        )}
        {r.repo_url && (
          <a
            href={r.repo_url}
            target='_blank'
            rel='noreferrer'
            className={`inline-block w-full rounded border-2 bg-transparent px-3 py-1.5 text-center text-xs font-medium hover:transform-none! hover:text-white! sm:w-fit ${styles.repoButton}`}
            aria-label={t('goToRepo')}>
            {t('goToRepo')}
          </a>
        )}
        {r.prod_url && (
          <a
            href={r.prod_url}
            target='_blank'
            rel='noreferrer'
            className={`inline-block w-full rounded border-2 px-3 py-1.5 text-center text-xs font-medium text-white hover:transform-none! hover:border-2 hover:bg-transparent sm:w-fit ${styles.prodButton}`}
            aria-label={t('liveSite')}>
            {t('liveSite')}
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;

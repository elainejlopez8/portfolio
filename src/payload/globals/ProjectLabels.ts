import type { GlobalConfig } from 'payload';

export const ProjectLabels: GlobalConfig = {
  slug: 'project-labels',
  label: 'Projects',
  admin: {
    description: 'UI labels and messages used on the Projects page.',
    components: {
      elements: {
        SaveButton: '@/app/(payload)/cms/components/SaveButton#SaveButton',
      },
    },
  },
  fields: [
    { name: 'title', type: 'text', label: 'Page Title', admin: { placeholder: 'Projects' } },
    { name: 'all', type: 'text', label: '"All" Filter Tab', admin: { placeholder: 'All' } },
    { name: 'wip', type: 'text', label: '"Work in Progress" Filter Tab', admin: { placeholder: 'Work in Progress' } },
    { name: 'completed', type: 'text', label: '"Completed" Filter Tab', admin: { placeholder: 'Completed' } },
    { name: 'viewProduct', type: 'text', label: '"View Product" Button Text', admin: { placeholder: 'View Product' } },
    { name: 'goToRepo', type: 'text', label: '"Go to Repo" Button Text', admin: { placeholder: 'Go to Repo' } },
    { name: 'liveSite', type: 'text', label: '"Live Site" Button Text', admin: { placeholder: 'Live Site' } },
    { name: 'loading', type: 'text', label: 'Loading Message', admin: { placeholder: 'Loading projects...' } },
    {
      name: 'noProjects',
      type: 'text',
      label: 'Empty State (All)',
      admin: { description: 'Shown when no projects are returned from GitHub.', placeholder: 'No projects found.' },
    },
    {
      name: 'noCompleted',
      type: 'text',
      label: 'Empty State (Completed)',
      admin: { description: 'Shown when there are no completed projects.', placeholder: 'No completed projects yet.' },
    },
    {
      name: 'noWip',
      type: 'text',
      label: 'Empty State (WIP)',
      admin: {
        description: 'Shown when there are no work-in-progress projects.',
        placeholder: 'No projects in progress.',
      },
    },
    {
      name: 'error',
      type: 'text',
      label: 'Error Message',
      admin: { description: 'Shown when GitHub repos fail to load.', placeholder: 'Failed to load projects.' },
    },
  ],
};

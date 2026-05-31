import type { GlobalConfig } from 'payload';

export const AboutMeContent: GlobalConfig = {
  slug: 'about-me-content',
  label: 'About Me',
  admin: {
    group: 'Site Content',
    description: 'Content for the About Me page: your profile, interactive terminal widget, and bio.',
    components: {
      elements: {
        SaveButton: '@/app/(payload)/cms/components/SaveButton#SaveButton',
      },
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Profile',
          description: 'Basic identity information shown at the top of the About Me page.',
          fields: [
            { name: 'name', type: 'text', required: true, label: 'Display Name' },
            {
              name: 'subtitle',
              type: 'text',
              label: 'Subtitle',
              admin: { placeholder: 'Front-end Engineer & UX/UI Designer' },
            },
            { name: 'profession', type: 'text', required: true, label: 'Profession / Role' },
            {
              name: 'tagline',
              type: 'text',
              required: true,
              label: 'Tagline',
              admin: { description: 'Short punchy line shown under your role.' },
            },
            {
              name: 'viewPortfolio',
              type: 'text',
              label: '"View Portfolio" Button Text',
              admin: { placeholder: 'View Portfolio' },
            },
          ],
        },
        {
          label: 'Terminal Widget',
          description: 'The interactive fake-terminal shown on the About Me page.',
          fields: [
            { name: 'terminalTab', type: 'text', label: 'Tab Label', admin: { placeholder: 'about-me' } },
            {
              name: 'terminalPrefix',
              type: 'text',
              label: 'Prompt Prefix',
              admin: { placeholder: 'visitor@portfolio:~$' },
            },
            { name: 'terminalCommand1', type: 'text', label: 'First Command', admin: { placeholder: 'whoami' } },
            { name: 'terminalCommand2', type: 'text', label: 'Second Command', admin: { placeholder: 'cat about.md' } },
            {
              name: 'blurb',
              type: 'array',
              label: 'Terminal Entries',
              admin: { description: 'Each entry is a command + output pair typed out in the terminal animation.' },
              fields: [
                {
                  name: 'command',
                  type: 'text',
                  required: true,
                  label: 'Command',
                  admin: { placeholder: 'cat skills.txt' },
                },
                {
                  name: 'output',
                  type: 'textarea',
                  required: true,
                  label: 'Output',
                  admin: { placeholder: 'React, TypeScript, Node.js...' },
                },
              ],
            },
          ],
        },
        {
          label: 'Bio',
          description: 'Longer-form bio text.',
          fields: [
            {
              name: 'short_blurb',
              type: 'textarea',
              label: 'Short Bio',
              admin: { description: 'A concise summary shown in compact contexts, e.g. the home page.' },
            },
          ],
        },
      ],
    },
  ],
};

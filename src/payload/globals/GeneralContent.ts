import type { GlobalConfig } from 'payload';

const ICON_HINT = 'react-icons name, e.g. FaReact, TbBrandTypescript. Browse at react-icons.github.io/react-icons';

export const GeneralContent: GlobalConfig = {
  slug: 'general-content',
  label: 'General',
  admin: {
    description: 'Site-wide content: your name, navigation links, header taglines, and footer.',
    components: {
      elements: {
        SaveButton: '@/app/(payload)/cms/components/SaveButton#SaveButton',
      },
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Your Name',
      admin: { description: 'Your full name as displayed on the site.' },
    },
    {
      name: 'helloWorld',
      type: 'text',
      required: true,
      label: 'Greeting Text',
      admin: { description: 'Intro line on the home page, e.g. "Hello World! 👋 My name is"' },
    },
    {
      name: 'learnMore',
      type: 'text',
      required: true,
      label: '"Learn More" Button Text',
    },
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      admin: { description: 'Links shown in the site header navigation.' },
      fields: [
        { name: 'href', type: 'text', required: true, label: 'URL Path', admin: { placeholder: '/about-me' } },
        { name: 'label', type: 'text', required: true, label: 'Display Text', admin: { placeholder: 'About Me' } },
      ],
    },
    {
      name: 'header',
      type: 'group',
      label: 'Home Page Header',
      fields: [
        {
          name: 'experience',
          type: 'text',
          label: 'Years of Experience Text',
          admin: {
            description:
              'Shown under your name. Use {numberOfYears} to auto-calculate years of experience. Supports basic Markdown.',
            placeholder: '{numberOfYears}+ years of experience',
          },
        },
        {
          name: 'web',
          type: 'group',
          label: 'Web Development Pill',
          fields: [
            { name: 'text', type: 'text', label: 'Label Text', admin: { placeholder: 'Web Development' } },
            {
              name: 'icons',
              type: 'array',
              label: 'Tech Icons',
              admin: { description: ICON_HINT },
              fields: [{ name: 'icon', type: 'text', label: 'Icon Name', admin: { placeholder: 'FaReact' } }],
            },
          ],
        },
        {
          name: 'design',
          type: 'group',
          label: 'UX/UI Design Pill',
          fields: [
            { name: 'text', type: 'text', label: 'Label Text', admin: { placeholder: 'UX/UI Design' } },
            {
              name: 'icons',
              type: 'array',
              label: 'Design Icons',
              admin: { description: ICON_HINT },
              fields: [{ name: 'icon', type: 'text', label: 'Icon Name', admin: { placeholder: 'FaFigma' } }],
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      label: 'Footer',
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Copyright Text',
          admin: {
            description: 'Use {year} for current year and {name} for your name.',
            placeholder: '© {year} {name}',
          },
        },
        {
          name: 'urls',
          type: 'array',
          label: 'Social / Contact Links',
          admin: { description: 'Icons shown in the footer.' },
          fields: [
            {
              name: 'href',
              type: 'text',
              required: true,
              label: 'URL',
              admin: { placeholder: 'https://github.com/you' },
            },
            {
              name: 'icon',
              type: 'text',
              label: 'Icon Name',
              admin: { description: ICON_HINT, placeholder: 'PiGithubLogoBold' },
            },
            { name: 'alt', type: 'text', label: 'Accessible Label', admin: { placeholder: 'GitHub' } },
          ],
        },
      ],
    },
  ],
};

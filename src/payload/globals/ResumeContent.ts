import type { GlobalConfig } from 'payload';

export const ResumeContent: GlobalConfig = {
  slug: 'resume-content',
  label: 'Resume',
  admin: {
    group: 'Site Content',
    description: 'All content for the Resume page: employment history, education, certifications, and UI labels.',
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
          label: 'Employment History',
          description: 'Your work experience, organised by company.',
          fields: [
            {
              name: 'employmentHistory',
              type: 'group',
              label: ' ',
              fields: [
                {
                  name: 'companies',
                  type: 'array',
                  label: 'Companies',
                  fields: [
                    { name: 'company', type: 'text', required: true, label: 'Company Name' },
                    {
                      name: 'roles',
                      type: 'array',
                      label: 'Roles',
                      fields: [
                        { name: 'title', type: 'text', required: true, label: 'Job Title' },
                        { name: 'team', type: 'text', label: 'Team / Department' },
                        { name: 'start_date', type: 'text', label: 'Start Date', admin: { placeholder: 'Jan 2022' } },
                        { name: 'end_date', type: 'text', label: 'End Date', admin: { placeholder: 'Present' } },
                        {
                          name: 'description',
                          type: 'textarea',
                          label: 'Description',
                          admin: { description: 'Supports Markdown. Describe responsibilities and achievements.' },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Education',
          description: 'Degrees, diplomas, and courses.',
          fields: [
            {
              name: 'education',
              type: 'array',
              label: 'Education Entries',
              fields: [
                { name: 'name', type: 'text', required: true, label: 'Institution Name' },
                { name: 'qualification', type: 'text', label: 'Qualification / Degree' },
                { name: 'start_date', type: 'text', label: 'Start Date', admin: { placeholder: '2019' } },
                { name: 'end_date', type: 'text', label: 'End Date', admin: { placeholder: '2022' } },
                { name: 'description', type: 'textarea', label: 'Description' },
              ],
            },
          ],
        },
        {
          label: 'Certifications',
          description: 'Professional certifications and badges.',
          fields: [
            {
              name: 'certifications',
              type: 'group',
              label: ' ',
              fields: [
                {
                  name: 'viewCert',
                  type: 'text',
                  label: '"View Certificate" Button Text',
                  admin: { placeholder: 'View Certificate' },
                },
                {
                  name: 'certs',
                  type: 'array',
                  label: 'Certifications',
                  fields: [
                    { name: 'name', type: 'text', required: true, label: 'Certification Name' },
                    { name: 'certifier', type: 'text', label: 'Issuing Organisation' },
                    { name: 'date', type: 'text', label: 'Date Issued', admin: { placeholder: 'March 2024' } },
                    { name: 'url', type: 'text', label: 'Certificate URL', admin: { placeholder: 'https://...' } },
                    { name: 'description', type: 'textarea', label: 'Description' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Labels & UI Text',
          description: 'Strings used in the Resume page UI.',
          fields: [
            {
              name: 'resumeError',
              type: 'text',
              label: 'Error Message',
              admin: { description: 'Shown when resume data fails to load.' },
            },
            {
              name: 'tabs',
              type: 'group',
              label: 'Tab Labels',
              fields: [
                {
                  name: 'employmentHistory',
                  type: 'text',
                  label: 'Employment History Tab',
                  admin: { placeholder: 'Employment History' },
                },
                { name: 'education', type: 'text', label: 'Education Tab', admin: { placeholder: 'Education' } },
                {
                  name: 'certifications',
                  type: 'text',
                  label: 'Certifications Tab',
                  admin: { placeholder: 'Certifications' },
                },
              ],
            },
            {
              name: 'downloadResume',
              type: 'group',
              label: 'Download Resume Button',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  label: 'Button Text',
                  admin: { placeholder: 'Download Resume' },
                },
                {
                  name: 'icon',
                  type: 'text',
                  label: 'Icon Name',
                  admin: { description: 'react-icons name, e.g. MdDownload', placeholder: 'MdDownload' },
                },
                { name: 'url', type: 'text', required: true, label: 'PDF URL', admin: { placeholder: 'https://...' } },
              ],
            },
          ],
        },
      ],
    },
  ],
};

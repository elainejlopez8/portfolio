import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { Users } from './src/payload/collections/Users';
import { AboutMeContent } from './src/payload/globals/AboutMeContent';
import { GeneralContent } from './src/payload/globals/GeneralContent';
import { ProjectLabels } from './src/payload/globals/ProjectLabels';
import { ResumeContent } from './src/payload/globals/ResumeContent';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  routes: {
    admin: '/cms',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Portfolio CMS',
      title: 'Portfolio CMS',
      description: 'Manage the content of your portfolio site.',
    },
    globals: [
      {
        slug: 'general-content',
        group: 'Site Content',
      },
      {
        slug: 'about-me-content',
        group: 'Site Content',
      },
      {
        slug: 'resume-content',
        group: 'Site Content',
      },
      {
        slug: 'project-labels',
        group: 'Site Content',
      },
    ],
  },
  collections: [Users],
  globals: [GeneralContent, AboutMeContent, ResumeContent, ProjectLabels],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET ?? 'change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload/generated-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.TURSO_DATABASE_URL ?? 'file:./dev.db',
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  }),
  sharp,
});

import config from '@payload-config';
import { NotFoundPage } from '@payloadcms/next/views';
import { importMap } from './importMap.js';

export default function NotFound() {
  const params = Promise.resolve({ segments: [] });
  const searchParams = Promise.resolve({});
  return <NotFoundPage config={config} importMap={importMap} params={params} searchParams={searchParams} />;
}

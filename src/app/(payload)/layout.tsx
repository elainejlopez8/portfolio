import config from '@payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import type { ServerFunctionClient } from 'payload';
import { ReactNode } from 'react';
import './cms/custom.css';
import { importMap } from './cms/importMap.js';
import SetAdminLogo from './cms/SetAdminLogo';

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({ ...args, config, importMap });
};

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <SetAdminLogo />
      {children}
    </RootLayout>
  );
}

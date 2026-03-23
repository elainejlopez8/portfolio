/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_USERNAME?: string;
  readonly VITE_GITHUB_USE_AUTH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

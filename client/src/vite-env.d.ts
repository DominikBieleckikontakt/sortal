/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BETTER_AUTH_URL: string;
  readonly VITE_BETTER_AUTH_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

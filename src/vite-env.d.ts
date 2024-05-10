/// <reference types="vite/client" />

// en: Extending the import.meta.env object with a new environment variable
interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global variable exposed by the "define" configuration
declare const __APP_VERSION__: string;

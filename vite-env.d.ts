/// <reference types="vite/client" />
import { Network } from "@aptos-labs/ts-sdk";

interface ImportMetaEnv {
  readonly VITE_APP_NETWORK: Network;
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

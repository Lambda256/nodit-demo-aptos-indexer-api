import { Network } from "@aptos-labs/ts-sdk";

export const APT_DECIMALS = 8;
export const NETWORK = (import.meta.env.VITE_APP_NETWORK as Network) ?? Network.TESTNET;
export const API_KEY = import.meta.env.VITE_API_KEY;

import type { WalletModuleFactory, BrowserWallet } from "@near-wallet-selector/core";
export interface ArepaWalletParams {
    walletUrl?: string;
    iconUrl?: string;
    deprecated?: boolean;
    successUrl?: string;
    failureUrl?: string;
}
export declare function setupArepaWallet({ walletUrl, iconUrl, deprecated, successUrl, failureUrl, }?: ArepaWalletParams): WalletModuleFactory<BrowserWallet>;

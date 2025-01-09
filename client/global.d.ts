export {};

declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request?: (args: { method: string; params?: Array<any> }) => Promise<any>;
    };
  }
}

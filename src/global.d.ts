export {};

declare global {
  interface Window {
    electron?: {
      sendResize: (channel: string, msg: SendResize) => void;
    };
  }
  interface SendResize {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

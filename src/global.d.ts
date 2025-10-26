export {};

declare global {
  interface Window {
    electron?: {
      sendResize: (channel: string, msg: SendResize) => void;
      windowMinimize: () => void;
      windowMaximize: () => void;
      windowClose: () => void;
      bcGoForward?: () => void;
      bcGoBackward?: () => void;
      bcGoReload?: () => void;
    };
  }

  interface SendResize {
    x: number;
    y: number;
    width: number;
    height: number;
  }
}

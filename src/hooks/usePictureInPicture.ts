import { useState, useCallback } from 'react';

interface DocumentPictureInPicture {
  requestWindow(options?: { width?: number; height?: number }): Promise<Window>;
}

declare global {
  interface Window {
    documentPictureInPicture?: DocumentPictureInPicture;
  }
}

interface UsePipOptions {
  width?: number;
  height?: number;
}

export function usePictureInPicture({ width = 430, height = 680 }: UsePipOptions = {}) {
  const [pipWindow, setPipWindow] = useState<Window | null>(null);
  const isPipOpen = pipWindow !== null;

  const openPip = useCallback(async () => {
    if (!window.documentPictureInPicture) {
      console.warn('Document Picture-in-Picture API is not supported in this browser.');
      return;
    }
    if (pipWindow) return;

    try {
      const pip = await window.documentPictureInPicture.requestWindow({ width, height });

      // Copy all stylesheets from the main document into the PiP window
      [...document.styleSheets].forEach((sheet) => {
        try {
          const cssText = [...sheet.cssRules].map((r) => r.cssText).join('\n');
          const style = pip.document.createElement('style');
          style.textContent = cssText;
          pip.document.head.appendChild(style);
        } catch {
          if (sheet.href) {
            const link = pip.document.createElement('link');
            link.rel = 'stylesheet';
            link.href = sheet.href;
            pip.document.head.appendChild(link);
          }
        }
      });

      pip.document.documentElement.classList.add('dark');
      pip.document.body.style.margin = '0';
      pip.document.body.style.height = '100vh';
      pip.document.body.style.overflow = 'hidden';

      pip.addEventListener('pagehide', () => setPipWindow(null));

      setPipWindow(pip);
    } catch (err) {
      console.error('Failed to open PiP window:', err);
    }
  }, [width, height, pipWindow]);

  const closePip = useCallback(() => {
    pipWindow?.close();
    setPipWindow(null);
  }, [pipWindow]);

  return { pipWindow, isPipOpen, openPip, closePip };
}

'use client';

import { useEffect } from 'react';
import Script from 'next/script';

// Converts all text nodes on the page from Simplified Chinese to Traditional Chinese
export default function Traditionalizer() {
  useEffect(() => {
    let observer: MutationObserver | null = null;
    let cancelled = false;

    const init = () => {
      const w = window as any;
      if (!w.OpenCC || !w.OpenCC.Converter) {
        if (!cancelled) setTimeout(init, 200);
        return;
      }
      const convert = w.OpenCC.Converter({ from: 'cn', to: 'tw' });

      const convertNode = (node: Node) => {
        try {
          const walker = document.createTreeWalker(node as Node, NodeFilter.SHOW_TEXT, null);
          const toConvert: Text[] = [];
          let current: Node | null = walker.nextNode();
          while (current) {
            const parent = (current as Text).parentElement;
            if (parent && ['SCRIPT','STYLE','CODE','PRE','TEXTAREA','INPUT'].includes(parent.tagName)) {
              // skip code and inputs
            } else {
              toConvert.push(current as Text);
            }
            current = walker.nextNode();
          }
          toConvert.forEach(t => { t.nodeValue = convert(t.nodeValue || ''); });
        } catch {}
      };

      // Initial pass
      convertNode(document.body);

      // Observe future DOM changes
      observer = new MutationObserver((mutations) => {
        mutations.forEach(m => {
          m.addedNodes && m.addedNodes.forEach(n => convertNode(n));
        });
      });
      observer.observe(document.body, { childList: true, subtree: true });
    };

    init();
    return () => { cancelled = true; if (observer) observer.disconnect(); };
  }, []);

  return (
    <Script src="https://cdn.jsdelivr.net/npm/opencc-js@1.0.5/dist/umd/full.js" strategy="afterInteractive" />
  );
}

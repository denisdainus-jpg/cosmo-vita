import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    function observeNew() {
      document.querySelectorAll<Element>('.reveal:not(.is-visible)').forEach((el) => {
        io.observe(el);
      });
    }

    observeNew();

    // Watch for dynamically added .reveal elements (e.g. async-loaded review cards)
    const mo = new MutationObserver(observeNew);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}

import { useEffect, useState } from 'react';
import { Phone, CalendarHeart } from 'lucide-react';
import { CLINIC } from '../data/clinic';

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      setHidden(scrolled > total - 120);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-out ${
        visible && !hidden ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-ink-100" />

      <div className="relative flex items-center gap-3 px-4 py-3 safe-bottom">
        {/* Phone button */}
        <a
          href={`tel:${CLINIC.phones[0].replace(/[^+\d]/g, '')}`}
          className="btn-icon w-14 h-14 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 shrink-0"
          aria-label="Позвонить"
        >
          <Phone className="w-6 h-6" />
        </a>

        {/* Book button */}
        <a
          href={CLINIC.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2.5 h-14 rounded-full bg-gradient-to-r from-rosegold-500 to-rosegold-600 text-white font-semibold text-sm shadow-lg shadow-rosegold-500/25 hover:shadow-rosegold-500/40 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 select-none touch-manipulation"
        >
          <CalendarHeart className="w-5 h-5 shrink-0" />
          <span>Записаться онлайн</span>
        </a>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Plus, CalendarHeart } from 'lucide-react';
import { CLINIC } from '../data/clinic';

const NAV_LINKS = [
  { id: 'about', label: 'О клинике' },
  { id: 'services', label: 'Услуги' },
  { id: 'doctors', label: 'Врачи' },
  { id: 'promotions', label: 'Акции' },
  { id: 'advantages', label: 'Преимущества' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'contacts', label: 'Контакты' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isServicePage = location.pathname.startsWith('/services/');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navHref = (id: string) => (isServicePage ? `/#${id}` : `#${id}`);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-[0_2px_24px_rgba(0,0,0,0.06)]' : 'bg-transparent'
      }`}
    >
      <div className="container-main">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-2xl overflow-hidden shadow-lg shadow-rosegold-500/20 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-rosegold-500/40">
              <img
                src="https://cosmo-vita.ru/images/logo_new.jpg"
                alt="КосмоВита"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-rosegold-400 to-rosegold-600 items-center justify-center hidden absolute inset-0">
                <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-xl font-semibold text-ink-900 group-hover:text-rosegold-700 transition-colors duration-200">КосмоВита</div>
              <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">Медицинский центр</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={navHref(link.id)}
                className="text-sm font-medium text-ink-700 transition-colors duration-200 hover:text-rosegold-600 relative after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-rosegold-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-5">
            <div className="flex flex-col items-end leading-tight">
              <a href={`tel:${CLINIC.phones[0].replace(/[^+\d]/g, '')}`} className="text-sm font-semibold text-ink-900 hover:text-rosegold-600 transition-colors">
                {CLINIC.phones[0]}
              </a>
              <a href={`tel:${CLINIC.phones[1].replace(/[^+\d]/g, '')}`} className="text-sm font-semibold text-ink-900 hover:text-rosegold-600 transition-colors">
                {CLINIC.phones[1]}
              </a>
            </div>
            <a
              href={CLINIC.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <CalendarHeart className="w-4 h-4" />
              Записаться онлайн
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 text-ink-800"
            aria-label="Открыть меню"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-400 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between h-20 px-6 border-b border-ink-100">
            <span className="font-serif text-lg font-semibold">Меню</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-ink-800" aria-label="Закрыть меню">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={navHref(link.id)}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3.5 text-base font-medium text-ink-700 hover:bg-rosegold-50 hover:text-rosegold-600 transition-colors border-b border-ink-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-6 py-4 space-y-3">
            <a href={`tel:${CLINIC.phones[0].replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 text-ink-800 font-semibold">
              <Phone className="w-4 h-4 text-rosegold-500" />
              {CLINIC.phones[0]}
            </a>
            <a href={`tel:${CLINIC.phones[1].replace(/[^+\d]/g, '')}`} className="flex items-center gap-3 text-ink-800 font-semibold">
              <Phone className="w-4 h-4 text-rosegold-500" />
              {CLINIC.phones[1]}
            </a>
            <a
              href={CLINIC.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full mt-2"
            >
              <CalendarHeart className="w-4 h-4" />
              Записаться онлайн
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

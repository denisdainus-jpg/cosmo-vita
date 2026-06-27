import { Plus, Phone, MapPin, Clock, CalendarHeart } from 'lucide-react';
import { CLINIC } from '../data/clinic';

const NAV_GROUPS = [
  {
    title: 'Клиника',
    links: [
      { label: 'О клинике', href: '#about' },
      { label: 'Услуги', href: '#services' },
      { label: 'Врачи', href: '#doctors' },
      { label: 'Преимущества', href: '#advantages' },
    ],
  },
  {
    title: 'Пациентам',
    links: [
      { label: 'Акции', href: '#promotions' },
      { label: 'Отзывы', href: '#reviews' },
      { label: 'Контакты', href: '#contacts' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-ink-300 relative overflow-hidden pb-safe">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-rosegold-500/5 rounded-full blur-[120px]" />

      <div className="container-main relative z-10 pt-12 pb-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Logo & description — full width on xs */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-rosegold-400 to-rosegold-600 flex items-center justify-center shadow-lg shadow-rosegold-500/20 shrink-0">
                <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <div className="font-serif text-lg sm:text-xl font-semibold text-white">КосмоВита</div>
                <div className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.18em] text-ink-500">Медицинский центр</div>
              </div>
            </div>
            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ink-400 max-w-sm">
              Современная клиника в центре Москвы. Заботимся о здоровье и красоте
              наших пациентов ежедневно с 10:00 до 21:00.
            </p>
            <a
              href={CLINIC.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-primary mt-6"
            >
              <CalendarHeart className="w-4 h-4" />
              Записаться онлайн
            </a>
          </div>

          {/* Nav groups */}
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="col-span-1 lg:col-span-2">
              <h4 className="font-serif text-sm sm:text-base font-semibold text-white">{group.title}</h4>
              <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-ink-400 hover:text-rosegold-300 transition-colors active:text-rosegold-200 touch-manipulation"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact info — full width on xs */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-4">
            <h4 className="font-serif text-sm sm:text-base font-semibold text-white">Контакты</h4>
            <ul className="mt-3 sm:mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-rosegold-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-ink-400">{CLINIC.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-rosegold-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-ink-400">{CLINIC.hours}</span>
              </li>
              {CLINIC.phones.map((phone) => (
                <li key={phone} className="flex items-center gap-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-rosegold-400 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-rosegold-300 transition-colors active:text-rosegold-200 touch-manipulation"
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[10px] sm:text-xs text-ink-500 text-center sm:text-left">
            © {new Date().getFullYear()} {CLINIC.name}. Все права защищены.
          </p>
          <p className="text-[10px] sm:text-xs text-ink-500 text-center">
            {CLINIC.metro}
          </p>
        </div>
      </div>
    </footer>
  );
}

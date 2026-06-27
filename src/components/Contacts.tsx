import { MapPin, Phone, Clock, Train, CalendarHeart, Navigation } from 'lucide-react';
import { CLINIC } from '../data/clinic';

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: 'Адрес',
    value: CLINIC.address,
    href: CLINIC.mapsUrl,
  },
  {
    icon: Train,
    label: 'Метро',
    value: CLINIC.metro,
  },
  {
    icon: Phone,
    label: 'Телефоны',
    value: CLINIC.phones.join(', '),
    phones: CLINIC.phones,
  },
  {
    icon: Clock,
    label: 'Режим работы',
    value: CLINIC.hours,
  },
];

export default function Contacts() {
  return (
    <section id="contacts" className="section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Info card */}
          <div className="lg:col-span-5 reveal">
            <span className="eyebrow">Контакты</span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 text-balance leading-tight">
              Как нас найти
            </h2>
            <p className="mt-5 text-lg text-ink-600 leading-relaxed">
              Мы находимся в самом центре Москвы. Запишитесь онлайн или позвоните —
              администратор поможет выбрать удобное время.
            </p>

            <div className="mt-6 sm:mt-8 space-y-3">
              {CONTACT_ITEMS.map((item) => (
                <div key={item.label} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-ink-100 hover:border-rosegold-200 hover:shadow-lg transition-all duration-300">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-rosegold-50 to-rosegold-100 flex items-center justify-center">
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-rosegold-600" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-ink-400">
                      {item.label}
                    </div>
                    {item.phones ? (
                      <div className="mt-0.5 sm:mt-1 space-y-0.5 sm:space-y-1">
                        {item.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                            className="block text-sm sm:text-base font-semibold text-ink-900 hover:text-rosegold-600 transition-colors active:text-rosegold-700 touch-manipulation"
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    ) : item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-0.5 sm:mt-1 text-sm sm:text-base font-medium text-ink-900 hover:text-rosegold-600 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-medium text-ink-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={CLINIC.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex btn-primary flex-1 justify-center"
              >
                <CalendarHeart className="w-4 h-4" />
                Записаться онлайн
              </a>
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex-1 justify-center"
              >
                <Navigation className="w-4 h-4" />
                Построить маршрут
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-7 reveal reveal-delay-2">
            <div className="relative h-full min-h-[260px] sm:min-h-[380px] lg:min-h-[400px] rounded-[2rem] overflow-hidden shadow-2xl shadow-ink-900/10 border border-ink-100">
              <iframe
                src={CLINIC.mapsEmbed}
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                title="Карта — Медицинский центр КосмоВита"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white shadow-lg text-sm font-semibold text-ink-900 hover:text-rosegold-600 transition-colors"
              >
                <Navigation className="w-4 h-4 text-rosegold-500" />
                Открыть в Яндекс.Картах
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CalendarHeart, CheckCircle, Phone, Tag } from 'lucide-react';
import { serviceDetails } from '../data/serviceDetails';
import { doctors } from '../data/doctors';
import { CLINIC } from '../data/clinic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceDetails.find((s) => s.id === serviceId);

  if (!service) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-2xl font-semibold text-ink-900">Страница не найдена</h1>
            <Link to="/" className="mt-4 inline-block text-rosegold-600 hover:underline">
              Вернуться на главную
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const serviceDoctors = doctors.filter((d) => service.doctorIds.includes(d.id));
  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-24 overflow-hidden bg-gradient-to-br from-rosegold-50 via-white to-emerald-50/30">
          <div className="container-main">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-rosegold-600 transition-colors pt-8 pb-6 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Все направления
            </Link>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pb-12 sm:pb-16 items-center">
              {/* Left: text */}
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rosegold-400 to-rosegold-600 flex items-center justify-center shadow-lg shadow-rosegold-500/25 shrink-0">
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                  <span className="eyebrow">Направление</span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 leading-tight">
                  {service.title}
                </h1>
                <p className="mt-4 text-lg font-medium text-rosegold-600 leading-snug">
                  {service.subtitle}
                </p>

                <div className="mt-6 space-y-3">
                  {service.intro.split('\n\n').map((para, i) => (
                    <p key={i} className="text-ink-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={CLINIC.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <CalendarHeart className="w-4 h-4" />
                    Записаться онлайн
                  </a>
                  <a
                    href={`tel:${CLINIC.phones[0].replace(/[^+\d]/g, '')}`}
                    className="btn-secondary"
                  >
                    <Phone className="w-4 h-4" />
                    {CLINIC.phones[0]}
                  </a>
                </div>
              </div>

              {/* Right: image */}
              <div className="relative">
                <div className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-rosegold-500/15">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/20 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-rosegold-100 rounded-3xl -z-10" />
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-emerald-100 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Service cards */}
        {service.serviceCards && service.serviceCards.length > 0 && (
          <section className="py-16 bg-rosegold-50/40">
            <div className="container-main">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-900 mb-10">
                Услуги {service.title === 'УЗИ-диагностика' ? 'УЗИ' : service.title.split(' ')[0].toLowerCase() === 'гинекология' ? 'гинекологии' : service.title.toLowerCase()}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {service.serviceCards.map((card, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-6 border border-ink-100 hover:border-rosegold-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-rosegold-50 flex items-center justify-center mb-4">
                      <CheckCircle className="w-5 h-5 text-rosegold-500" />
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-ink-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-ink-500 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sections + sidebar */}
        {service.sections.length > 0 && (
          <section className="py-16">
            <div className="container-main">
              <div className="grid lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-2 space-y-8">
                  {service.sections.map((section, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-3xl border border-ink-100 p-8 hover:border-rosegold-200 transition-colors"
                    >
                      {section.heading && (
                        <h2 className="font-serif text-2xl font-semibold text-ink-900 mb-5">
                          {section.heading}
                        </h2>
                      )}
                      <div className="space-y-3">
                        {section.paragraphs.map((p, j) => (
                          <p key={j} className="text-ink-600 leading-relaxed">
                            {p}
                          </p>
                        ))}
                      </div>
                      {section.items && (
                        <ul className="mt-5 space-y-3">
                          {section.items.map((item, k) => (
                            <li key={k} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                              <span className="text-ink-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-28">
                  <div className="bg-gradient-to-br from-rosegold-50 to-rosegold-100 rounded-3xl p-7 border border-rosegold-200">
                    <h3 className="font-serif text-xl font-semibold text-ink-900 mb-2">
                      Записаться на приём
                    </h3>
                    <p className="text-sm text-ink-600 mb-5">
                      Ежедневно с 10:00 до 21:00
                    </p>
                    <a
                      href={CLINIC.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full justify-center"
                    >
                      <CalendarHeart className="w-4 h-4" />
                      Записаться онлайн
                    </a>
                    <div className="mt-4 space-y-2 pt-4 border-t border-rosegold-200">
                      {CLINIC.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                          className="flex items-center gap-2 text-sm font-semibold text-ink-700 hover:text-rosegold-600 transition-colors"
                        >
                          <Phone className="w-4 h-4 text-rosegold-500" />
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>

                  {serviceDoctors.length > 0 && (
                    <div className="bg-white rounded-3xl border border-ink-100 p-6">
                      <h3 className="font-serif text-lg font-semibold text-ink-900 mb-5">
                        Специалисты
                      </h3>
                      <div className="space-y-4">
                        {serviceDoctors.map((doc) => (
                          <div key={doc.id} className="flex items-center gap-3">
                            <img
                              src={doc.photo}
                              alt={doc.name}
                              className="w-12 h-12 rounded-full object-cover object-top bg-rosegold-50 border border-ink-100"
                            />
                            <div>
                              <div className="text-sm font-semibold text-ink-900 leading-snug">
                                {doc.name}
                              </div>
                              <div className="text-xs text-emerald-600 mt-0.5">{doc.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Prices */}
        {service.priceGroups && service.priceGroups.length > 0 && (
          <section className="py-16 bg-ink-50/40">
            <div className="container-main">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-emerald-600" />
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-ink-900">
                  Стоимость услуг
                </h2>
              </div>

              <div className="space-y-8">
                {service.priceGroups.map((group, gi) => (
                  <div key={gi} className="bg-white rounded-3xl border border-ink-100 overflow-hidden">
                    {group.heading && (
                      <div className="px-6 py-4 bg-rosegold-50 border-b border-rosegold-100">
                        <h3 className="font-serif text-lg font-semibold text-rosegold-700">
                          {group.heading}
                        </h3>
                      </div>
                    )}
                    <div className="divide-y divide-ink-50">
                      {group.items.map((item, ii) => (
                        <div
                          key={ii}
                          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 px-4 sm:px-6 py-4 hover:bg-ink-50/50 transition-colors"
                        >
                          <span className="text-sm text-ink-700 leading-relaxed">{item.name}</span>
                          <span className="text-sm font-semibold text-rosegold-600 whitespace-nowrap shrink-0">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-16">
          <div className="container-main">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 sm:p-10 text-white text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-20 -translate-y-20 pointer-events-none" />
              <div className="relative">
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold">Запишитесь на приём к специалисту</h2>
                <p className="mt-3 text-white/80 text-lg">в удобное для вас время</p>
                <a
                  href={CLINIC.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 bg-white text-emerald-700 font-semibold px-8 py-4 rounded-2xl hover:bg-rosegold-50 transition-colors shadow-lg"
                >
                  <CalendarHeart className="w-5 h-5" />
                  Записаться онлайн
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

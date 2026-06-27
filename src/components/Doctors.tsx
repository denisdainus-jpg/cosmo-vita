import { CalendarHeart, GraduationCap } from 'lucide-react';
import { doctors } from '../data/doctors';
import { CLINIC } from '../data/clinic';

export default function Doctors() {
  return (
    <section id="doctors" className="section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="max-w-3xl reveal">
          <span className="eyebrow">Наша команда</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 text-balance leading-tight">
            Опытные врачи, которым доверяют
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-ink-600 leading-relaxed">
            Специалисты центра — врачи высшей квалификации, которые сопровождают
            пациентов на всех этапах лечения и заботятся о результате.
          </p>
        </div>

        {/* Desktop grid */}
        <div className="mt-10 sm:mt-14 hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor, i) => (
            <article
              key={doctor.id}
              className={`reveal reveal-delay-${(i % 3) + 1} group bg-white rounded-3xl overflow-hidden border border-ink-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1`}
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-emerald-50 via-rosegold-50 to-rosegold-100 overflow-hidden">
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                {doctor.role === 'Главный врач' && (
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-md">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Главный врач
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-ink-900 leading-snug">{doctor.name}</h3>
                <p className="mt-1 text-sm font-medium text-emerald-600">{doctor.role}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {doctor.tags.map((tag) => (
                    <span key={tag} className="inline-block px-3 py-1 rounded-full bg-ink-50 text-xs font-medium text-ink-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={CLINIC.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-rosegold-600 hover:text-rosegold-700 transition-colors"
                >
                  <CalendarHeart className="w-4 h-4" />
                  Записаться на приём
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile horizontal scroll */}
        <div className="mt-8 sm:hidden -mx-5 px-5">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory">
            {doctors.map((doctor) => (
              <article
                key={doctor.id}
                className="snap-start shrink-0 w-[72vw] max-w-[280px] bg-white rounded-3xl overflow-hidden border border-ink-100 shadow-lg"
              >
                <div className="relative aspect-[3/4] bg-gradient-to-br from-emerald-50 via-rosegold-50 to-rosegold-100 overflow-hidden">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  {doctor.role === 'Главный врач' && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-semibold">
                      <GraduationCap className="w-3 h-3" />
                      Главный врач
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-base font-semibold text-ink-900 leading-snug">{doctor.name}</h3>
                  <p className="mt-0.5 text-xs font-medium text-emerald-600">{doctor.role}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {doctor.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="inline-block px-2.5 py-1 rounded-full bg-ink-50 text-[10px] font-medium text-ink-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={CLINIC.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-rosegold-50 text-xs font-semibold text-rosegold-700 active:bg-rosegold-100 transition-colors touch-manipulation"
                  >
                    <CalendarHeart className="w-3.5 h-3.5" />
                    Записаться
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Tag, ArrowRight, Percent } from 'lucide-react';
import { promotions } from '../data/promotions';
import { CLINIC } from '../data/clinic';

export default function Promotions() {
  return (
    <section id="promotions" className="section-padding bg-ink-900 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rosegold-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[120px]" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl reveal">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-rosegold-300">
            <Tag className="w-4 h-4" />
            Акции
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white text-balance leading-tight">
            Специальные предложения для пациентов
          </h2>
          <p className="mt-5 text-lg text-ink-300 leading-relaxed">
            Выгодные условия для первого знакомства с нашими специалистами.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {promotions.map((promo, i) => (
            <div
              key={promo.id}
              className={`reveal reveal-delay-${i + 1} group relative p-5 sm:p-8 lg:p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-rosegold-400/40 transition-all duration-500 hover:bg-white/[0.07]`}
            >
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rosegold-500/15 border border-rosegold-400/30">
                    <Percent className="w-3.5 h-3.5 text-rosegold-300 shrink-0" />
                    <span className="text-xs font-semibold text-rosegold-200 uppercase tracking-wide">
                      Скидка
                    </span>
                  </div>
                  <h3 className="mt-4 sm:mt-5 font-serif text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-tight">
                    {promo.title}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base text-ink-300 leading-relaxed">
                    {promo.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-rosegold-400 to-rosegold-600 flex items-center justify-center shadow-xl shadow-rosegold-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                    <span className="font-serif text-xl sm:text-3xl font-bold text-white">{promo.discount}</span>
                  </div>
                </div>
              </div>

              <a
                href={CLINIC.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all active:opacity-70 touch-manipulation"
              >
                Воспользоваться предложением
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { CalendarHeart, ArrowDown, Star, ShieldCheck, Sparkles, MapPin } from 'lucide-react';
import { CLINIC } from '../data/clinic';

const STATS = [
  { value: '7', label: 'направлений' },
  { value: '6', label: 'врачей' },
  { value: '10:00–21:00', label: 'ежедневно' },
];

const BADGES = [
  { icon: ShieldCheck, text: 'Врачи высшей категории' },
  { icon: Sparkles, text: 'Современное оборудование' },
];

const PARTICLES = [
  { size: 'w-3 h-3', color: 'bg-rosegold-300/40', top: '15%', left: '8%', delay: '0s' },
  { size: 'w-2 h-2', color: 'bg-emerald-300/50', top: '25%', left: '92%', delay: '1.5s' },
  { size: 'w-4 h-4', color: 'bg-rosegold-200/30', top: '70%', left: '5%', delay: '3s' },
  { size: 'w-2 h-2', color: 'bg-emerald-400/40', top: '80%', left: '88%', delay: '2s' },
  { size: 'w-3 h-3', color: 'bg-rosegold-400/25', top: '45%', left: '95%', delay: '0.8s' },
  { size: 'w-2 h-2', color: 'bg-emerald-300/35', top: '60%', left: '2%', delay: '2.5s' },
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-24 sm:pt-28 pb-28 sm:pb-16 overflow-hidden bg-gradient-to-b from-rosegold-50 via-white to-white">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rosegold-200/30 rounded-full blur-[120px] -z-0 animate-float" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-200/30 rounded-full blur-[100px] -z-0" />
      <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-rosegold-100/20 rounded-full blur-[80px] -z-0 animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 bg-grid opacity-50 -z-0" />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className={`particle ${p.size} ${p.color} -z-0`}
          style={{ top: p.top, left: p.left, animationDelay: p.delay, animationDuration: `${5 + i}s` }}
        />
      ))}

      <div className="container-main relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="lg:col-span-7 text-left">
            <div className="eyebrow animate-fade-down">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Медицинский центр в Москве
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-ink-500 hover:text-rosegold-500 transition-colors ml-2"
              >
                <MapPin className="w-3 h-3" />
                <span>Цветной бульвар</span>
              </a>
            </div>

            <h1 className="mt-5 font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.05] text-ink-900 text-balance animate-fade-up">
              С заботой о Вас!
              <span className="block mt-2 sm:mt-3 text-xl sm:text-3xl lg:text-4xl xl:text-5xl text-rosegold-600 font-medium">
                Широкий спектр медицинских услуг
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 text-sm sm:text-lg text-ink-600 leading-relaxed max-w-xl animate-fade-up reveal-delay-1">
              КосмоВита — современная клиника в самом центре Москвы. Гинекология,
              эндокринология, косметология, УЗИ-диагностика и аппаратные методики
              под наблюдением опытных врачей.
            </p>

            <div className="mt-5 sm:mt-7 flex flex-wrap gap-2 sm:gap-3 animate-fade-up reveal-delay-2">
              {BADGES.map((badge) => (
                <div key={badge.text} className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white border border-ink-100 text-xs sm:text-sm font-medium text-ink-700 shadow-sm hover:border-rosegold-200 hover:shadow-md transition-all duration-300">
                  <badge.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                  {badge.text}
                </div>
              ))}
            </div>

            <div className="mt-7 sm:mt-10 hidden sm:flex flex-col sm:flex-row gap-4 animate-fade-up reveal-delay-3">
              <a
                href={CLINIC.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4 animate-glow"
              >
                <CalendarHeart className="w-5 h-5" />
                Записаться онлайн
              </a>
              <a href="#services" className="btn-secondary text-base px-8 py-4">
                Наши услуги
              </a>
            </div>

            {/* Mobile-only services link */}
            <div className="mt-6 flex sm:hidden animate-fade-up reveal-delay-3">
              <a href="#services" className="btn-secondary text-sm px-6 py-3">
                Смотреть услуги
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-8 max-w-lg animate-fade-up reveal-delay-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="border-l-2 border-emerald-300 pl-3 sm:pl-4 group cursor-default">
                  <div className="font-serif text-xl sm:text-3xl font-semibold text-ink-900 group-hover:text-rosegold-600 transition-colors duration-300">{stat.value}</div>
                  <div className="text-[10px] sm:text-sm text-ink-500 mt-0.5 sm:mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="lg:col-span-5 relative animate-scale-in reveal-delay-2">
            <div className="relative aspect-[3/2] sm:aspect-[4/3] lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-rosegold-500/20 group">
              <img
                src="https://cosmo-vita.ru/photogallery/doctors/furman.png"
                alt="Фурман Надежда Юрьевна — главный врач КосмоВита"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/30 via-transparent to-transparent" />
              {/* Shimmer on hover */}
              <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
            </div>

            {/* Floating rating card */}
            <div className="hidden sm:block absolute -bottom-6 -left-6 sm:-left-8 bg-white rounded-2xl shadow-xl p-5 max-w-[280px] hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-rosegold-400 text-rosegold-400" />
                ))}
              </div>
              <p className="text-sm text-ink-700 font-medium leading-snug">
                «Внимательные врачи, приятная атмосфера и быстрый приём без очередей.»
              </p>
              <p className="text-xs text-ink-400 mt-2">— отзывы пациентов</p>
            </div>

            {/* Floating hours card */}
            <div className="hidden sm:block absolute -top-4 -right-2 sm:-right-6 bg-white rounded-2xl shadow-xl px-5 py-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Сегодня открыто</div>
              <div className="text-sm font-semibold text-ink-900 mt-1">{CLINIC.hours}</div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="hidden lg:flex justify-center mt-16">
          <a href="#about" className="flex flex-col items-center gap-2 text-ink-400 hover:text-rosegold-500 transition-colors group">
            <span className="text-xs font-medium uppercase tracking-widest group-hover:tracking-[0.28em] transition-all duration-300">Листайте вниз</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Play, CalendarHeart, ArrowUpRight } from 'lucide-react';
import { CLINIC } from '../data/clinic';

const STATS = [
  { value: 6, suffix: '+', label: 'врачей высшей категории' },
  { value: 7, suffix: '', label: 'направлений медицины' },
  { value: 10, suffix: '', label: 'лет на рынке' },
  { value: 100, suffix: '%', label: 'индивидуальный подход' },
];

function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

function StatItem({ stat, active }: { stat: typeof STATS[0]; active: boolean }) {
  const count = useCountUp(stat.value, 1600, active);
  return (
    <div className="text-center group">
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-none">
        {count}{stat.suffix}
      </div>
      <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-white/70 font-medium leading-snug max-w-[100px] sm:max-w-[120px] mx-auto">
        {stat.label}
      </div>
    </div>
  );
}

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (videoOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [videoOpen]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Клиника КосмоВита"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900/85 via-ink-900/75 to-rosegold-900/60" />
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-rosegold-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 py-16 sm:py-24 lg:py-36 container-main">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text & CTA */}
          <div>
            <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-rosegold-300">
                <span className="w-2 h-2 rounded-full bg-rosegold-400 animate-pulse-slow" />
                Медицинский центр КосмоВита
              </span>
              <h2 className="mt-4 sm:mt-5 font-serif text-2xl sm:text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white text-balance leading-tight">
                Здоровье — это
                <span className="block mt-1 text-gradient-rosegold">наш приоритет</span>
              </h2>
              <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-white/70 leading-relaxed max-w-lg">
                Мы объединили лучших специалистов Москвы, передовые технологии и
                искреннюю заботу о каждом пациенте — всё в одном месте.
              </p>
            </div>

            <div className={`mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a
                href={CLINIC.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex btn-primary text-base px-8 py-4 animate-glow"
              >
                <CalendarHeart className="w-5 h-5" />
                Записаться онлайн
              </a>
              <button
                onClick={() => setVideoOpen(true)}
                className="inline-flex items-center gap-3 px-5 sm:px-6 py-3 sm:py-4 rounded-full glass text-ink-900 font-semibold text-sm hover:bg-white/90 active:scale-95 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 touch-manipulation select-none"
              >
                <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rosegold-500 flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white fill-white ml-0.5" />
                </span>
                О клинике
              </button>
            </div>

            <div className={`mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-6 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors"
              >
                <span>Яндекс.Карты</span>
                <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              </a>
              <span className="text-white/30 hidden sm:inline">|</span>
              <span className="text-xs sm:text-sm text-white/60 truncate max-w-[200px] sm:max-w-none">{CLINIC.address}</span>
            </div>
          </div>

          {/* Right — stats */}
          <div className={`grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="relative p-4 sm:p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 group"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rosegold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <StatItem stat={stat} active={visible} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video modal placeholder */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative bg-ink-900 rounded-3xl overflow-hidden w-full max-w-2xl border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
            <div className="aspect-video bg-gradient-to-br from-ink-800 to-ink-900 flex flex-col items-center justify-center gap-4 p-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rosegold-400 to-rosegold-600 flex items-center justify-center shadow-2xl shadow-rosegold-500/30 animate-pulse-slow">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
              <div className="text-center">
                <div className="font-serif text-2xl font-semibold text-white">Видео о клинике</div>
                <div className="mt-2 text-white/50 text-sm">Свяжитесь с нами, чтобы узнать больше</div>
              </div>
              <a
                href={CLINIC.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4"
              >
                <ArrowUpRight className="w-4 h-4" />
                Посмотреть на Яндекс.Картах
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

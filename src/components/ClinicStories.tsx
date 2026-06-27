import { useState, useEffect, useRef, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface Story {
  id: number;
  title: string;
  tag: string;
  thumb: string;
  img: string;
  text: string;
  accent: string;
}

const STORIES: Story[] = [
  {
    id: 1,
    title: 'Добро пожаловать',
    tag: 'О клинике',
    thumb: 'https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Современный медицинский центр в самом сердце Москвы — уют, профессионализм и забота о вас',
    accent: 'from-rosegold-500 to-rosegold-700',
  },
  {
    id: 2,
    title: 'Наши врачи',
    tag: 'Специалисты',
    thumb: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Врачи высшей категории с многолетним опытом — каждый специалист прошёл строгий отбор',
    accent: 'from-emerald-500 to-emerald-700',
  },
  {
    id: 3,
    title: 'Косметология',
    tag: 'Услуги',
    thumb: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/3985163/pexels-photo-3985163.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Широкий спектр косметологических процедур для красоты и молодости вашей кожи',
    accent: 'from-rosegold-400 to-rosegold-600',
  },
  {
    id: 4,
    title: 'УЗИ-диагностика',
    tag: 'Диагностика',
    thumb: 'https://images.pexels.com/photos/7089392/pexels-photo-7089392.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/7089392/pexels-photo-7089392.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Точная ультразвуковая диагностика на оборудовании экспертного класса',
    accent: 'from-teal-500 to-teal-700',
  },
  {
    id: 5,
    title: 'Современное оборудование',
    tag: 'Технологии',
    thumb: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/4226219/pexels-photo-4226219.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Инвестируем в лучшие технологии, чтобы обеспечить максимальную точность и эффективность лечения',
    accent: 'from-ink-700 to-ink-900',
  },
  {
    id: 6,
    title: 'Уютная атмосфера',
    tag: 'Комфорт',
    thumb: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/1170979/pexels-photo-1170979.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Тёплая и спокойная атмосфера — мы создали пространство, в котором вы чувствуете себя в безопасности',
    accent: 'from-rosegold-300 to-rosegold-600',
  },
  {
    id: 7,
    title: 'Индивидуальный подход',
    tag: 'Забота',
    thumb: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: 'Каждый пациент уникален — поэтому мы создаём персональный план обследования и лечения',
    accent: 'from-emerald-400 to-emerald-700',
  },
  {
    id: 8,
    title: 'Центр Москвы',
    tag: 'Расположение',
    thumb: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    img: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=900',
    text: '1-й Волконский переулок, д.15 — в пешей доступности от трёх станций метро',
    accent: 'from-ink-600 to-rosegold-700',
  },
];

const DURATION = 5000;

export default function ClinicStories() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [viewed, setViewed] = useState<Set<number>>(new Set());
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  const goTo = useCallback((idx: number) => {
    setActive(Math.max(0, Math.min(idx, STORIES.length - 1)));
    setProgress(0);
    elapsedRef.current = 0;
    startRef.current = Date.now();
  }, []);

  const advance = useCallback(() => {
    setActive((prev) => {
      if (prev < STORIES.length - 1) {
        setProgress(0);
        elapsedRef.current = 0;
        startRef.current = Date.now();
        return prev + 1;
      }
      setOpen(false);
      return prev;
    });
  }, []);

  useEffect(() => {
    if (!open || paused) return;
    startRef.current = Date.now() - elapsedRef.current;
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      elapsedRef.current = elapsed;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= DURATION) {
        advance();
      }
    }, 50);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [open, active, paused, advance]);

  useEffect(() => {
    if (open) {
      setViewed((prev) => new Set(prev).add(active));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setProgress(0);
      elapsedRef.current = 0;
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, active]);

  const openStory = (idx: number) => {
    setActive(idx);
    setProgress(0);
    elapsedRef.current = 0;
    setOpen(true);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'ArrowRight') advance();
    if (e.key === 'ArrowLeft') goTo(active - 1);
    if (e.key === 'Escape') setOpen(false);
  }, [open, active, advance, goTo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section className="py-10 sm:py-14 relative overflow-hidden bg-white">
      <div className="container-main">
        <div className="flex items-center justify-between mb-6 reveal">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rosegold-400 to-rosegold-600 flex items-center justify-center">
              <Camera className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-serif text-lg font-semibold text-ink-900">Клиника в деталях</div>
              <div className="text-xs text-ink-500">Нажмите на историю, чтобы открыть</div>
            </div>
          </div>
        </div>

        {/* Story thumbnails row */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory -mx-1 px-1">
          {STORIES.map((story, i) => (
            <button
              key={story.id}
              onClick={() => openStory(i)}
              className="snap-start flex-shrink-0 flex flex-col items-center gap-2 group touch-manipulation"
            >
              <div className={`${viewed.has(i) ? 'story-ring-viewed' : 'story-ring-active'} transition-all duration-300`}>
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-rosegold-100 border-2 border-white">
                  <img
                    src={story.thumb}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
              <span className="text-[11px] sm:text-xs text-ink-600 font-medium text-center max-w-[72px] sm:max-w-[80px] leading-tight truncate">
                {story.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen story viewer */}
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => { setPaused(false); }}
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={STORIES[active].img}
              alt={STORIES[active].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
          </div>

          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1.5 p-3 sm:p-4">
            {STORIES.map((_, i) => (
              <div key={i} className="flex-1 h-0.5 sm:h-[3px] rounded-full bg-white/30 overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-none"
                  style={{
                    width: i < active ? '100%' : i === active ? `${progress}%` : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story header */}
          <div className="absolute top-8 sm:top-10 left-0 right-0 z-10 px-4 sm:px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${STORIES[active].accent} flex items-center justify-center ring-2 ring-white/50`}>
                <span className="text-white text-xs font-bold">{active + 1}</span>
              </div>
              <div>
                <div className="text-white text-sm font-semibold leading-tight">{STORIES[active].title}</div>
                <div className="text-white/70 text-xs">{STORIES[active].tag}</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Story text */}
          <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 z-10 px-6 sm:px-10 text-center">
            <div className="inline-block glass rounded-2xl px-6 py-4 max-w-md">
              <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
                {STORIES[active].text}
              </p>
            </div>
          </div>

          {/* Navigation zones */}
          <button
            className="absolute left-0 top-0 w-1/3 h-full z-20 cursor-pointer"
            onClick={() => goTo(active - 1)}
            aria-label="Предыдущая история"
          />
          <button
            className="absolute right-0 top-0 w-1/3 h-full z-20 cursor-pointer"
            onClick={advance}
            aria-label="Следующая история"
          />

          {/* Arrow hints (desktop) */}
          {active > 0 && (
            <button
              onClick={() => goTo(active - 1)}
              className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 glass-dark rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {active < STORIES.length - 1 && (
            <button
              onClick={advance}
              className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 glass-dark rounded-full items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Shimmer overlay on load */}
          <div className="absolute inset-0 shimmer-bg pointer-events-none opacity-20" />
        </div>
      )}
    </section>
  );
}

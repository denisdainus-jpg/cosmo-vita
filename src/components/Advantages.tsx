import { Award, Cog, MapPin, Clock } from 'lucide-react';

const ADVANTAGES = [
  {
    icon: Award,
    title: 'Опытные специалисты высшей категории',
    description: 'Врачи с многолетней практикой и подтверждённой квалификацией, постоянно совершенствующие свои знания.',
  },
  {
    icon: Cog,
    title: 'Современное оборудование',
    description: 'Используем аппаратуру экспертного класса, что обеспечивает точность диагностики и результативность процедур.',
  },
  {
    icon: MapPin,
    title: 'Удобное расположение в центре Москвы',
    description: 'Клиника находится в шаговой доступности от станций метро Цветной бульвар, Трубная и Сухаревская.',
  },
  {
    icon: Clock,
    title: 'Ежедневный приём с 10:00 до 21:00',
    description: 'Мы работаем без выходных, чтобы вы могли записаться на удобное время — даже вечером после работы.',
  },
];

export default function Advantages() {
  return (
    <section id="advantages" className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-rosegold-50/30">
      <div className="container-main">
        <div className="text-center max-w-3xl mx-auto reveal">
          <span className="eyebrow justify-center">Почему мы</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 text-balance leading-tight">
            Почему пациенты выбирают КосмоВиту
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            Мы создаём условия, в которых медицинская помощь становится комфортной,
            понятной и доступной каждый день.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ADVANTAGES.map((adv, i) => (
            <div
              key={adv.title}
              className={`reveal reveal-delay-${i + 1} group relative bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-ink-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-1 text-center overflow-hidden`}
            >
              <div className="relative inline-flex">
                <div className="absolute inset-0 bg-emerald-200 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <adv.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="mt-4 sm:mt-6 font-serif text-xs sm:text-lg font-semibold text-ink-900 leading-snug text-balance">
                {adv.title}
              </h3>
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-ink-500 leading-relaxed hidden sm:block">
                {adv.description}
              </p>
              <div className="font-serif text-3xl sm:text-5xl font-semibold text-rosegold-100 group-hover:text-rosegold-200 transition-colors absolute top-3 right-3 sm:top-4 sm:right-5">
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

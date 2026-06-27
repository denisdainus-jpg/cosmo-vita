import { HeartHandshake, Eye, Award, Users } from 'lucide-react';

const VALUES = [
  {
    icon: HeartHandshake,
    title: 'Забота о пациенте',
    description: 'Индивидуальный подход к каждому: внимательно слушаем, подробно объясняем и сопровождаем на каждом этапе.',
  },
  {
    icon: Eye,
    title: 'Прозрачность',
    description: 'Чёткие цены, понятные планы лечения и полная информация о каждом этапе — без скрытых платежей.',
  },
  {
    icon: Award,
    title: 'Квалификация',
    description: 'Врачи высшей категории с многолетним опытом, которые постоянно совершенствуют свои навыки.',
  },
  {
    icon: Users,
    title: 'Комфорт',
    description: 'Уютная атмосфера, отсутствие очередей и удобное время приёма — заботимся о вашем комфорте.',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="container-main">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
          {/* Image */}
          <div className="lg:col-span-5 reveal">
            <div className="relative">
              <div className="aspect-[4/3] sm:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://cosmo-vita.ru/photogallery/doctors/kalandadze.png"
                  alt="Каландадзе Хатуна Вахтанговна — врач-косметолог КосмоВита"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              {/* Floating accent */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-rosegold-100 rounded-3xl -z-10" />
              <div className="hidden sm:block absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl px-6 py-4">
                <div className="font-serif text-3xl font-semibold text-rosegold-600">100%</div>
                <div className="text-xs text-ink-500 mt-0.5">индивидуальный подход</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-7">
            <div className="reveal">
              <span className="eyebrow">О клинике</span>
              <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 text-balance leading-tight">
                Клиника, где медицина встречает заботу
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-ink-600 leading-relaxed">
                Медицинский центр «КосмоВита» объединяет опытных специалистов и
                современное оборудование, чтобы обеспечить полноценную медицинскую помощь
                в одном месте. Мы убеждены, что качественная медицина начинается с
                внимательного отношения к человеку.
              </p>
              <p className="mt-4 text-base text-ink-500 leading-relaxed">
                Наша философия — сочетать профессионализм, комфорт и честность. Мы
                создаём пространство, где каждый пациент чувствует доверие и поддержку
                на пути к здоровью и красоте.
              </p>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-2 gap-4 sm:gap-5">
              {VALUES.map((value, i) => (
                <div
                  key={value.title}
                  className={`reveal reveal-delay-${i + 1} group p-4 sm:p-6 rounded-2xl border border-ink-100 hover:border-rosegold-200 hover:shadow-lg transition-all duration-300`}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rosegold-50 flex items-center justify-center group-hover:bg-rosegold-100 transition-colors">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-rosegold-500" />
                  </div>
                  <h3 className="mt-3 sm:mt-4 font-serif text-sm sm:text-lg font-semibold text-ink-900 leading-snug">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-ink-500 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

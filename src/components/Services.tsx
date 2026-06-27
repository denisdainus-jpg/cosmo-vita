import { ArrowUpRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data/services';
import { CLINIC } from '../data/clinic';

export default function Services() {
  return (
    <section id="services" className="section-padding bg-rosegold-50/40 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-rosegold-200/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="container-main relative">
        {/* Heading */}
        <div className="max-w-3xl reveal">
          <span className="eyebrow">Направления</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 text-balance leading-tight">
            Полный спектр медицинских услуг
          </h2>
          <p className="mt-5 text-lg text-ink-600 leading-relaxed">
            От гинекологии и эндокринологии до косметологии и аппаратных методик —
            все направления работают под наблюдением врачей-специалистов.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Link
              key={service.id}
              to={`/services/${service.id}`}
              className={`reveal reveal-delay-${(i % 3) + 1} group relative bg-white rounded-3xl p-8 border border-ink-100 hover:border-rosegold-200 transition-all duration-500 hover:shadow-2xl hover:shadow-rosegold-500/10 hover:-translate-y-1 block`}
            >
              <div className="flex items-start justify-between">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rosegold-50 to-rosegold-100 flex items-center justify-center group-hover:from-rosegold-400 group-hover:to-rosegold-600 transition-all duration-500">
                  <service.icon className="w-7 h-7 text-rosegold-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-ink-50 text-ink-400 group-hover:bg-rosegold-500 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-ink-900 leading-snug">
                {service.title}
              </h3>
              <p className="mt-3 text-sm text-ink-500 leading-relaxed">
                {service.description}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold text-rosegold-600 group-hover:text-rosegold-700 transition-colors">
                Подробнее →
              </span>
            </Link>
          ))}

          {/* Apparatus methods card */}
          <Link
            to="/services/apparatus"
            className="reveal reveal-delay-3 group relative bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 text-white overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 block"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -blur-2xl translate-x-12 -translate-y-12" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <Wrench className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold leading-snug">
                Аппаратные методики
              </h3>
              <p className="mt-3 text-sm text-white/80 leading-relaxed">
                Современные аппаратные технологии: лазерная эпиляция, RF-лифтинг и
                другие процедуры для здоровья и красоты.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white/40 pb-0.5 group-hover:gap-3 transition-all">
                Подробнее <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

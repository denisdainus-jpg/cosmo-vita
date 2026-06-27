import {
  HeartPulse,
  FlaskConical,
  Sparkles,
  Stethoscope,
  ScanLine,
  Droplets,
} from 'lucide-react';

export interface Service {
  id: string;
  title: string;
  icon: typeof HeartPulse;
  description: string;
}

export const services: Service[] = [
  {
    id: 'gynecology',
    title: 'Гинекология и акушерство',
    icon: HeartPulse,
    description: 'Полное наблюдение на всех этапах: от планирования семьи до ведения беременности и лечения заболеваний.',
  },
  {
    id: 'endocrinology',
    title: 'Эндокринология',
    icon: FlaskConical,
    description: 'Диагностика и лечение нарушений работы щитовидной железы, гормонального баланса и обмена веществ.',
  },
  {
    id: 'cosmetology',
    title: 'Косметология',
    icon: Sparkles,
    description: 'Инъекционные и аппаратные методики для здоровья кожи, омоложения и устранения эстетических недостатков.',
  },
  {
    id: 'therapy',
    title: 'Терапия',
    icon: Stethoscope,
    description: 'Диагностика и лечение широкого спектра внутренних заболеваний, профилактика и наблюдение пациентов.',
  },
  {
    id: 'ultrasound',
    title: 'УЗИ-диагностика',
    icon: ScanLine,
    description: 'Современное ультразвуковое исследование органов и систем на оборудовании экспертного класса.',
  },
  {
    id: 'iv-therapy',
    title: 'Капельницы',
    icon: Droplets,
    description: 'Витаминные, детокс и восстановительные программы внутривенной терапии под контролем врача.',
  },
];

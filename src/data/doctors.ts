export interface Doctor {
  id: string;
  name: string;
  role: string;
  tags: string[];
  photo: string;
}

export const doctors: Doctor[] = [
  {
    id: 'furman',
    name: 'Фурман Надежда Юрьевна',
    role: 'Главный врач',
    tags: [
      'Акушер-гинеколог',
      'Гинеколог-эндокринолог',
      'Врач высшей категории',
    ],
    photo: 'https://cosmo-vita.ru/photogallery/doctors/furman.png',
  },
  {
    id: 'kalandadze',
    name: 'Каландадзе Хатуна Вахтанговна',
    role: 'Врач-косметолог',
    tags: ['Косметология', 'Эстетическая медицина'],
    photo: 'https://cosmo-vita.ru/photogallery/doctors/kalandadze.png',
  },
  {
    id: 'stoyakova',
    name: 'Стоякова Лия Анатольевна',
    role: 'Врач-дерматовенеролог',
    tags: ['Дерматовенерология', 'Косметология'],
    photo: 'https://cosmo-vita.ru/photogallery/doctors/stoyakova.png',
  },
  {
    id: 'mizerovskaya',
    name: 'Мизеровская Олеся Юрьевна',
    role: 'Косметолог-эстетист',
    tags: ['Эстетическая косметология'],
    photo: 'https://cosmo-vita.ru/photogallery/doctors/miserovskaya.png',
  },
  {
    id: 'gasanova',
    name: 'Гасанова Зара',
    role: 'Косметолог-эстетист',
    tags: ['Эстетическая косметология'],
    photo: 'https://cosmo-vita.ru/photogallery/doctors/gasanova.png',
  },
  {
    id: 'vasina',
    name: 'Васина Ольга Владимировна',
    role: 'Специалист лазерной эпиляции',
    tags: ['Лазерная эпиляция', 'Аппаратные методики'],
    photo: 'https://cosmo-vita.ru/photogallery/doctors/vasina.png',
  },
];

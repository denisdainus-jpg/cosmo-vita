export interface Promotion {
  id: string;
  discount: string;
  title: string;
  description: string;
}

export const promotions: Promotion[] = [
  {
    id: 'massage',
    discount: '10%',
    title: 'Скидка на 1-й визит массажа',
    description: 'Начните путь к здоровью и расслаблению с массажа — на первый визит действует скидка 10%.',
  },
  {
    id: 'cosmetologist',
    discount: '15%',
    title: 'Скидка на 1-й визит врача-косметолога',
    description: 'Запишитесь на первичную консультацию к врачу-косметологу и получите скидку 15% на визит.',
  },
];

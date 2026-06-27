import { useState, useMemo, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, ExternalLink, Loader2 } from 'lucide-react';
import { CLINIC } from '../data/clinic';
import { useYandexReviews } from '../hooks/useReviews';

const REVIEWS_PER_PAGE = 6;

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function avatarUrl(template: string | null, size = 100): string | null {
  if (!template) return null;
  return template.replace('{size}', String(size));
}

export default function Reviews() {
  const { reviews, loading, error } = useYandexReviews();
  const [page, setPage] = useState(0);

  const avgRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((a, r) => a + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const visible = reviews.slice(page * REVIEWS_PER_PAGE, (page + 1) * REVIEWS_PER_PAGE);

  const prev = () => setPage((v) => (v - 1 + totalPages) % totalPages);
  const next = () => setPage((v) => (v + 1) % totalPages);

  useEffect(() => {
    setPage(0);
  }, [reviews.length]);

  return (
    <section id="reviews" className="section-padding bg-rosegold-50/40 relative overflow-hidden">
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[400px] h-[400px] bg-emerald-200/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-main relative">
        {/* Heading with rating summary */}
        <div className="text-center max-w-3xl mx-auto reveal">
          <span className="eyebrow justify-center">Отзывы с Яндекс.Карт</span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink-900 text-balance leading-tight">
            Нам доверяют здоровье
          </h2>

          {loading ? (
            <div className="mt-8 flex items-center justify-center gap-3 text-ink-500">
              <Loader2 className="w-5 h-5 animate-spin text-rosegold-500" />
              <span className="text-sm">Загружаем отзывы…</span>
            </div>
          ) : error ? (
            <p className="mt-6 text-sm text-ink-500">Не удалось загрузить отзывы. Попробуйте позже.</p>
          ) : reviews.length > 0 ? (
            <div className="mt-6 inline-flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-ink-100 shadow-sm">
              <span className="font-serif text-3xl font-semibold text-ink-900">{avgRating.toFixed(1)}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(avgRating) ? 'fill-rosegold-400 text-rosegold-400' : 'text-ink-200'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-ink-500">
                {reviews.length} {reviews.length === 1 ? 'отзыв' : 'отзывов'}
              </span>
            </div>
          ) : null}
        </div>

        {/* Reviews grid */}
        {!loading && !error && visible.length > 0 && (
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((review, i) => {
              const avatar = avatarUrl(review.avatar_url);
              return (
                <article
                  key={review.id}
                  className={`reveal reveal-delay-${(i % 3) + 1} group flex flex-col bg-white rounded-3xl p-7 border border-ink-100 hover:border-rosegold-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-rosegold-400 text-rosegold-400" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-rosegold-100 -mr-1" />
                  </div>

                  <p className="mt-4 text-sm text-ink-600 leading-relaxed flex-1 line-clamp-6">
                    {review.text}
                  </p>

                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-ink-50">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={review.author}
                        className="w-11 h-11 rounded-full object-cover bg-rosegold-100"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rosegold-100 to-rosegold-200 flex items-center justify-center font-serif text-base font-semibold text-rosegold-700">
                        {review.author[0]}
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-ink-900 truncate">{review.author}</div>
                      {review.review_date && (
                        <div className="text-xs text-ink-400">{formatDate(review.review_date)}</div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white border border-ink-200 flex items-center justify-center text-ink-700 hover:border-rosegold-300 hover:text-rosegold-600 transition-colors active:scale-90 touch-manipulation"
              aria-label="Предыдущая страница"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-ink-500 font-medium min-w-[60px] text-center">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white border border-ink-200 flex items-center justify-center text-ink-700 hover:border-rosegold-300 hover:text-rosegold-600 transition-colors active:scale-90 touch-manipulation"
              aria-label="Следующая страница"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Link to all reviews */}
        {!loading && reviews.length > 0 && (
          <div className="mt-14 text-center reveal">
            <a
              href={CLINIC.yandexReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-rosegold-600 hover:text-rosegold-700 transition-colors"
            >
              Все отзывы на Яндекс.Картах
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center reveal">
          <p className="text-ink-600 mb-5">Готовы позаботиться о своём здоровье?</p>
          <a
            href={CLINIC.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-4"
          >
            Записаться онлайн
          </a>
        </div>
      </div>
    </section>
  );
}

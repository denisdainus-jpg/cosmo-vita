import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface YandexReview {
  id: string;
  author: string;
  avatar_url: string | null;
  rating: number;
  text: string;
  review_date: string | null;
}

interface ReviewState {
  reviews: YandexReview[];
  loading: boolean;
  error: string | null;
}

/**
 * Loads cached Yandex Maps reviews from the `yandex_reviews` table.
 * Also triggers the edge function to refresh the cache so the latest
 * reviews are available on subsequent loads.
 */
export function useYandexReviews() {
  const [state, setState] = useState<ReviewState>({
    reviews: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data, error } = await supabase
          .from('yandex_reviews')
          .select('id, author, avatar_url, rating, text, review_date')
          .order('review_date', { ascending: false })
          .limit(50);

        if (cancelled) return;

        if (error) throw error;

        setState({ reviews: data || [], loading: false, error: null });

        // Fire-and-forget cache refresh via edge function
        fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-yandex-reviews`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
        }).catch(() => {});
      } catch (err) {
        if (!cancelled) {
          setState({
            reviews: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Ошибка загрузки отзывов',
          });
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

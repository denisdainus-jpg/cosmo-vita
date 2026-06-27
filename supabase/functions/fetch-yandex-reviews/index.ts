import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const ORG_ID = '130297604585';
const REVIEWS_URL = `https://yandex.ru/maps/org/kosmovita/${ORG_ID}/reviews/`;

interface ParsedReview {
  id: string;
  author: string;
  avatarUrl: string | null;
  rating: number;
  text: string;
  updatedTime: string | null;
}

function extractReviews(html: string): ParsedReview[] {
  const idx = html.indexOf('"reviews":[');
  if (idx === -1) return [];

  const chunk = html.slice(idx, idx + 100000);

  const start = chunk.indexOf('[');
  let pos = start + 1;
  let depth = 1;
  let objStart = pos;
  const objects: string[] = [];

  while (pos < chunk.length && depth > 0) {
    if (chunk[pos] === '{') {
      if (depth === 1) objStart = pos;
      depth++;
    } else if (chunk[pos] === '}') {
      depth--;
      if (depth === 1) {
        objects.push(chunk.slice(objStart, pos + 1));
      }
    } else if (chunk[pos] === ']' && depth === 1) {
      break;
    }
    pos++;
  }

  const reviews: ParsedReview[] = [];
  for (const objStr of objects) {
    try {
      const obj = JSON.parse(objStr);
      if (!obj.reviewId || !obj.text) continue;
      reviews.push({
        id: obj.reviewId,
        author: obj.author?.name || 'Аноним',
        avatarUrl: obj.author?.avatarUrl || null,
        rating: obj.rating || 5,
        text: obj.text,
        updatedTime: obj.updatedTime || null,
      });
    } catch {
      // skip malformed
    }
  }
  return reviews;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const response = await fetch(REVIEWS_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ru-RU,ru;q=0.9',
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch reviews: ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = await response.text();
    const reviews = extractReviews(html);

    if (reviews.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No reviews found in page' }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Persist to Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const rows = reviews.map((r) => ({
      id: r.id,
      author: r.author,
      avatar_url: r.avatarUrl,
      rating: r.rating,
      text: r.text,
      review_date: r.updatedTime ? r.updatedTime.slice(0, 10) : null,
      fetched_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from('yandex_reviews')
      .upsert(rows, { onConflict: 'id' });

    if (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ fetched: reviews.length, reviews }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

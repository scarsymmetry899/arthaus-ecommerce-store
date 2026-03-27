import type { JournalPost } from "@/types";

export const journalPosts: JournalPost[] = [
  {
    id: "post_01",
    title: "The Art of Choosing Your First Print",
    slug: "choosing-your-first-print",
    excerpt:
      "Buying your first artwork is both thrilling and overwhelming. Here is how we think about it — and how to trust your instincts.",
    category: "art-guide",
    author: "ARTHAUS Editorial",
    date: "2026-02-15",
    reading_time: 6,
    hero_image: "https://picsum.photos/seed/journal-01/1400/700",
    body: `
      <p>There is no right way to start a collection. The only wrong approach is to wait until you feel ready — because that feeling of readiness never quite arrives.</p>

      <h2>Start With What You Can't Stop Looking At</h2>
      <p>The most reliable guide to what you should own is simple: what do you keep returning to? What images have stayed with you after seeing them — in a gallery, on a screen, in a magazine? Start there.</p>

      <blockquote>Art is not what you see, but what you make others see. — Edgar Degas</blockquote>

      <p>Your first print doesn't need to be expensive. It needs to be honest — a genuine response to something that moved you, not a calculated investment or a bid to seem sophisticated.</p>

      <h2>Think About Where It Will Live</h2>
      <p>A print changes depending on the light it's in, the wall colour behind it, the furniture around it. Before you buy, picture the specific wall. Consider whether the space calls for something that commands attention or something that rewards slow looking.</p>
    `,
  },
  {
    id: "post_02",
    title: "Elena Vasquez: Painting the Golden Hour",
    slug: "elena-vasquez-interview",
    excerpt:
      "We spent an afternoon in Elena Vasquez's Paris studio, talking about memory, the quality of light, and what it means to paint something that doesn't exist.",
    category: "artist-interview",
    author: "ARTHAUS Editorial",
    date: "2026-01-28",
    reading_time: 8,
    hero_image: "https://picsum.photos/seed/journal-02/1400/700",
    body: `
      <p>Elena Vasquez's studio occupies the top floor of a converted print shop in the 11th arrondissement. The light — which she describes as "the first thing I look for in any space" — falls through north-facing skylights onto canvases in various stages of completion.</p>

      <h2>On the Golden Hour</h2>
      <p>"I don't paint the golden hour itself," she tells me, adjusting a stretch of canvas on the floor. "I paint the feeling of anticipating it. The half-hour before, when everything gets a little warmer and the day starts winding down. That threshold moment."</p>

      <blockquote>I wanted to paint the feeling of standing at a threshold — not the moment itself, but the anticipation of it.</blockquote>

      <p>Her works are built up in layers — sometimes 30 or 40 before she considers a canvas finished. The texture this creates is physical, almost sculptural.</p>
    `,
  },
  {
    id: "post_03",
    title: "The Minimalist Home: Five Rules We Swear By",
    slug: "minimalist-home-five-rules",
    excerpt:
      "Minimalism isn't about owning less — it's about owning better. These five principles have guided every space we've ever admired.",
    category: "trend-report",
    author: "ARTHAUS Editorial",
    date: "2026-01-14",
    reading_time: 5,
    hero_image: "https://picsum.photos/seed/journal-03/1400/700",
    body: `
      <p>The minimalist room isn't empty. It's edited — every object chosen because it earns its place, every surface allowed to breathe.</p>

      <h2>Rule 1: One Statement, Silence Around It</h2>
      <p>The most effective rooms have a single focal point. One large artwork, properly lit, with clear space around it, will always outperform a wall crowded with smaller pieces.</p>

      <h2>Rule 2: Earn Your Materials</h2>
      <p>Natural materials — wood, stone, linen, cotton rag paper — have a warmth that synthetics can rarely replicate. Invest in quality over quantity.</p>
    `,
  },
  {
    id: "post_04",
    title: "How to Hang Art Like a Gallery Director",
    slug: "hanging-art-like-gallery-director",
    excerpt:
      "Placement, height, lighting, spacing — the technical side of hanging art is simpler than you think, and the results are transformative.",
    category: "art-guide",
    author: "ARTHAUS Editorial",
    date: "2025-12-20",
    reading_time: 7,
    hero_image: "https://picsum.photos/seed/journal-04/1400/700",
    body: `
      <p>The most common mistake people make when hanging art is to position it too high. Gallery standard is eye level for the midpoint — approximately 145–152cm from the floor to the centre of the work.</p>

      <h2>Lighting Changes Everything</h2>
      <p>Proper picture lighting can double the perceived value of any artwork. The difference between a cheap print under good lighting and an expensive print under bad lighting? The cheap print wins, every time.</p>
    `,
  },
  {
    id: "post_05",
    title: "2026 Art Trends: What We're Watching",
    slug: "2026-art-trends",
    excerpt:
      "From the resurgence of botanical art to the mainstream arrival of generative digital prints, here is what is shaping the art market this year.",
    category: "trend-report",
    author: "ARTHAUS Editorial",
    date: "2026-01-05",
    reading_time: 9,
    hero_image: "https://picsum.photos/seed/journal-05/1400/700",
    body: `
      <p>Every January, we take stock of where the art market is heading — not the investment market, but the living-with-art market: what people are actually putting on their walls, and why.</p>

      <h2>1. The Botanical Renaissance</h2>
      <p>After years of abstraction dominating interiors, botanical art is making a serious comeback. Not the Victorian pressed-flower variety, but a new wave of works that treat the natural world with genuine attention.</p>

      <h2>2. Large Format, Single Statement</h2>
      <p>The gallery wall — a grid of smaller pieces — is giving way to the single large work. People are buying one powerful piece rather than five mediocre ones.</p>
    `,
  },
  {
    id: "post_06",
    title: "Building a Gallery Wall That Actually Works",
    slug: "gallery-wall-guide",
    excerpt:
      "A gallery wall can transform a room — or overwhelm it. The difference is in the curation. Here is our complete guide to getting it right.",
    category: "art-guide",
    author: "ARTHAUS Editorial",
    date: "2025-11-30",
    reading_time: 10,
    hero_image: "https://picsum.photos/seed/journal-06/1400/700",
    body: `
      <p>A gallery wall is one of the most personal expressions possible in a home. Done well, it tells a story. Done badly, it's visual noise that you stop seeing within a week.</p>

      <h2>Start With a Unifying Element</h2>
      <p>The best gallery walls have a thread running through them — not necessarily the same style or medium, but something that connects the works: a consistent frame colour, a shared palette, a thematic link.</p>
    `,
  },
];

export function getPostBySlug(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug);
}

import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "col_01",
    title: "Monochrome Meditation",
    slug: "monochrome-meditation",
    description:
      "A carefully curated gathering of works that strip colour away to reveal the architecture beneath — tone, shadow, form, and the spaces between. These are pieces that reward sustained looking.",
    curator_note:
      "There is a particular quality of attention that black-and-white work demands. Without the distraction of colour, the eye is drawn into the fundamental structure of each composition — the dialogue between light and shadow, presence and absence. We assembled this collection for those who find the monochrome more alive, not less. Every piece here has been chosen because it offers something that colour would take away.",
    hero_image: "https://picsum.photos/seed/col-mono-hero/1400/800",
    product_ids: ["prod_08", "prod_09", "prod_10", "prod_11", "prod_12", "prod_19", "prod_20", "prod_21"],
    is_active: true,
  },
  {
    id: "col_02",
    title: "Mediterranean Summer",
    slug: "mediterranean-summer",
    description:
      "Sun-saturated, warm-blooded, generous — art that carries the scent of the sea and the weight of long, golden afternoons. Works that transform any room into somewhere south.",
    curator_note:
      "We came to this collection in January, deep in a grey winter, craving warmth. The Mediterranean has always been a state of mind as much as a geography — a quality of light, a particular generosity of colour, an atmosphere of time slowing down. The works here don't depict summer so much as embody it. Live with them and notice how the room changes.",
    hero_image: "https://picsum.photos/seed/col-med-hero/1400/800",
    product_ids: ["prod_01", "prod_14", "prod_18"],
    is_active: true,
  },
  {
    id: "col_03",
    title: "The Abstract Edit",
    slug: "the-abstract-edit",
    description:
      "Our most ambitious and varied collection: abstract works that push paint, form, and idea to their most essential. For the wall that can carry a conversation.",
    curator_note:
      "Abstraction is the most direct route from artist to viewer — no narrative, no subject matter, no referent. Just sensation, colour, and the pure act of looking. This edit gathers the strongest abstract works across our entire catalogue, from Elena Vasquez's luminous gestural fields to Amara Osei's digital architectures of colour. A collection for those who believe that art doesn't need to be 'about' anything to be everything.",
    hero_image: "https://picsum.photos/seed/col-abstract-hero/1400/800",
    product_ids: ["prod_01", "prod_02", "prod_03", "prod_04", "prod_05", "prod_24"],
    is_active: true,
  },
  {
    id: "col_04",
    title: "Botanical Dreams",
    slug: "botanical-dreams",
    description:
      "Works that bring the living world indoors — from Yuki Tanaka's meticulous botanical studies to Rafael Moreno's exuberant wildflower fields. For those who believe nature is the original art.",
    curator_note:
      "Plants have been the subject of some of the most extraordinary art ever made — from Audubon's birds to Kew's botanical archives to Georgia O'Keeffe's monumental flowers. Our Botanical Dreams collection honours that tradition while pushing it forward. Yuki Tanaka's scientific precision and Rafael Moreno's expressionist abandon occupy opposite ends of the spectrum, but they share a deep attention to the natural world that makes every piece in this collection feel genuinely alive.",
    hero_image: "https://picsum.photos/seed/col-botanical-hero/1400/800",
    product_ids: ["prod_16", "prod_17", "prod_18"],
    is_active: true,
  },
  {
    id: "col_05",
    title: "Under $50",
    slug: "under-50",
    description:
      "Gallery-quality art that begins at the price of a good dinner. Our most accessible picks — proof that extraordinary work doesn't require an extraordinary budget.",
    curator_note:
      "Great art should be for everyone. We've assembled our finest pieces available from $35 to $50 — the smallest sizes of works by artists whose larger prints command significantly more. This is the best way to start your collection: buy something that moves you now, live with it for a year, and see how your eye develops. Every serious collection started somewhere, usually at the right price at the right moment.",
    hero_image: "https://picsum.photos/seed/col-under50-hero/1400/800",
    product_ids: ["prod_10", "prod_11", "prod_19", "prod_21", "prod_16", "prod_07", "prod_09"],
    is_active: true,
  },
  {
    id: "col_06",
    title: "Statement Pieces",
    slug: "statement-pieces",
    description:
      "Works of commanding presence — large-format, limited, and designed to be the first thing anyone notices when they walk into a room. For those who want their walls to speak.",
    curator_note:
      "Some works whisper; some command. This collection is for the wall that needs a statement — a centrepiece around which the rest of the room organises itself. We've selected works that have presence, works that you can't ignore, works that change the energy of a space. All are available in large formats (24×36 and above), and several are limited editions that will only increase in significance with time. Buy deliberately. Buy once. Buy for keeps.",
    hero_image: "https://picsum.photos/seed/col-statement-hero/1400/800",
    product_ids: ["prod_24", "prod_03", "prod_13", "prod_14", "prod_06", "prod_20"],
    is_active: true,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

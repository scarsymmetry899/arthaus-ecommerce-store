import type { Artist } from "@/types";

export const artists: Artist[] = [
  {
    id: "artist_01",
    name: "Elena Vasquez",
    slug: "elena-vasquez",
    bio: "Elena Vasquez is a Paris-based painter whose luminous abstract canvases explore the intersection of memory and landscape. Trained at the École des Beaux-Arts, her practice spans large-format oil paintings and limited-edition giclée prints that carry the same emotional weight as the originals. Her work has been exhibited in galleries across Paris, Berlin, and New York, earning her a reputation as one of the most compelling voices in contemporary abstraction. Elena draws inspiration from the quality of light during the golden hour — that brief window where everything feels simultaneously familiar and otherworldly.",
    portrait_image: "https://picsum.photos/seed/artist-elena/600/600",
    location: "Paris, France",
    specialties: ["Abstract", "Oil Painting", "Large Format"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_02",
    name: "Kai Nakamura",
    slug: "kai-nakamura",
    bio: "Kai Nakamura is a Tokyo-based photographer whose work captures the quiet poetry hidden within urban environments. With a background in architecture, he brings a rigorous compositional eye to street photography — finding geometry, rhythm, and melancholy in the spaces between people and buildings. His series have appeared in Wallpaper*, Monocle, and various museum group shows throughout Asia and Europe. Kai shoots primarily on medium-format film, giving his images a tactile depth and tonal richness that digital photography struggles to replicate.",
    portrait_image: "https://picsum.photos/seed/artist-kai/600/600",
    location: "Tokyo, Japan",
    specialties: ["Photography", "Urban", "Film"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_03",
    name: "Marcus Webb",
    slug: "marcus-webb",
    bio: "Marcus Webb lives and works in Brooklyn, New York, where his studio practice moves fluidly between painting, sculpture, and printmaking. His work examines the visual language of the built environment — concrete textures, geometric shadows, and the subtle tensions between order and entropy. A graduate of the Rhode Island School of Design, Marcus has shown at Art Basel Miami, Frieze New York, and numerous commercial galleries. His prints are sought after for their architectural quality — pieces that look equally at home in a modernist loft or a converted warehouse space.",
    portrait_image: "https://picsum.photos/seed/artist-marcus/600/600",
    location: "Brooklyn, New York",
    specialties: ["Contemporary", "Minimalist", "Mixed Media"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_04",
    name: "Amara Osei",
    slug: "amara-osei",
    bio: "Amara Osei is a Cape Town-born, globally exhibited digital artist whose practice sits at the intersection of traditional African visual culture and cutting-edge generative art. After completing a Master's in Digital Arts at Central Saint Martins, she returned to South Africa to establish her studio, where she creates immersive digital canvases that pulse with color, pattern, and symbolic depth. Amara's work interrogates questions of identity, heritage, and the future of human connection in an increasingly algorithmic world. Her limited-edition prints are produced on archival fine-art paper and come with detailed certificates of authenticity.",
    portrait_image: "https://picsum.photos/seed/artist-amara/600/600",
    location: "Cape Town, South Africa",
    specialties: ["Digital Art", "Abstract", "Generative"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_05",
    name: "Sophie Laurent",
    slug: "sophie-laurent",
    bio: "Sophie Laurent is a Lyon-based artist whose minimalist compositions achieve a rare emotional potency through radical simplicity. Trained as a graphic designer before transitioning to fine art, she brings a typographer's sensitivity to space, proportion, and the weight of negative space. Her black-and-white works are studies in restraint — each piece a conversation between form and void, presence and absence. Sophie's work has been collected by major institutions across France and the UK, and her prints regularly sell out within hours of release on ARTHAUS.",
    portrait_image: "https://picsum.photos/seed/artist-sophie/600/600",
    location: "Lyon, France",
    specialties: ["Minimalist", "Black & White", "Graphic"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_06",
    name: "James Thornton",
    slug: "james-thornton",
    bio: "James Thornton is a London-based documentary and fine-art photographer with over fifteen years of experience capturing the world's most compelling landscapes, cityscapes, and quiet human moments. His work has taken him from the fog-laden streets of Edinburgh to the electric neon corridors of Hong Kong, always in search of that decisive moment where light, shadow, and story converge. James shoots exclusively in black and white, believing that the removal of color forces both photographer and viewer into a more honest, elemental dialogue with the subject. His prints are made using the platinum-palladium process for maximum archival quality.",
    portrait_image: "https://picsum.photos/seed/artist-james/600/600",
    location: "London, United Kingdom",
    specialties: ["Photography", "Black & White", "Documentary"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_07",
    name: "Yuki Tanaka",
    slug: "yuki-tanaka",
    bio: "Yuki Tanaka is a Kyoto-based botanical artist whose delicate, luminous works blur the boundary between scientific illustration and fine art. Trained in the centuries-old Japanese tradition of nihonga painting before studying botanical illustration at the Royal Botanic Gardens, Kew, Yuki brings an extraordinary attention to the micro-world of plant life — rendering petals, stems, and root structures with a reverence that feels almost spiritual. Her works are printed on archival cotton rag paper using pigment inks that faithfully reproduce the jewel-like quality of her original watercolours. Each piece feels like a window into another, slower world.",
    portrait_image: "https://picsum.photos/seed/artist-yuki/600/600",
    location: "Kyoto, Japan",
    specialties: ["Botanical", "Watercolour", "Nature"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
  {
    id: "artist_08",
    name: "Rafael Moreno",
    slug: "rafael-moreno",
    bio: "Rafael Moreno is a Barcelona-born painter and printmaker whose vibrant, sun-saturated canvases capture the sensory richness of Mediterranean life. After studying at the Escola d'Art i Superior de Disseny in Valencia, he spent a decade traveling through Morocco, Greece, and southern Italy, absorbing the particular quality of light that defines the region's visual culture. His contemporary paintings layer pigment with impasto technique to create works of extraordinary tactile depth, which his ARTHAUS prints faithfully reproduce using museum-grade giclée processes. Rafael's work is an invitation to slow down, to feel warmth, to remember what light can do to a wall.",
    portrait_image: "https://picsum.photos/seed/artist-rafael/600/600",
    location: "Barcelona, Spain",
    specialties: ["Contemporary", "Nature", "Mediterranean"],
    social_links: {
      instagram: "https://instagram.com",
      website: "https://example.com",
    },
  },
];

export function getArtistBySlug(slug: string): Artist | undefined {
  return artists.find((a) => a.slug === slug);
}

export function getArtistById(id: string): Artist | undefined {
  return artists.find((a) => a.id === id);
}

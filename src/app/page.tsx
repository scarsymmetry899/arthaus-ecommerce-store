/**
 * ARTHAUS — Homepage
 * All 9 sections assembled.
 */
import { Hero } from "@/components/home/Hero";
import { FeaturedCollectionStrip } from "@/components/home/FeaturedCollectionStrip";
import { CurationGrid } from "@/components/home/CurationGrid";
import { CategoryNav } from "@/components/home/CategoryNav";
import { RoomVisualizerTeaser } from "@/components/home/RoomVisualizerTeaser";
import { ArtistSpotlight } from "@/components/home/ArtistSpotlight";
import { NewArrivals } from "@/components/home/NewArrivals";
import { SocialProof } from "@/components/home/SocialProof";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollectionStrip />
      <CurationGrid />
      <CategoryNav />
      <RoomVisualizerTeaser />
      <ArtistSpotlight />
      <NewArrivals />
      <SocialProof />
      <NewsletterCTA />
    </>
  );
}

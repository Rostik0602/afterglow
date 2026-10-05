import { Suspense } from "react";
import { BloggerSheet } from "@/components/blogger/BloggerSheet";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyTelegramBar } from "@/components/layout/StickyTelegramBar";
import { Catalog } from "@/components/sections/Catalog";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TelegramCTA } from "@/components/sections/TelegramCTA";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export default function Home() {
  return (
    <>
      <AmbientGlow />
      <Header />
      <main>
        <Hero />
        <Catalog />
        <HowItWorks />
        <TelegramCTA />
      </main>
      <Footer />
      <StickyTelegramBar />
      <Suspense fallback={null}>
        <BloggerSheet />
      </Suspense>
    </>
  );
}
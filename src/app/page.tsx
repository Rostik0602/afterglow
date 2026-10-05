import { Suspense } from "react";
import { BloggerSheet } from "@/components/blogger/BloggerSheet";
import { Header } from "@/components/layout/Header";
import { Catalog } from "@/components/sections/Catalog";
import { Hero } from "@/components/sections/Hero";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export default function Home() {
  return (
    <>
      <AmbientGlow />
      <Header />
      <main>
        <Hero />
        <Catalog />
      </main>
      <Suspense fallback={null}>
        <BloggerSheet />
      </Suspense>
    </>
  );
}
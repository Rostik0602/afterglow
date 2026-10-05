import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { AmbientGlow } from "@/components/ui/AmbientGlow";

export default function Home() {
  return (
    <>
      <AmbientGlow />
      <Header />
      <main>
        <Hero />
      </main>
    </>
  );
}
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<WorkSkeleton />}>
          <WorkSection />
        </Suspense>
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function WorkSkeleton() {
  return (
    <section id="work" className="scroll-mt-16 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Selected work</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-video animate-pulse rounded-xl bg-white/5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

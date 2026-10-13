import { site } from "@/data/site";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-16"
    >
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-widest text-violet-400">
          {site.role}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-zinc-400">
          Hi, I'm {site.name}. Check out my work below, then let's talk about
          your next video.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#work"
            className="rounded-full bg-violet-600 px-6 py-3 font-medium transition hover:bg-violet-500"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-3 font-medium transition hover:bg-white/10"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}

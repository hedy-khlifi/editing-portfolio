import { site } from "@/data/site";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-16 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold sm:text-4xl">What I do</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {site.services.map((s) => (
            <div
              key={s.title}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/60 hover:shadow-xl hover:shadow-violet-900/30"
            >
              {/* soft violet glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-violet-500/0 to-violet-500/0 opacity-0 transition-opacity duration-300 group-hover:from-violet-500/[0.06] group-hover:to-transparent group-hover:opacity-100" />

              <h3 className="relative text-lg font-semibold text-violet-300 transition-colors group-hover:text-violet-200">
                {s.title}
              </h3>
              <p className="relative mt-3 text-zinc-400">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

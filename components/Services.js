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
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-violet-500/50"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-3 text-zinc-400">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

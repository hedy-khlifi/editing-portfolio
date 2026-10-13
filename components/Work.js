"use client";
import { useState } from "react";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";

function Block({ title, items, step, gridClass, onOpen }) {
  const [shown, setShown] = useState(step);
  if (!items.length) return null;

  return (
    <div className="mt-14">
      <h3 className="mb-6 text-sm uppercase tracking-widest text-violet-400">
        {title} <span className="text-zinc-600">({items.length})</span>
      </h3>

      <div className={gridClass}>
        {items.slice(0, shown).map((v) => (
          <VideoCard key={v.type + v.id} video={v} onOpen={onOpen} />
        ))}
      </div>

      {shown < items.length && (
        <button
          onClick={() => setShown(shown + step)}
          className="mt-8 rounded-full border border-white/20 px-6 py-2.5 text-sm transition hover:bg-white/10"
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default function Work({ items }) {
  const [active, setActive] = useState(null);
  const long = items.filter((v) => v.format === "long");
  const short = items.filter((v) => v.format === "short");

  return (
    <section id="work" className="scroll-mt-16 px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold sm:text-4xl">Selected work</h2>

        <Block
          title="Long-form"
          items={long}
          step={6}
          gridClass="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          onOpen={setActive}
        />
        <Block
          title="Short-form"
          items={short}
          step={10}
          gridClass="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          onOpen={setActive}
        />
      </div>

      {active && <VideoModal video={active} onClose={() => setActive(null)} />}
    </section>
  );
}

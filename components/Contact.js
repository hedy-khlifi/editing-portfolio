"use client";
import { useRef, useState } from "react";
import { site } from "@/data/site";

const formatPhone = (n) =>
  n.startsWith("216") && n.length === 11
    ? `+216 ${n.slice(3, 5)} ${n.slice(5, 8)} ${n.slice(8)}`
    : `+${n}`;

const igHandle = (() => {
  try {
    return new URL(site.instagram).pathname.split("/").filter(Boolean)[0] || "";
  } catch {
    return "";
  }
})();

const rows = [
  ...site.emails.map((e) => ({
    key: e.address,
    label: e.label,
    display: e.address,
    value: e.address,
  })),
  ...site.whatsapp.map((w) => ({
    key: w.number,
    label: w.label,
    display: formatPhone(w.number),
    value: `+${w.number}`,
  })),
  ...(igHandle
    ? [
        {
          key: "instagram",
          label: "Instagram",
          display: `@${igHandle}`,
          value: `@${igHandle}`,
        },
      ]
    : []),
];

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export default function Contact() {
  const [copiedKey, setCopiedKey] = useState(null);
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const handleCopy = async (row) => {
    const ok = await copyText(row.value);
    setMsg(
      ok
        ? `Copied: ${row.display}`
        : "Couldn't copy, please select it manually",
    );
    setCopiedKey(ok ? row.key : null);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(false);
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <section id="contact" className="scroll-mt-16 px-5 py-24">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center sm:p-10">
        <h2 className="text-3xl font-bold sm:text-4xl">Let's work together</h2>
        <p className="mt-4 text-zinc-400">
          Got footage that needs editing? Send me a message and I'll get back to
          you fast.
        </p>

        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {rows.map((r, i) => {
            const copied = copiedKey === r.key;
            const lastOdd = rows.length % 2 === 1 && i === rows.length - 1;

            return (
              <button
                key={r.key}
                onClick={() => handleCopy(r)}
                className={`group flex w-full items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition hover:border-violet-500/50 hover:bg-white/[0.06] active:scale-[0.99] ${
                  lastOdd ? "sm:col-span-2" : ""
                }`}
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    {r.label}
                  </p>
                  <p className="mt-1 break-all font-medium text-zinc-100">
                    {r.display}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs transition ${
                    copied
                      ? "border-violet-500 bg-violet-600 text-white"
                      : "border-white/15 text-zinc-400 group-hover:text-white"
                  }`}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={`pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="max-w-full break-all rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-lg">
          {msg}
        </div>
      </div>
    </section>
  );
}

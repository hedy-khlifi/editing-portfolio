import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-zinc-500">
      © {2026} {site.name}. All rights reserved.
    </footer>
  );
}

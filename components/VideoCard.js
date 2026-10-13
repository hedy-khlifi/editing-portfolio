"use client";
import { useRef } from "react";
import { cldPoster, cldPreview, ytThumb } from "@/lib/media";

export default function VideoCard({ video, onOpen }) {
  const ref = useRef(null);
  const isCld = video.type === "cloudinary";
  const isShort = video.format === "short";

  const play = () => ref.current?.play().catch(() => {});
  const stop = () => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
    }
  };

  return (
    <button
      onClick={() => onOpen(video)}
      onMouseEnter={play}
      onMouseLeave={stop}
      className="group text-left"
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-zinc-900 ${
          isShort ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <img
          src={isCld ? cldPoster(video.id, isShort) : ytThumb(video.id)}
          alt={video.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {isCld && (
          <video
            ref={ref}
            src={cldPreview(video.id, isShort)}
            muted
            loop
            playsInline
            preload="none"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/0">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-lg text-black transition group-hover:scale-110">
            ▶
          </span>
        </div>
      </div>

      <h3 className="mt-3 text-sm font-medium sm:text-base">{video.title}</h3>
    </button>
  );
}

"use client";
import { useEffect } from "react";
import { cldVideo } from "@/lib/media";

export default function VideoModal({ video, onClose }) {
  const isShort = video.format === "short";
  const isYT = video.type === "youtube";

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <div
        className={isShort ? "w-auto" : "w-full max-w-4xl"}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`mx-auto overflow-hidden rounded-xl bg-black ${
            isShort
              ? "aspect-[9/16] h-[80vh] max-w-full"
              : "aspect-video w-full"
          }`}
        >
          {isYT ? (
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`}
              title={video.title}
              className="h-full w-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <video
              src={cldVideo(video.id)}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="font-medium">{video.title}</p>
          <div className="flex shrink-0 gap-4 text-sm text-zinc-400">
            {isYT && (
              <a
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                Open on YouTube ↗
              </a>
            )}
            <button onClick={onClose} className="hover:text-white">
              Close ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

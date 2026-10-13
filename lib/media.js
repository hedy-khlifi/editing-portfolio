const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const base = `https://res.cloudinary.com/${cloud}/video/upload`;

export const cldVideo = (id) => `${base}/q_auto/${id}.mp4`;

export const cldPreview = (id, short) =>
  `${base}/du_6,w_${short ? 480 : 640},${short ? "ar_9:16,c_fill," : ""}q_auto/${id}.mp4`;

export const cldPoster = (id, short) =>
  `${base}/so_1,w_${short ? 540 : 960},ar_${short ? "9:16" : "16:9"},c_fill,q_auto/${id}.jpg`;

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// pulls the 11-char ID out of any YouTube link
export function ytId(url) {
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1, 12);
    const v = u.searchParams.get("v");
    if (v) return v;
    const m = u.pathname.match(/\/(shorts|embed|live)\/([\w-]{11})/);
    return m ? m[2] : null;
  } catch {
    return null;
  }
}

// turns an entry from data/videos.js into what the components use
export function normalize(v) {
  if (v.cloudinary) {
    return {
      title: v.title,
      type: "cloudinary",
      id: v.cloudinary,
      format: v.format === "short" ? "short" : "long",
    };
  }
  const id = ytId(v.url || "");
  if (!id) {
    console.warn("Bad YouTube link:", v.url);
    return null;
  }
  const format = v.format || (v.url.includes("/shorts/") ? "short" : "long");
  return { title: v.title, type: "youtube", id, format };
}

const prettify = (id) => id.split("/").pop().replace(/[-_]+/g, " ").trim();

export async function getCloudinaryVideos(tag = "portfolio") {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) return [];

  try {
    const res = await fetch(
      `https://res.cloudinary.com/${cloud}/video/list/${tag}.json`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) {
      console.warn("Cloudinary list failed:", res.status);
      return [];
    }
    const data = await res.json();

    return data.resources
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .map((r) => ({
        title: prettify(r.public_id),
        type: "cloudinary",
        id: r.public_id,
        format: r.height > r.width ? "short" : "long",
      }));
  } catch (e) {
    console.warn("Cloudinary list error:", e);
    return [];
  }
}

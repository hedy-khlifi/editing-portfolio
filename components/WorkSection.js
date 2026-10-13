import Work from "@/components/Work";
import { videos } from "@/data/videos";
import { normalize } from "@/lib/media";
import { getCloudinaryVideos } from "@/lib/cloudinary";

export default async function WorkSection() {
  const manual = videos.map(normalize).filter(Boolean);
  const auto = await getCloudinaryVideos();

  const seen = new Set(manual.map((v) => v.type + v.id));
  const items = [...manual, ...auto.filter((v) => !seen.has(v.type + v.id))];

  return <Work items={items} />;
}

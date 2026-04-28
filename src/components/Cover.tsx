import Image from "next/image";
import type { Title } from "@/lib/data";

/**
 * Title artwork. Uses deterministic placeholder photos from picsum.photos
 * indexed by `title.imageId` so each title has its own art card without
 * shipping any real licensed imagery in the prototype.
 */
export function Cover({
  title,
  width = 480,
  height = 720,
  priority = false,
  className,
  sizes = "(min-width:1280px) 240px, (min-width:768px) 25vw, 50vw",
}: {
  title: Title;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const src = `https://picsum.photos/id/${title.imageId}/${width}/${height}`;
  return (
    <Image
      src={src}
      alt={`${title.name} key art`}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes}
      className={className}
      unoptimized
    />
  );
}

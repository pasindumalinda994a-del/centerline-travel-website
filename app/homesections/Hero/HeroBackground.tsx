import Image from "next/image";

const HERO_IMAGE = "/images/home/figma/hero-bg.jpg";

export function HeroBackground() {
  return (
    <Image
      src={HERO_IMAGE}
      alt=""
      fill
      priority
      className="object-cover object-[center_40%]"
      sizes="100vw"
      aria-hidden="true"
    />
  );
}

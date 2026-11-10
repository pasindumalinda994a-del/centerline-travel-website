import Image from "next/image";
import Link from "next/link";
import { CardCornerArrow } from "@/app/components/ui/CardCornerArrow";
import { MetaPill } from "@/app/components/ui/MetaPill";
import { formatPrice, type Vehicle } from "@/app/lib/content/explore";

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Link
      href={`/explore/vehicles/${vehicle.slug}`}
      className="group relative block h-[360px] rounded-xl sm:h-[400px]"
    >
      <span className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={vehicle.images[0]}
          alt={vehicle.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-slate/85 via-transparent to-transparent" />
      </span>
      <span className="absolute top-4 left-4 z-10">
        <MetaPill variant="earth">{formatPrice(vehicle.pricePerDay)}/day</MetaPill>
      </span>
      <CardCornerArrow />
      <span className="absolute inset-x-0 bottom-0 block p-5">
        <span className="text-h3 block font-medium text-white">{vehicle.title}</span>
        <span className="text-caption mt-1.5 block text-white/75">
          {vehicle.type} · {vehicle.seats} seats · {vehicle.transmission}
          {vehicle.withDriver ? " · Driver" : ""}
        </span>
        <span className="text-caption mt-1 block text-white/60">{vehicle.location}</span>
      </span>
    </Link>
  );
}

type MetaPillProps = {
  children: React.ReactNode;
  variant?: "glass" | "earth" | "brand";
  className?: string;
};

const variants = {
  glass: "bg-white/20 text-white backdrop-blur-md",
  earth: "bg-earth/90 text-white",
  brand: "bg-brand/90 text-white",
} as const;

export function MetaPill({
  children,
  variant = "glass",
  className = "",
}: MetaPillProps) {
  return (
    <span
      className={`text-caption inline-flex items-center rounded-full px-3 py-1 font-medium tracking-wide ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

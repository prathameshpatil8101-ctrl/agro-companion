import logoSrc from "@/assets/logo.png";

export function AppLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="AgroVision AI logo"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      loading="lazy"
    />
  );
}
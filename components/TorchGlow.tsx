"use client";

type TorchGlowProps = {
  size?: number;
  className?: string;
};

/**
 * Decorative static glow that mimics a soft torch/light source from the bottom-right.
 * No animations. Pure layered radial gradients.
 */
export default function TorchGlow({
  size = 560,
  className = "",
}: TorchGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-0 right-0 ${className}`}
      style={{ width: size, height: size, zIndex: 0 }}
    >
      <div className="halo" />
      <div className="core" />
      <style jsx>{`
        .halo,
        .core {
          position: absolute;
          mix-blend-mode: screen;
          will-change: transform, filter;
        }

        /* Large soft halo */
        .halo {
          inset: 0;
          background: radial-gradient(
            110% 85% at 90% 90%,
            rgba(255, 255, 255, 0.18) 0%,
            rgba(255, 255, 255, 0.1) 25%,
            rgba(255, 255, 255, 0.06) 45%,
            rgba(255, 255, 255, 0) 70%
          );
          filter: blur(14px);
        }

        /* Brighter core closer to the corner */
        .core {
          right: 22px;
          bottom: 22px;
          width: 150px;
          height: 150px;
          background: radial-gradient(
            70% 70% at 70% 70%,
            rgba(255, 255, 255, 0.073) 0%,
            rgba(255, 255, 255, 0.086) 45%,
            rgba(255, 255, 255, 0) 75%
          );
          filter: blur(10px);
        }
      `}</style>
    </div>
  );
}

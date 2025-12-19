import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const screenRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          setTimeout(() => onComplete(), 30);
        },
      });

      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      })
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to({}, { duration: 2 })
        .to(screenRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
        });
    });

    return () => {
      ctx.revert();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-100 bg-background flex items-center justify-center"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          ref={logoRef}
          className="relative w-[clamp(150px,30vw,400px)] h-[clamp(150px,30vw,400px)] opacity-0 scale-95"
        >
          <Image
            src="/images/logo.jpg"
            alt="JordanInTech"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div
          ref={textRef}
          className="absolute bottom-16 right-8 md:right-16 opacity-0 translate-y-4"
        >
          <span className="font-['Satoshi'] text-xs md:text-sm text-grey-medium tracking-[0.3em] uppercase rotate-180 [writing-mode:vertical-rl]">
            Loading
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

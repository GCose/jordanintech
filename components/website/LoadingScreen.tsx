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
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const editionRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

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

      tl.to(gridRef.current, {
        opacity: 0.2,
        duration: 0.6,
        ease: "power2.out",
      })
        .to(
          bgTextRef.current,
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          topLineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          editionRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          logoRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.3"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .to(
          bottomLineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to({}, { duration: 1.5 })
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
      className="fixed inset-0 z-100 bg-background flex items-center justify-center overflow-hidden"
    >
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/6 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-5/6 w-px h-full bg-foreground"></div>
      </div>

      <h1
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,20vw,18rem)] font-bold leading-none tracking-[-0.04em] text-brand-primary/5 opacity-0 select-none pointer-events-none"
      >
        JIT
      </h1>

      <div className="relative w-full h-full flex flex-col items-center justify-center px-8 max-w-[clamp(800px,90vw,1200px)] mx-auto">
        <div
          ref={topLineRef}
          className="absolute top-24 md:top-32 left-8 right-8 h-px bg-brand-primary origin-left scale-x-0"
        ></div>

        <div
          ref={editionRef}
          className="absolute top-28 md:top-36 left-8 opacity-0 translate-y-4"
        >
          <span className="text-[0.625rem] font-medium tracking-[0.3em] text-brand-primary uppercase">
            2025 Edition
          </span>
        </div>

        <div
          ref={logoRef}
          className="relative w-[clamp(120px,20vw,280px)] h-[clamp(120px,20vw,280px)] opacity-0 scale-95 mb-8"
        >
          <Image
            fill
            priority
            alt="JordanInTech"
            src="/images/logo-2.png"
            className="object-contain"
          />
        </div>

        <div
          ref={titleRef}
          className="text-center mb-4 opacity-0 translate-y-4"
        >
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-none tracking-[-0.02em]">
            VOLUME ONE
          </h1>
        </div>

        <div
          ref={subtitleRef}
          className="text-center mb-12 opacity-0 translate-y-4"
        >
          <p className="text-[clamp(0.875rem,1.5vw,1.125rem)] font-light text-grey-medium tracking-widest uppercase">
            Building Systems That Scale
          </p>
        </div>

        <div
          ref={bottomLineRef}
          className="absolute bottom-24 md:bottom-32 left-8 right-8 h-px bg-brand-primary origin-right scale-x-0"
        ></div>

        <div
          ref={textRef}
          className="absolute bottom-16 right-8 md:right-16 opacity-0 translate-y-4"
        >
          <span className="font-['Satoshi'] text-xs md:text-sm text-grey-medium tracking-[0.3em] uppercase">
            Loading...
          </span>
        </div>

        <div className="absolute bottom-28 md:bottom-36 left-8 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
          <span className="text-[0.625rem] font-light text-grey-medium tracking-[0.2em] uppercase">
            Banjul, GM
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

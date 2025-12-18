import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.3,
      });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          opacity: 0,
          y: 100,
          rotateX: -90,
          stagger: 0.03,
          duration: 1,
          ease: "power4.out",
          delay: 0.5,
        });
      }

      gsap.from(subtitleRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power3.out",
        delay: 1.2,
      });

      gsap.from(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: "power3.out",
        delay: 1.5,
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 1.8,
      });

      gsap.from(gridRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.8,
      });

      gsap.to(titleRef.current, {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(subtitleRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(imageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block origin-bottom">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-background overflow-hidden min-h-screen mt-50"
    >
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
      >
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-foreground"></div>
      </div>

      <div className="px-8">
        <div className="grid grid-cols-12 gap-x-8 gap-16 items-start">
          <div
            ref={logoRef}
            className="col-span-12 md:col-span-3 md:col-start-1 flex justify-start"
          >
            <div className="relative w-20 h-20 md:w-84 md:h-84 border">
              <Image
                fill
                priority
                src="/images/logo.jpg"
                alt="JordanInTech Logo"
                className="object-contain"
              />
            </div>
          </div>

          <div className="col-span-12 md:col-span-11 md:col-start-3">
            <h1
              ref={titleRef}
              className="text-foreground mb-12 text-[clamp(4rem,12vw,14rem)] leading-[0.85] tracking-[-0.04em]"
            >
              {splitText("JORDAN")}
              <br />
              {splitText("IN TECH")}
            </h1>
          </div>

          <div
            ref={subtitleRef}
            className="col-span-12 md:col-span-5 md:col-start-3 space-y-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-brand-primary"></div>
              <span className="text-sm font-medium tracking-widest text-brand-primary uppercase">
                Software Company
              </span>
            </div>

            <p className="text-2xl font-light text-grey-medium leading-relaxed">
              Mobile-first software solutions engineered for modern businesses.
              From concept to deployment, we architect systems that scale.
            </p>
          </div>

          <div
            ref={imageRef}
            className="col-span-12 md:col-span-4 md:col-start-9"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <Image
                src="/images/home-page/hero.jpg"
                alt="Software development"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/60 via-transparent to-transparent"></div>
            </div>
          </div>

          <div
            ref={ctaRef}
            className="col-span-12 md:col-span-6 md:col-start-3 flex items-center gap-8 mt-12"
          >
            <Link
              href="/work"
              className="group relative inline-flex items-center gap-4 text-base font-medium tracking-widest text-foreground uppercase transition-all duration-500 hover:text-brand-primary"
            >
              <span className="relative z-10">Explore Our Work</span>
              <div className="w-16 h-0.5 bg-foreground transition-all duration-500 group-hover:w-24 group-hover:bg-brand-primary"></div>
              <svg
                className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <div className="hidden md:flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
              <span className="text-sm text-grey-medium">
                Kairaba Avenue, Banjul
              </span>
            </div>
          </div>

          <div className="hidden md:block col-span-3 col-start-10">
            <div className="flex flex-col gap-2">
              <div className="w-full h-px bg-grey-medium/20"></div>
              <div className="w-full h-px bg-grey-medium/20"></div>
              <div className="w-3/4 h-px bg-grey-medium/20"></div>
              <div className="w-1/2 h-px bg-grey-medium/20"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60">
        <span className="text-xs font-medium tracking-widest text-foreground uppercase rotate-180 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-foreground animate-pulse"></div>
      </div>
    </section>
  );
};

export default HeroSection;

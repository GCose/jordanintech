import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { HeroSectionProps } from "@/types";
import { useEffect, useRef, forwardRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  ({ isReady = false }, ref) => {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const jordanImageRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      gsap.set(gridRef.current, { opacity: 0 });
      gsap.set(logoRef.current, { opacity: 0, y: -50 });
      gsap.set(jordanImageRef.current, { opacity: 0, y: 400 });
      gsap.set(subtitleRef.current, { opacity: 0, x: -100 });
      gsap.set(ctaRef.current, { opacity: 0, scale: 0.8 });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        gsap.set(chars, { opacity: 0, y: 100, rotateX: -90 });
      }
    }, []);

    useEffect(() => {
      if (!isReady) return;

      const ctx = gsap.context(() => {
        gsap.to(gridRef.current, {
          opacity: 0.2,
          duration: 1,
          ease: "power2.out",
          delay: 0.2,
        });

        gsap.to(logoRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.5,
        });

        if (titleRef.current) {
          const chars = titleRef.current.querySelectorAll(".char");
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power4.out",
            delay: 1.5,
          });
        }

        gsap.to(jordanImageRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power3.out",
          delay: 2.5,
        });

        gsap.to(subtitleRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 3.5,
        });

        gsap.to(ctaRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          delay: 4,
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

        gsap.to(jordanImageRef.current, {
          yPercent: 150,
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
    }, [isReady]);

    const splitText = (text: string) => {
      return text.split("").map((char, index) => (
        <span key={index} className="char inline-block origin-bottom">
          {char === " " ? "\u00A0" : char}
        </span>
      ));
    };

    return (
      <section
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className="relative bg-background overflow-hidden min-h-screen md:pt-10 pb-12"
      >
        <div ref={gridRef} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-foreground"></div>
        </div>

        <div
          ref={jordanImageRef}
          className="block absolute top-[7%] lg:-right-147 w-full h-screen pointer-events-none z-0"
        >
          <Image
            src="/images/home-page/jordan-hero-2.png"
            alt="Jordan"
            fill
            className="object-contain object-top"
            priority
          />
        </div>

        <div className="px-4 md:px-0 relative z-10">
          <div className="grid grid-cols-12 gap-x-8 gap-16 md:gap-2 items-center">
            <div
              ref={logoRef}
              className="col-span-12 md:col-span-3 md:col-start-1 flex justify-start"
            >
              <div className="relative w-50 h-70 md:w-46 md:h-46 md:border">
                <Image
                  fill
                  priority
                  src="/images/logo-2.png"
                  alt="JordanInTech Logo"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="col-span-12 md:col-span-11 md:col-start-3 bg-white/60 py-8 md:py-0 md:bg-transparent">
              <h1
                ref={titleRef}
                className="text-foreground md:mb-12 text-[clamp(4rem,10vw,15rem)] leading-none tracking-[-0.04em]"
              >
                {splitText("JORDAN")}
                <br />
                <span className="pl-15 md:pl-50 lg:pl-100">
                  {splitText("IN TECH")}
                </span>
              </h1>
            </div>

            <div
              ref={subtitleRef}
              className="col-span-12 md:col-span-7 md:col-start-2 md:space-y-26 lg:space-y-16 bg-white/60 py-8 md:py-0 md:bg-transparent"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-0.5 bg-brand-primary"></div>
                <span className="text-sm font-medium tracking-widest text-brand-primary uppercase">
                  Software Company
                </span>
              </div>

              <p className="text-[clamp(1.5rem,2vw,2.5rem)] font-light text-grey-medium leading-relaxed">
                We build production-grade, performant software for businesses
                that can{"'"}t afford downtime. Mobile apps, web platforms,
                backend systems—architected to handle growth, not just on
                launch day.
              </p>
            </div>

            <div
              ref={ctaRef}
              className="col-span-12 md:col-span-6 md:col-start-3 flex items-center gap-8 mt-12"
            >
              <Link
                href="/work"
                className="group relative inline-flex items-center gap-4 text-base font-medium tracking-widest text-foreground uppercase transition-all duration-500 hover:text-brand-primary"
              >
                <span className="relative z-10">Let{"'"}s build together</span>
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
          </div>
        </div>
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";

export default HeroSection;

import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HeroSectionProps } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = ({ isReady = false }: HeroSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const jitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(gridRef.current, { opacity: 0 });
    gsap.set(logoRef.current, { opacity: 0, y: -50 });
    gsap.set(jitRef.current, { opacity: 0, y: -50 });
    gsap.set(imageRef.current, { opacity: 0, scale: 0.25 });
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

      if (jitRef.current) {
        gsap.to(jitRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 2.8,
        });

        const dot1 = jitRef.current.querySelector(".jit-dot-1");
        const dot2 = jitRef.current.querySelector(".jit-dot-2");
        const line = jitRef.current.querySelector("line");

        gsap.to(dot1, {
          y: 50,
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3.8,
        });

        gsap.to(dot2, {
          y: -50,
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3.8,
        });

        gsap.to(line, {
          attr: { y1: 77, y2: 103 },
          duration: 1.5,
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3.8,
        });

        gsap.to(jitRef.current, {
          rotation: 360,
          duration: 8,
          ease: "none",
          repeat: -1,
          delay: 3.8,
        });
      }

      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.9,
        ease: "power3.out",
        delay: 3.8,
      });

      gsap.to(subtitleRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 5,
      });

      gsap.to(ctaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "back.out(1.7)",
        delay: 6.2,
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
      ref={containerRef}
      className="relative bg-background overflow-hidden min-h-screen md:pt-10 pb-12"
    >
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-foreground"></div>
      </div>

      <div
        ref={jitRef}
        className="absolute top-8 right-0 md:right-30 px-6 pt-32 "
      >
        <svg
          width="80"
          height="180"
          viewBox="0 0 80 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="jit-dot-1" cx="40" cy="15" r="12" fill="#007BFF" />
          <line
            x1="40"
            y1="27"
            x2="40"
            y2="153"
            stroke="#007BFF"
            strokeWidth="1.5"
          />
          <circle
            className="jit-dot-2"
            cx="40"
            cy="165"
            r="12"
            fill="#007BFF"
          />
        </svg>
      </div>

      <div className="px-4 md:px-0">
        <div className="grid grid-cols-12 gap-x-8 gap-16 md:gap-2 items-center">
          <div
            ref={logoRef}
            className="col-span-12 md:col-span-3 md:col-start-1 flex justify-start"
          >
            <div className="relative w-50 h-70 md:w-66 md:h-66 border">
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
            className="col-span-12 md:col-span-7 md:col-start-2 md:space-y-26 lg:space-y-16"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-0.5 bg-brand-primary"></div>
              <span className="text-sm font-medium tracking-widest text-brand-primary uppercase">
                Software Company
              </span>
            </div>

            <p className="text-[clamp(1.5rem,2vw,2.5rem)] font-light text-grey-medium leading-relaxed">
              We{"'"}re your mobile-first solution provider. Native apps, web
              platforms, backend systems—we build software that handles real
              users and real growth. From concept to deployment, every line of
              code is built to scale.
            </p>
          </div>

          <div
            ref={imageRef}
            className="col-span-12 md:col-span-4 md:col-start-10 "
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
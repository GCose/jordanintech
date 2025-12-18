import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const image1Ref = useRef<HTMLDivElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const pullQuoteRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(accentLineRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      gsap.from(numberRef.current, {
        opacity: 0,
        scale: 1.2,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".title-word");
        gsap.from(chars, {
          opacity: 0,
          y: 120,
          rotateX: -90,
          stagger: 0.15,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 70%",
          },
        });
      }

      gsap.from(image1Ref.current, {
        opacity: 0,
        x: -80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image1Ref.current,
          start: "top 75%",
        },
      });

      gsap.from(image2Ref.current, {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: image2Ref.current,
          start: "top 75%",
        },
      });

      gsap.from(textBlockRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textBlockRef.current,
          start: "top 80%",
        },
      });

      gsap.from(pullQuoteRef.current, {
        opacity: 0,
        x: 60,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pullQuoteRef.current,
          start: "top 75%",
        },
      });

      gsap.from(statsRef.current?.children || [], {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 85%",
        },
      });

      // Parallax effects
      gsap.to(image1Ref.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(image2Ref.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(numberRef.current, {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-foreground text-background overflow-hidden py-[clamp(8rem,20vh,10rem)]"
    >
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute top-0 left-1/6 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-5/6 w-px h-full bg-background"></div>
      </div>

      <div
        ref={numberRef}
        className="absolute top-[10%] right-0 text-[clamp(15rem,35vw,40rem)] text-brand-primary/10 leading-none pointer-events-none select-none"
      >
        JIT
      </div>

      <div className="relative px-4 md:px-8">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-12">
          <div className="col-span-12 md:col-span-4 md:col-start-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-primary"></div>
              <span className="text-[0.625rem] font-medium tracking-[0.3em] text-brand-primary uppercase">
                About Us
              </span>
            </div>
          </div>

          <div className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2">
            <span className="text-lg font-light text-grey-medium tracking-[0.4em] uppercase rotate-180 [writing-mode:vertical-rl]">
              Crafted in Banjul
            </span>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-1 relative z-10 mt-1">
            <h2
              ref={titleRef}
              className="text-[clamp(3.5rem,10vw,12rem)] leading-[1.05] tracking-[-0.05em] uppercase"
            >
              <span className="title-word block origin-bottom">We Build</span>
              <span className="title-word block pl-4 md:pl-50 lg:pl-100 origin-bottom">
                Different
              </span>
            </h2>
          </div>

          <div
            ref={textBlockRef}
            className="col-span-12 md:col-span-5 md:col-start-2 md:row-start-3 space-y-6 pt-52 pb-32"
          >
            <p className="text-[clamp(1.5rem,2vw,2.5rem)] font-light text-grey-light leading-relaxed">
              We don{"'"}t just write code—we architect systems that scale.
              Mobile-first software solutions engineered for modern businesses.
            </p>

            <div className="flex items-start gap-4 pt-4 border-t border-background/10">
              <span className="text-[3rem] text-brand-primary leading-none">
                5+
              </span>
              <div className="pt-2">
                <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium">
                  Years building robust applications with performance and
                  precision
                </p>
              </div>
            </div>
          </div>

          <div
            ref={pullQuoteRef}
            className="col-span-12 md:col-span-4 md:col-start-8 md:row-start-3 flex flex-col justify-center"
          >
            <div className="border-l-2 border-brand-primary pl-6 py-8">
              <p className="text-[clamp(1.25rem,2.5vw,2rem)] font-light text-background/90 leading-tight mb-4">
                {'"'}Every line of code is written with intent.{'"'}
              </p>
              <span className="text-xs text-grey-medium tracking-wider uppercase">
                — Our Philosophy
              </span>
            </div>
          </div>

          <div
            ref={image2Ref}
            className="col-span-12 md:col-span-7 md:col-start-1 md:row-start-4"
          >
            <div className="relative aspect-4/3 w-full overflow-hidden">
              <Image
                src="/images/home-page/hero.jpg"
                alt="Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-foreground via-transparent to-transparent"></div>
            </div>
          </div>

          <div
            ref={statsRef}
            className="col-span-12 md:col-span-6 md:col-start-7 md:row-start-4 flex flex-col justify-center gap-8 pt-80"
          >
            <div className="space-y-3 border-b border-background/10 pb-6">
              <div className="text-[clamp(2.5rem,5vw,4rem)] text-brand-primary leading-none">
                50+
              </div>
              <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium tracking-wide">
                Projects delivered across web and mobile platforms
              </p>
            </div>

            <div className="space-y-3 border-b border-background/10 pb-6">
              <div className="text-[clamp(2.5rem,5vw,4rem)] text-brand-primary leading-none">
                98%
              </div>
              <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium tracking-wide">
                Client satisfaction from concept to deployment
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                <span className="text-xs font-light text-grey-medium tracking-wider uppercase">
                  Available for Projects
                </span>
              </div>
              <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium">
                Kairaba Avenue, Banjul • The Gambia
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

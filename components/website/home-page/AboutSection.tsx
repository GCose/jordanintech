import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const image2Ref = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const approachRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const verticalTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(labelRef.current, {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          numberRef.current,
          {
            opacity: 0,
            scale: 1.2,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.3"
        )
        .from(
          verticalTextRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
          },
          "+=0.3"
        );

      if (titleRef.current) {
        const titleWords = titleRef.current.querySelectorAll(".title-word");
        tl.from(
          titleWords,
          {
            opacity: 0,
            y: 120,
            rotateX: -90,
            stagger: 0.5,
            duration: 1.4,
            ease: "power4.out",
          },
          "+=0.4"
        );
      }

      tl.from(
        textBlockRef.current,
        {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
        },
        "+=0.5"
      )
        .from(
          approachRef.current,
          {
            opacity: 0,
            x: 80,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.4"
        )
        .from(
          image2Ref.current,
          {
            opacity: 0,
            scale: 0.85,
            duration: 1.4,
            ease: "power3.out",
          },
          "+=0.4"
        );

      if (statsRef.current) {
        tl.from(
          statsRef.current.children,
          {
            opacity: 0,
            y: 60,
            stagger: 0.4,
            duration: 1,
            ease: "power2.out",
          },
          "+=0.3"
        );
      }

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

      gsap.to(titleRef.current, {
        yPercent: 25,
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
      className="relative bg-background text-foreground overflow-hidden py-[clamp(8rem,20vh,10rem)]"
    >
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-0 left-1/6 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-5/6 w-px h-full bg-foreground"></div>
      </div>

      <div
        ref={numberRef}
        className="absolute top-[10%] right-0 text-[clamp(15rem,35vw,40rem)] text-brand-primary/10 leading-none pointer-events-none select-none"
      >
        JIT
      </div>

      <div className="relative px-4 md:px-8">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-12">
          <div
            ref={labelRef}
            className="col-span-12 md:col-span-4 md:col-start-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-primary"></div>
              <span className="text-[0.625rem] font-medium tracking-[0.3em] text-brand-primary uppercase">
                About Us
              </span>
            </div>
          </div>

          <div
            ref={verticalTextRef}
            className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2"
          >
            <span className="text-lg font-light text-grey-medium tracking-[0.4em] uppercase rotate-180 [writing-mode:vertical-rl]">
              Crafted in Banjul
            </span>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-1 relative z-10 mt-1">
            <h2
              ref={titleRef}
              className="text-[clamp(3.5rem,8vw,10rem)] leading-[1.05] tracking-[-0.05em] uppercase"
            >
              <span className="title-word block origin-bottom">We Build</span>
              <span className="title-word block pl-4 md:pl-50 lg:pl-100 origin-bottom">
                Different
              </span>
            </h2>
          </div>

          <div
            ref={textBlockRef}
            className="col-span-12 md:col-span-5 md:col-start-2 md:row-start-3 space-y-6 pt-10 md:pt-62"
          >
            <p className="text-[clamp(1.5rem,2vw,2.5rem)] font-light text-foreground leading-relaxed">
              Most companies ship features. We ship systems that last. Every
              decision—from database schema to API design—is made thinking five
              years ahead, not five sprints.
            </p>

            <div className="flex items-start gap-4 pt-4 border-t border-foreground/10">
              <span className="text-[3rem] text-brand-primary leading-none">
                5+
              </span>
              <div className="pt-2">
                <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium">
                  Years building production applications that handle real
                  traffic, real users, real money
                </p>
              </div>
            </div>
          </div>

          <div
            ref={approachRef}
            className="col-span-12 md:col-span-6 md:col-start-8 md:row-start-3 flex flex-col justify-center space-y-6 pt-8 md:pt-120"
          >
            <div>
              <p className="text-[clamp(1.5rem,2vw,2.5rem)] font-light text-foreground leading-relaxed">
                We don{"'"}t chase trends. React Native because it delivers
                native performance with a single codebase. Next.js because
                server-side rendering matters for SEO and speed.
              </p>
            </div>

            <div className="pt-4 border-t border-foreground/10">
              <p className="text-sm font-light text-grey-medium">
                Every technology choice is justified by engineering
                requirements, not hype cycles.
              </p>
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
              <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"></div>
            </div>
          </div>

          <div
            ref={statsRef}
            className="col-span-12 md:col-span-6 md:col-start-7 md:row-start-4 flex flex-col justify-center gap-8 pt-4 md:pt-80"
          >
            <div className="space-y-3 border-b border-foreground/10 pb-6">
              <div className="text-[clamp(2.5rem,5vw,4rem)] text-brand-primary leading-none">
                50+
              </div>
              <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium tracking-wide">
                Projects delivered from MVP to production scale
              </p>
            </div>

            <div className="space-y-3 border-b border-foreground/10 pb-6">
              <div className="text-[clamp(2.5rem,5vw,4rem)] text-brand-primary leading-none">
                3-6
              </div>
              <p className="text-[clamp(1.1rem,2vw,1.2rem)] font-light text-grey-medium tracking-wide">
                Months average timeline from concept to launch
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></div>
                <span className="text-xs font-light text-grey-medium tracking-wider uppercase">
                  Taking New Projects
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

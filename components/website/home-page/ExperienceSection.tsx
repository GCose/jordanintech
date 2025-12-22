import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(labelRef.current, {
        opacity: 0,
        x: -40,
        duration: 1,
        ease: "power3.out",
      });

      if (titleRef.current) {
        const titleWords = titleRef.current.querySelectorAll(".title-word");
        tl.from(
          titleWords,
          {
            opacity: 0,
            y: 120,
            rotateX: -90,
            stagger: 0.3,
            duration: 1.4,
            ease: "power4.out",
          },
          "-=1.2"
        );
      }

      tl.from(
        descRef.current,
        {
          opacity: 0,
          y: 60,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      );

      tl.from(
        logosRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      if (textRef.current) {
        gsap.to(textRef.current, {
          x: "-100%",
          duration: 60,
          ease: "none",
          repeat: -1,
        });
      }

      gsap.to(titleRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(descRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text = "MODEMPAY • NEXTGEN AGENCY • ";

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground overflow-hidden py-[clamp(8rem,20vh,12rem)]"
    >
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-0 left-1/6 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-5/6 w-px h-full bg-foreground"></div>
      </div>

      <div className="relative px-4 md:px-8">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-12 mb-32 md:mb-48">
          <div
            ref={labelRef}
            className="col-span-12 md:col-span-4 md:col-start-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-primary"></div>
              <span className="text-[0.625rem] font-medium tracking-[0.3em] text-brand-primary uppercase">
                Experience
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-12 md:col-start-1 relative z-10">
            <h2
              ref={titleRef}
              className="text-[clamp(3.5rem,8vw,10rem)] leading-[1.05] tracking-[-0.04em] uppercase"
            >
              <span className="title-word block origin-bottom">We Know</span>
              <span className="title-word block pl-4 md:pl-50 lg:pl-100 origin-bottom">
                What Works
              </span>
            </h2>
          </div>
        </div>

        <div className="relative mb-32">
          <div className="absolute inset-0 flex items-start  pointer-events-none -rotate-32">
            <div
              ref={textRef}
              className="whitespace-nowrap text-[clamp(6rem,15vw,20rem)] font-bold leading-none tracking-tight uppercase text-brand-primary/10"
            >
              {text}
              {text}
              {text}
              {text}
              {text}
              {text}
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 md:col-start-3">
              <p
                ref={descRef}
                className="text-[clamp(1.5rem,2vw,2.5rem)] font-light leading-relaxed mb-16"
              >
                Before founding JordanInTech, Jordan built production systems at
                ModemPay and NextGen Agency. Payment infrastructure handling
                real money. Client projects across West Africa. He knows what
                breaks at scale—and how to prevent it.
              </p>

              <div
                ref={logosRef}
                className="flex items-center gap-12 md:gap-16"
              >
                <div className="relative h-24 w-48 md:h-32 md:w-64 transition-all duration-500 mt-5">
                  <Image
                    src="/images/home-page/modempay.png"
                    alt="ModemPay"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="relative h-24 w-48 md:h-32 md:w-64 transition-all duration-500">
                  <Image
                    src="/images/home-page/nextgen.jpg"
                    alt="NextGen Agency"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6 md:col-start-3 flex items-center gap-8">
            <Link
              href="/about"
              className="group relative inline-flex items-center gap-4 text-base font-medium tracking-widest text-foreground uppercase transition-all duration-500 hover:text-brand-primary"
            >
              <span className="relative z-10">Read Jordan{"'"}s Story</span>
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

export default ExperienceSection;

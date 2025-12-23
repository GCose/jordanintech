import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const jordanImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLDivElement>(null);

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
          "-=0.8"
        );
      }

      tl.from(
        descriptionRef.current,
        {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      );

      tl.from(
        ctaButtonRef.current,
        {
          opacity: 0,
          x: -60,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

      tl.from(
        jordanImageRef.current,
        {
          opacity: 0,
          y: -200,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.8"
      );

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

      gsap.to(descriptionRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(jordanImageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(labelRef.current, {
        yPercent: -20,
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground text-background overflow-hidden py-[clamp(8rem,20vh,12rem)]"
    >
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-0 left-1/6 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-5/6 w-px h-full bg-background"></div>
      </div>

      <div className="relative px-4 md:px-8 z-10">
        <div
          ref={contentRef}
          className="grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-12"
        >
          <div
            ref={labelRef}
            className="col-span-12 md:col-span-4 md:col-start-1"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-primary"></div>
              <span className="text-[0.625rem] font-medium tracking-[0.3em] text-brand-primary uppercase">
                Let{"'"}s Work
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-1 relative z-10">
            <h2
              ref={titleRef}
              className="text-[clamp(3.5rem,8vw,10rem)] leading-[1.05] tracking-[-0.04em] uppercase mb-12"
            >
              <span className="title-word block origin-bottom">Ready To</span>{" "}
              <span className="block pl-4 md:pl-50 lg:pl-100">
                <span className="title-word inline-block origin-bottom">
                  Build?
                </span>
              </span>
            </h2>

            <p
              ref={descriptionRef}
              className="text-[clamp(1.5rem,2vw,2.5rem)] font-light leading-relaxed mb-12 max-w-3xl md:ml-50 lg:ml-100 mt-50"
            >
              Book a 30-minute call. We{"'"}ll discuss your project, timeline,
              and whether we{"'"}re the right fit. No sales pitch—just honest
              technical advice.
            </p>

            <div className="flex flex-col md:flex-row items-start gap-6 md:ml-50 lg:ml-100">
              <Link href="/contact">
                <div
                  ref={ctaButtonRef}
                  className="group inline-flex items-center gap-4 text-base font-medium tracking-widest text-background uppercase transition-all duration-500 hover:text-brand-primary cursor-pointer"
                >
                  <span>Book a Strategy Call</span>
                  <div className="w-16 h-0.5 bg-background transition-all duration-500 group-hover:w-24 group-hover:bg-brand-primary"></div>
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
                </div>
              </Link>
            </div>
          </div>

          <div
            ref={jordanImageRef}
            className="hidden md:block col-span-5 md:col-start-8"
          >
            <div className="relative w-full h-screen">
              <Image
                src="/images/home-page/jordan-hero-2.png"
                alt="Jordan Nwabuike"
                fill
                className="object-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

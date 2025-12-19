import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "GamCraft",
    category: "Mobile Application",
    location: "Banjul, GM",
    year: "2024",
    image: "/images/home-page/hero.jpg",
  },
  {
    id: 2,
    title: "Cribio",
    category: "Mobile Application",
    location: "Dakar, SN",
    year: "2024",
    image: "/images/home-page/hero.jpg",
  },
  {
    id: 3,
    title: "Modem Pay Merchant Mobile",
    category: "Mobile Application",
    location: "Accra, GH",
    year: "2023",
    image: "/images/home-page/hero.jpg",
  },
  {
    id: 4,
    title: "Trygg Backend",
    category: "System Architecture",
    location: "Lagos, NG",
    year: "2023",
    image: "/images/home-page/hero.jpg",
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const verticalTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ropeRef = useRef<SVGPathElement>(null);
  const dot1Ref = useRef<SVGCircleElement>(null);
  const dot2Ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);

      gsap.set(cardsContainerRef.current, {
        perspective: 1800,
        perspectiveOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      });

      gsap.set(cards, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            x: 0,
            y: 0,
            z: 0,
            scale: 0.5,
            rotateY: 0,
          });
        } else {
          gsap.set(card, {
            x: "100%",
            y: 0,
            z: 0,
            scale: 1,
            rotateY: 60,
          });
        }
      });

      const masterTimeline = gsap.timeline();

      masterTimeline.to(cards[0], {
        scale: 1,
        duration: 1,
        ease: "power2.out",
      });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];

          masterTimeline.to(
            card,
            {
              x: "-100%",
              y: 0,
              z: 0,
              rotateY: -60,
              duration: 1.5,
              ease: "power2.inOut",
              onUpdate: function () {
                if (card && nextCard) {
                  updateRope(card, nextCard, this.progress());
                }
              },
            },
            "+=0"
          );

          masterTimeline.to(
            nextCard,
            {
              x: 0,
              y: 0,
              z: 0,
              rotateY: 0,
              duration: 1.5,
              ease: "power2.inOut",
            },
            "<"
          );
        }
      });

      const updateRope = (
        exitingCard: HTMLDivElement,
        enteringCard: HTMLDivElement,
        progress: number
      ) => {
        if (!ropeRef.current || !dot1Ref.current || !dot2Ref.current) return;

        const container = cardsContainerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();

        // Get the actual card image elements
        const exitCardImage = exitingCard.querySelector(".aspect-16\\/10");
        const enterCardImage = enteringCard.querySelector(".aspect-16\\/10");

        if (!exitCardImage || !enterCardImage) return;

        const exitRect = exitCardImage.getBoundingClientRect();
        const enterRect = enterCardImage.getBoundingClientRect();

        // Right center edge of exiting card
        const x1 = exitRect.right - containerRect.left;
        const y1 = exitRect.top + exitRect.height / 2 - containerRect.top;

        // Left center edge of entering card
        const x2 = enterRect.left - containerRect.left;
        const y2 = enterRect.top + enterRect.height / 2 - containerRect.top;

        // Bezier curve control points for rope sag/tension with rotation effect
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const sagAmount = Math.min(distance * 0.15, 120);

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        // Add rotation effect - rope swings as cards transition
        const rotationOffset = Math.sin(progress * Math.PI) * 50;

        const cp1x = x1 + (midX - x1) * 0.5;
        const cp1y = midY + sagAmount + rotationOffset;
        const cp2x = x2 - (x2 - midX) * 0.5;
        const cp2y = midY + sagAmount - rotationOffset;

        const d = `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`;
        ropeRef.current.setAttribute("d", d);

        dot1Ref.current.setAttribute("cx", x1.toString());
        dot1Ref.current.setAttribute("cy", y1.toString());
        dot2Ref.current.setAttribute("cx", x2.toString());
        dot2Ref.current.setAttribute("cy", y2.toString());

        // Keep rope visible throughout transition
        const isTransitioning = progress > 0 && progress < 1;
        ropeRef.current.style.opacity = isTransitioning ? "1" : "0";
        dot1Ref.current.style.opacity = isTransitioning ? "1" : "0";
        dot2Ref.current.style.opacity = isTransitioning ? "1" : "0";
      };

      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        animation: masterTimeline,
      });

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
      })
        .from(
          numberRef.current,
          {
            opacity: 0,
            scale: 1.2,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.2"
        )
        .from(
          verticalTextRef.current,
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
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
          "-=1.5"
        );
      }

      tl.from(
        descRef.current,
        {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.5"
      );

      gsap.fromTo(
        numberRef.current,
        {
          yPercent: 0,
        },
        {
          yPercent: -200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
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

  return (
    <section
      ref={sectionRef}
      className="relative bg-foreground text-background overflow-hidden min-h-[600vh]"
    >
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-0 left-1/6 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-background"></div>
        <div className="absolute top-0 left-5/6 w-px h-full bg-background"></div>
      </div>

      <div
        ref={numberRef}
        className="absolute top-[5%] right-0 text-[clamp(15rem,35vw,40rem)] text-brand-primary/10 leading-none pointer-events-none select-none"
      >
        04
      </div>

      <div
        ref={verticalTextRef}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-50"
      >
        <span className="text-lg font-light text-grey-medium tracking-[0.4em] uppercase rotate-180 [writing-mode:vertical-rl]">
          Portfolio 2024
        </span>
      </div>

      <div className="relative px-4 md:px-8 pt-32">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
          <div
            ref={labelRef}
            className="col-span-12 md:col-span-4 md:col-start-1 mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-brand-primary"></div>
              <span className="text-[0.625rem] font-medium tracking-[0.3em] text-brand-primary uppercase">
                Our Work
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 md:col-start-1 relative z-10">
            <h2
              ref={titleRef}
              className="text-[clamp(3.5rem,8vw,10rem)] leading-[1.05] tracking-[-0.04em] uppercase"
            >
              <span className="title-word block origin-bottom">Work That</span>
              <span className="title-word block pl-4 md:pl-50 lg:pl-100 origin-bottom">
                Matters
              </span>
            </h2>

            <div className="flex items-center gap-6 pt-40 mt-8 md:mt-12 md:ml-10">
              <div className="w-12 md:w-124 h-px bg-white/30 shrink-0"></div>
              <p
                ref={descRef}
                className="text-[clamp(1.5rem,2vw,2.5rem)] w-full font-light text-background leading-relaxed "
              >
                These aren{"'"}t portfolio pieces. They{"'"}re live applications
                serving thousands of users. Real transactions. Real data. Real
                businesses depending on uptime.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={cardsContainerRef}
        className="relative w-full flex flex-col items-start justify-start h-screen overflow-hidden mt-32 py-16 md:py-24"
        style={{
          perspective: 800,
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-50"
          style={{ overflow: "visible" }}
        >
          <path
            ref={ropeRef}
            d=""
            stroke="#007bff"
            strokeWidth="2"
            fill="none"
            opacity="0"
            strokeLinecap="round"
          />
          <circle ref={dot1Ref} r="6" fill="#007bff" opacity="0" />
          <circle ref={dot2Ref} r="6" fill="#007bff" opacity="0" />
        </svg>

        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="w-full"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-8 col-start-3">
                <Link
                  href={`/work/${project.id}`}
                  className="block group cursor-pointer"
                >
                  <div className="relative w-full aspect-16/10 overflow-hidden mb-8">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-foreground/80 via-transparent to-transparent"></div>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-4xl md:text-6xl font-light text-background mb-2">
                        {project.title}
                      </h3>
                      <p className="text-lg text-grey-medium">
                        {project.category}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-grey-medium mb-1">
                        {project.location}
                      </p>
                      <p className="text-sm text-grey-medium">{project.year}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

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
  const introRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        animation: masterTimeline,
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

      <div className="relative px-8 pt-32 text-center">
        <div ref={introRef} className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-px bg-brand-primary"></div>
            <span className="text-xs font-medium tracking-widest text-brand-primary uppercase">
              Our Work
            </span>
            <div className="w-12 h-px bg-brand-primary"></div>
          </div>
          <p className="text-xl md:text-2xl font-light text-grey-medium leading-relaxed">
            Here are some of our best solutions. Mobile apps, web platforms, and
            backend systems built to handle real traffic, real users, and real
            growth.
          </p>
        </div>

        <h2
          ref={titleRef}
          className="text-[clamp(4rem,12vw,14rem)] leading-none tracking-[-0.04em] uppercase text-background"
        >
          Our Solutions
        </h2>
      </div>

      <div
        ref={cardsContainerRef}
        className="relative w-full flex flex-col items-start justify-start h-screen overflow-hidden py-16 md:py-24"
        style={{
          perspective: 800,
          perspectiveOrigin: "50% 50%",
          transformStyle: "preserve-3d",
        }}
      >
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

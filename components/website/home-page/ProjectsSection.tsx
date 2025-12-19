import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "FinanceFlow Mobile App",
    category: "Mobile Application",
    location: "Banjul, GM",
    year: "2024",
    image: "/images/home-page/hero.jpg",
  },
  {
    id: 2,
    title: "MediTrack System",
    category: "Web Platform",
    location: "Dakar, SN",
    year: "2024",
    image: "/images/home-page/hero.jpg",
  },
  {
    id: 3,
    title: "EduConnect Platform",
    category: "Full Stack",
    location: "Accra, GH",
    year: "2023",
    image: "/images/home-page/hero.jpg",
  },
  {
    id: 4,
    title: "AgriTech Dashboard",
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
        perspective: 2000,
        transformStyle: "preserve-3d",
      });

      gsap.set(cards, {
        position: "absolute",
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 1,
          pin: false,
        },
      });

      tl.to([introRef.current, titleRef.current], {
        opacity: 0,
        y: -100,
        duration: 0.5,
        ease: "power2.in",
      });

      tl.to(
        cards[0],
        {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });

      cards.forEach((card, index) => {
        if (index === 0) {
          gsap.set(card, {
            scale: 0.5,
            rotateY: 0,
            z: 0,
            opacity: 1,
          });
        } else {
          gsap.set(card, {
            scale: 0.5,
            rotateY: 90,
            y: "100vh",
            z: -500,
            opacity: 0,
          });
        }
      });

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];

          ScrollTrigger.create({
            trigger: cardsContainerRef.current,
            start: `top+=${index * 100}% top`,
            end: `top+=${(index + 1) * 100}% top`,
            scrub: 1,
            onUpdate: (self) => {
              const progress = self.progress;

              gsap.to(card, {
                rotateY: -90 * progress,
                x: -window.innerWidth * progress,
                opacity: 1 - progress,
                duration: 0,
              });

              gsap.to(nextCard, {
                rotateY: 90 - 90 * progress,
                y: `${100 - 100 * progress}vh`,
                z: -500 + 500 * progress,
                opacity: progress,
                scale: 0.5 + 0.5 * progress,
                duration: 0,
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground overflow-hidden min-h-[600vh]"
    >
      <div className="absolute left-8 top-1/2 -translate-y-1/2 z-50">
        <div className="bg-foreground text-background px-4 py-12">
          <span className="text-sm font-medium tracking-widest uppercase rotate-180 [writing-mode:vertical-rl]">
            Projects (57)
          </span>
        </div>
      </div>

      <div className="relative px-8 pt-32 pb-24">
        <div ref={introRef} className="max-w-2xl mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-brand-primary"></div>
            <span className="text-xs font-medium tracking-widest text-brand-primary uppercase">
              Our Work
            </span>
          </div>
          <p className="text-xl md:text-2xl font-light text-grey-medium leading-relaxed">
            Here are some of our best solutions. Mobile apps, web platforms, and
            backend systems built to handle real traffic, real users, and real
            growth.
          </p>
        </div>

        <h2
          ref={titleRef}
          className="text-[clamp(4rem,12vw,14rem)] leading-none tracking-[-0.04em] uppercase mb-32"
        >
          Our Solutions
        </h2>
      </div>

      <div
        ref={cardsContainerRef}
        className="relative w-full h-screen"
        style={{
          perspective: 2000,
          transformStyle: "preserve-3d",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="absolute w-full px-8"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <Link
              href={`/work/${project.id}`}
              className="block group cursor-pointer"
            >
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8 col-start-3">
                  <div className="relative w-full aspect-16/10 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
                      <div>
                        <h3 className="text-4xl md:text-6xl font-light text-background mb-2">
                          {project.title}
                        </h3>
                        <p className="text-lg text-background/80">
                          {project.category}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-background/80 mb-1">
                          {project.location}
                        </p>
                        <p className="text-sm text-background/80">
                          {project.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

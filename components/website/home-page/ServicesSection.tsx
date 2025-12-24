import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: "Mobile App Development",
    description:
      "Launch on iOS and Android in 12 weeks, not 6 months. We build with React Native—one codebase, both platforms, half the cost of going native. Your app ships faster, scales easier, and reaches more users from day one.",
    features: [
      "3-month MVP to app stores",
      "50% lower dev costs",
      "Single codebase maintenance",
      "Native performance guaranteed",
      "Push notifications & offline mode",
    ],
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "Your website needs to do three things: load fast, rank on Google, and convert visitors. We build sites that do all three. Under 2 seconds load time, optimized for search engines, designed to turn clicks into customers.",
    features: [
      "SEO-optimized from launch",
      "Sub-2-second load times",
      "Mobile-first responsive design",
      "Built to handle traffic spikes",
      "Google-friendly architecture",
    ],
  },
  {
    id: 3,
    title: "Backend Systems",
    description:
      "Infrastructure that grows with your business. Today you have 10 users, next month it could be 10,000. We build backends that scale with you—no breaking, no rebuilding from scratch. Your app stays fast, your data stays secure, and you sleep well at night. When your product takes off, your infrastructure keeps up.",
    features: [
      "Scales to millions of requests",
      "99.9% uptime guarantee",
      "Auto-scaling cloud setup",
      "Database optimized for growth",
      "Real-time data processing",
    ],
  },
  {
    id: 4,
    title: "System Architecture",
    description:
      "Technical decisions that save you from expensive mistakes. We design the foundation before writing code—database schemas that won't break, API structures that scale, deployment pipelines that just work.",
    features: [
      "Future-proof tech decisions",
      "Avoid costly rewrites",
      "Security built-in from start",
      "Scalability roadmap included",
      "DevOps & CI/CD setup",
    ],
  },
  {
    id: 5,
    title: "API Development",
    description:
      "APIs your partners and customers will actually want to use. Clean documentation, reliable endpoints, built for integrations. Whether it's mobile apps, third-party services, or internal tools—we make connecting easy.",
    features: [
      "RESTful & GraphQL options",
      "Complete API documentation",
      "OAuth & JWT authentication",
      "Rate limiting & monitoring",
      "Webhook & third-party integrations",
    ],
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const catchyTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const accordionContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const splitTextIntoWords = (text: string) => {
    return text.split(" ").map((word, index) => (
      <span key={index} className="split-word inline-block">
        {word}
        {index < text.split(" ").length - 1 ? "\u00A0" : ""}
      </span>
    ));
  };

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkDesktop();
    window.addEventListener("resize", checkDesktop);

    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

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

      gsap.to(catchyTextRef.current, {
        yPercent: -150,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

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

      services.forEach((_, index) => {
        const collapsedDot1 = document.querySelector(
          `.collapsed-dot1-${index}`
        );
        const collapsedDot2 = document.querySelector(
          `.collapsed-dot2-${index}`
        );
        const collapsedLine = document.querySelector(
          `.collapsed-line-${index}`
        );

        if (collapsedDot1 && collapsedDot2 && collapsedLine) {
          gsap.to(collapsedDot1, {
            y: 30,
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });

          gsap.to(collapsedDot2, {
            y: -30,
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });

          gsap.to(collapsedLine, {
            attr: { y1: 44, y2: 56 },
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });
        }

        const expandedDot1 = document.querySelector(`.expanded-dot1-${index}`);
        const expandedDot2 = document.querySelector(`.expanded-dot2-${index}`);
        const expandedLine = document.querySelector(`.expanded-line-${index}`);

        if (expandedDot1 && expandedDot2 && expandedLine) {
          gsap.to(expandedDot1, {
            y: 50,
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });

          gsap.to(expandedDot2, {
            y: -50,
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });

          gsap.to(expandedLine, {
            attr: { y1: 70, y2: 80 },
            duration: 1.5,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            delay: index * 0.2,
          });
        }
      });

      const accordionTimeline = gsap.timeline();

      services.forEach(() => {
        accordionTimeline.to(
          {},
          {
            duration: 1,
          }
        );
      });

      ScrollTrigger.create({
        trigger: accordionContainerRef.current,
        start: "center center",
        end: `+=${services.length * 100}%`,
        pin: true,
        scrub: 1,
        animation: accordionTimeline,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * services.length),
            services.length - 1
          );
          setActiveIndex(newIndex);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    services.forEach((service, index) => {
      const titleElement = document.querySelector(`.accordion-title-${index}`);
      const descElement = document.querySelector(`.accordion-desc-${index}`);

      if (index === activeIndex && titleElement && descElement) {
        const titleWords = titleElement.querySelectorAll(".split-word");
        const descWords = descElement.querySelectorAll(".split-word");

        gsap.fromTo(
          titleWords,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.3,
          }
        );

        gsap.fromTo(
          descWords,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            duration: 0.3,
            ease: "power2.out",
            delay: 0.5,
          }
        );

        const features = document.querySelectorAll(
          `.accordion-feature-${index}`
        );
        gsap.fromTo(
          features,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
            delay: 0.7,
          }
        );
      }
    });
  }, [activeIndex, isDesktop]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background text-foreground overflow-hidden py-[clamp(8rem,20vh,12rem)]"
    >
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-foreground"></div>
      </div>

      <div
        ref={catchyTextRef}
        className="absolute top-[20%] md:top-[80%] right-0 text-[clamp(15rem,35vw,35rem)] text-brand-primary/10 leading-none pointer-events-none select-none"
      >
        FULL
        <br />
        STACK
        <br />
        <span className="ml-50">DEV</span>
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
                Our Services
              </span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-12 md:col-start-1 relative z-10">
            <h2
              ref={titleRef}
              className="text-[clamp(3.5rem,8vw,10rem)] leading-[1.05] tracking-[-0.04em] uppercase"
            >
              <span className="title-word block origin-bottom">What We</span>
              <span className="title-word block pl-4 md:pl-50 lg:pl-100 origin-bottom">
                Offer Clients
              </span>
            </h2>
          </div>
        </div>

        {isDesktop ? (
          <div className="grid grid-cols-12 gap-4 ">
            <div
              ref={accordionContainerRef}
              className="col-span-12 md:col-span-12 grid grid-cols-12 gap-4 h-[700px] items-center"
            >
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.45,0,0.15,1)] border h-full ${
                    activeIndex === index
                      ? "col-span-8 border-brand-primary "
                      : "col-span-1 border-foreground/20 hover:border-brand-primary/50"
                  }`}
                >
                  <div
                    className={`h-full flex items-center justify-center p-4 transition-opacity duration-700 ${
                      activeIndex === index
                        ? "opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-6">
                      <svg
                        width="40"
                        height="100"
                        viewBox="0 0 40 100"
                        fill="none"
                      >
                        <circle
                          className={`collapsed-dot1-${index}`}
                          cx="20"
                          cy="14"
                          r="6"
                          fill="#007BFF"
                        />
                        <line
                          className={`collapsed-line-${index}`}
                          x1="20"
                          y1="20"
                          x2="20"
                          y2="80"
                          stroke="#007BFF"
                          strokeWidth="1.5"
                        />
                        <circle
                          className={`collapsed-dot2-${index}`}
                          cx="20"
                          cy="86"
                          r="6"
                          fill="#007BFF"
                        />
                      </svg>
                      <h3
                        className="text-[clamp(1.1rem,2vw,1.6rem)] font-medium tracking-wider uppercase text-foreground"
                        style={{
                          writingMode: "vertical-rl",
                          textOrientation: "mixed",
                        }}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 p-8 flex flex-col justify-between transition-opacity duration-700 ${
                      activeIndex === index
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div>
                      <div className="flex items-start gap-8 mb-8">
                        <svg
                          width="60"
                          height="150"
                          viewBox="0 0 60 150"
                          fill="none"
                          className="shrink-0"
                        >
                          <circle
                            className={`expanded-dot1-${index}`}
                            cx="30"
                            cy="20"
                            r="8"
                            fill="#007BFF"
                          />
                          <line
                            className={`expanded-line-${index}`}
                            x1="30"
                            y1="28"
                            x2="30"
                            y2="122"
                            stroke="#007BFF"
                            strokeWidth="1.5"
                          />
                          <circle
                            className={`expanded-dot2-${index}`}
                            cx="30"
                            cy="130"
                            r="8"
                            fill="#007BFF"
                          />
                        </svg>

                        <div className="flex-1">
                          <h3
                            className={`accordion-title-${index} text-4xl md:text-5xl uppercase font-light text-foreground mb-6`}
                          >
                            {splitTextIntoWords(service.title)}
                          </h3>
                          <p
                            className={`accordion-desc-${index} text-xl md:text-2xl font-light text-grey-medium leading-relaxed`}
                          >
                            {splitTextIntoWords(service.description)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="border-t border-foreground/10 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                          {service.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className={`accordion-feature-${index} flex items-center gap-2 text-[clamp(1.1rem,2vw,1.2rem)] font-light`}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div ref={accordionContainerRef} className="space-y-20">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="border border-foreground/20 py-6 px-1"
              >
                <div className="flex items-start mb-6">
                  <svg width="40" height="100" viewBox="0 0 40 100" fill="none">
                    <circle
                      className={`collapsed-dot1-${index}`}
                      cx="20"
                      cy="14"
                      r="6"
                      fill="#007BFF"
                    />
                    <line
                      className={`collapsed-line-${index}`}
                      x1="20"
                      y1="20"
                      x2="20"
                      y2="80"
                      stroke="#007BFF"
                      strokeWidth="1.5"
                    />
                    <circle
                      className={`collapsed-dot2-${index}`}
                      cx="20"
                      cy="86"
                      r="6"
                      fill="#007BFF"
                    />
                  </svg>

                  <div className="flex-1">
                    <h3 className="text-3xl font-light text-foreground mb-4">
                      {service.title}
                    </h3>
                    <p className="text-lg font-light text-grey-medium leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm font-light"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-primary"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="col-span-12 md:col-span-6 mx-auto md:col-start-3 flex items-center gap-8 mt-12">
          <Link
            href="/work"
            className="group relative inline-flex items-center gap-4 text-base font-medium tracking-widest text-foreground uppercase transition-all duration-500 hover:text-green-600 p-4 border-l border-t border-b"
          >
            <span className="relative z-10">Let{"'"}s build together</span>
            <div className="w-16 h-0.5 bg-foreground transition-all duration-500 group-hover:w-24 group-hover:bg-green-600"></div>
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
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

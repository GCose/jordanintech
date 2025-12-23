import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HomeProps } from "@/types";
import Layout from "@/components/website/layouts/Layout";
import HeroSection from "@/components/website/home-page/HeroSection";
import AboutSection from "@/components/website/home-page/AboutSection";
import ProjectsSection from "@/components/website/home-page/ProjectsSection";
import ServicesSection from "@/components/website/home-page/ServicesSection";
import ExperienceSection from "@/components/website/home-page/ExperienceSection";
import CTASection from "@/components/website/CTASection";

gsap.registerPlugin(ScrollTrigger);

const Home = ({ isReady = false }: HomeProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;

      gsap.set(svg, {
        x: window.innerWidth - 150,
        y: 100,
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const svg = svgRef.current;
      if (!svg) return;

      const dot1 = svg.querySelector(".path-dot-1");
      const dot2 = svg.querySelector(".path-dot-2");
      const line = svg.querySelector(".path-line");

      gsap.to(dot1, {
        y: 50,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      gsap.to(dot2, {
        y: -50,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      gsap.to(line, {
        attr: { y1: 77, y2: 103 },
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      gsap.to(svg, {
        rotation: 360,
        duration: 8,
        ease: "none",
        repeat: -1,
        delay: 0.5,
      });

      const heroTL = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      heroTL.to(
        svg,
        {
          x: 20,
          y: window.innerHeight - 250,
          ease: "power2.inOut",
        },
        0
      );

      heroTL.to(
        svg,
        {
          x: window.innerWidth - 150,
          y: window.innerHeight - 100,
          ease: "power2.inOut",
        },
        0.5
      );

      const heroToAboutTL = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top bottom",
          end: "top top",
          scrub: 2,
        },
      });

      heroToAboutTL.to(svg, {
        x: 20,
        y: 100,
        ease: "power2.inOut",
      });

      const aboutTL = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top top",
          end: () => `+=${aboutRef.current?.offsetHeight || 0}`,
          scrub: 2,
        },
      });

      aboutTL.to(
        svg,
        {
          x: window.innerWidth - 150,
          y: window.innerHeight * 0.5,
          ease: "power2.inOut",
        },
        0
      );

      aboutTL.to(
        svg,
        {
          x: 20,
          y: window.innerHeight - 250,
          ease: "power2.inOut",
        },
        0.5
      );

      const projectsTL = gsap.timeline({
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });

      projectsTL.to(svg, {
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight / 2 - 90,
        ease: "power2.inOut",
      });

      const servicesExperienceTL = gsap.timeline({
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top top",
          endTrigger: experienceRef.current,
          end: "bottom top",
          scrub: 2,
        },
      });

      servicesExperienceTL.to(svg, {
        x: window.innerWidth - 150,
        y: window.innerHeight / 2,
        ease: "power2.inOut",
        duration: 0.15,
      });

      servicesExperienceTL.to(svg, {
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight / 2,
        ease: "power1.out",
        duration: 0.05,
      });

      servicesExperienceTL.to(svg, {
        x: 20,
        y: window.innerHeight / 2,
        ease: "power2.inOut",
        duration: 0.15,
      });

      servicesExperienceTL.to(svg, {
        x: window.innerWidth - 150,
        y: window.innerHeight / 2,
        ease: "power2.inOut",
        duration: 0.15,
      });

      servicesExperienceTL.to(svg, {
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight / 2,
        ease: "power2.inOut",
        duration: 0.1,
      });

      servicesExperienceTL.to(svg, {
        x: 20,
        y: window.innerHeight / 2,
        ease: "power2.inOut",
        duration: 0.15,
      });

      const ctaTL = gsap.timeline({
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      ctaTL.to(svg, {
        x: window.innerWidth / 2 - 40,
        y: window.innerHeight / 2 - 90,
        ease: "power2.inOut",
      });
    }, svgRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <Layout
      title="Jordan In Tech | Production-Grade Software Development"
      description="We build production-grade software for businesses that can't afford downtime. Mobile apps, web platforms, backend systems—architected to handle growth, not just launch day."
      keywords="software development, mobile apps, web applications, React Native, Next.js, Django, system architecture, database design, The Gambia, Kairaba Avenue"
      ogImage="/images/og-home.jpg"
      canonicalUrl="https://jordanintech.com"
      isReady={isReady}
    >
      <div ref={svgRef} className="fixed top-0 left-0 z-1 pointer-events-none">
        <svg
          width="80"
          height="180"
          viewBox="0 0 80 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="path-dot-1"
            cx="40"
            cy="15"
            r="12"
            fill="#007BFF"
          />
          <line
            className="path-line"
            x1="40"
            y1="27"
            x2="40"
            y2="153"
            stroke="#007BFF"
            strokeWidth="1.5"
          />
          <circle
            className="path-dot-2"
            cx="40"
            cy="165"
            r="12"
            fill="#007BFF"
          />
        </svg>
      </div>

      <HeroSection ref={heroRef} isReady={isReady} />
      <AboutSection ref={aboutRef} />
      <div ref={projectsRef}>
        <ProjectsSection />
      </div>
      <div ref={servicesRef}>
        <ServicesSection />
      </div>
      <div ref={experienceRef}>
        <ExperienceSection />
      </div>
      <div ref={ctaRef}>
        <CTASection />
      </div>
    </Layout>
  );
};

export default Home;

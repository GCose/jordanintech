import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char inline-block origin-bottom">
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(linksRef.current, {
        opacity: 0,
        y: -40,
        duration: 1,
        ease: "power3.out",
      });

      tl.from(
        emailRef.current,
        {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll(".char");
        tl.from(
          chars,
          {
            opacity: 0,
            y: 100,
            rotateX: -90,
            stagger: 0.08,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.6"
        );
      }

      tl.from(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.from(
        copyrightRef.current,
        {
          opacity: 0,
          x: -40,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.from(
        phoneRef.current,
        {
          opacity: 0,
          x: 40,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      );

      gsap.to(titleRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(logoRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-background text-foreground overflow-hidden pt-10 md:pt-20 pb-10"
    >
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-foreground"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-foreground"></div>
      </div>

      <div className="relative px-4 md:px-8">
        <div className="grid grid-cols-12 gap-x-4 md:gap-x-8">
          <div className="col-span-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 md:mb-12">
            <div ref={linksRef} className="flex items-center gap-4 md:gap-8">
              <Link
                href="/work"
                className="text-xs md:text-sm font-medium tracking-wider text-foreground uppercase hover:text-brand-primary transition-colors duration-300"
              >
                Work
              </Link>
              <Link
                href="/about"
                className="text-xs md:text-sm font-medium tracking-wider text-foreground uppercase hover:text-brand-primary transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="/services"
                className="text-xs md:text-sm font-medium tracking-wider text-foreground uppercase hover:text-brand-primary transition-colors duration-300"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-xs md:text-sm font-medium tracking-wider text-foreground uppercase hover:text-brand-primary transition-colors duration-300"
              >
                Contact
              </Link>
            </div>

            <div ref={emailRef}>
              <a
                href="mailto:contact@jordanintech.com"
                className="text-xs md:text-sm font-medium tracking-wider text-foreground hover:text-brand-primary transition-colors duration-300"
              >
                contact@jordanintech.com
              </a>
            </div>
          </div>

          <div className="col-span-12 md:col-span-12 md:col-start-1 relative py-2">
            <h2
              ref={titleRef}
              className="text-[clamp(4rem,15vw,20rem)] leading-none tracking-[-0.04em] uppercase"
            >
              {splitText("JORDAN")}
              <br />
              <span className="pl-15 md:pl-50 lg:pl-150">
                {splitText("IN TECH")}
              </span>
            </h2>

            <div
              ref={logoRef}
              className="absolute top-0 left-1/2 lg:right-10 pb-170 "
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-172 lg:h-172">
                <Image
                  fill
                  src="/images/logo-2.png"
                  alt="JordanInTech Logo"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="col-span-12 flex items-center justify-between md:mt-30 pt-6 border-t border-foreground/10">
            <div ref={copyrightRef}>
              <p className="text-xs font-light text-grey-medium tracking-wide">
                © 2025 JordanInTech. All Rights Reserved
              </p>
            </div>

            <div ref={phoneRef}>
              <a
                href="tel:+2203975650"
                className="text-xs font-light text-grey-medium hover:text-brand-primary transition-colors duration-300 tracking-wide"
              >
                +220 397 5650
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

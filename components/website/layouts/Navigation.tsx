import { gsap } from "gsap";
import Link from "next/link";
import { NavigationProps } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navigation = ({
  transparent = false,
  isReady = false,
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const navItems = [
    { label: "Work", href: "/work", index: "01" },
    { label: "About", href: "/about", index: "02" },
    { label: "Contact", href: "/contact", index: "03" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.set(logoRef.current, { opacity: 0, x: -30 });
    gsap.set(itemsRef.current?.children || [], { opacity: 0, y: -20 });
    gsap.set(statusRef.current, { opacity: 0, x: 30 });
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      gsap.to(logoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.to(itemsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.to(statusRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });
    }, navRef);

    return () => ctx.revert();
  }, [isReady]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";

      const ctx = gsap.context(() => {
        gsap.from(mobileMenuRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.from(
          mobileMenuRef.current?.querySelectorAll(".mobile-nav-item") || [],
          {
            opacity: 0,
            y: 30,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.1,
          }
        );
      }, mobileMenuRef);

      return () => ctx.revert();
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || !transparent
            ? "bg-background/95 backdrop-blur-lg border-b border-grey-medium/10"
            : "bg-transparent"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="px-4 py-2">
          <div className="flex items-center justify-between">
            <Link
              ref={logoRef}
              href="/"
              className="group relative flex items-center gap-3"
              onClick={closeMobileMenu}
            >
              <div className="flex flex-col leading-none">
                <span className="text-[clamp(1.125rem,1.5vw,3rem)] text-brand-primary">
                  JIT
                </span>
              </div>
            </Link>

            <ul ref={itemsRef} className="hidden md:flex items-center gap-12">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      className={`group flex items-center gap-2 text-[clamp(1.1rem,4vw,1.3rem)] font-light transition-colors duration-300 ${
                        isActive
                          ? "text-brand-primary"
                          : "text-foreground hover:text-brand-primary"
                      }`}
                    >
                      <span className="text-[0.625rem] font-bold text-grey-medium transition-colors duration-300 group-hover:text-brand-primary">
                        {item.index}
                      </span>
                      <span className="relative">
                        {item.label}
                        <span
                          className={`absolute -bottom-1 left-0 h-px bg-brand-primary transition-all duration-300 ${
                            isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div ref={statusRef} className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-xs font-light text-grey-medium">
                  Available
                </span>
              </div>
              <div className="w-px h-5 bg-grey-medium/20" />
              <span className="text-xs font-light text-grey-medium">
                Banjul, GM
              </span>
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative w-8 h-5 flex flex-col justify-between"
              aria-label="Toggle menu"
            >
              <span
                className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-2/3 h-0.5 bg-foreground transition-all duration-300 ml-auto ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-40 bg-background md:hidden"
        >
          <div className="flex flex-col items-center justify-center h-full px-8 space-y-8">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="mobile-nav-item group flex items-center gap-3"
                >
                  <span className="text-xs font-light text-grey-medium transition-colors duration-300 group-hover:text-brand-primary">
                    {item.index}
                  </span>
                  <span
                    className={`text-[clamp(2rem,8vw,4rem)] font-light transition-colors duration-300 ${
                      isActive
                        ? "text-brand-primary"
                        : "text-foreground group-hover:text-brand-primary"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}

            <div className="mobile-nav-item pt-8 border-t border-foreground/10 w-full max-w-xs">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                <span className="text-sm font-light text-grey-medium">
                  Available for Projects
                </span>
              </div>
              <p className="text-center text-sm font-light text-grey-medium">
                Kairaba Avenue, Banjul • The Gambia
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;

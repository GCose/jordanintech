import { gsap } from "gsap";
import Link from "next/link";
import { NavigationProps } from "@/types";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navigation = ({ transparent = false }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const itemsRef = useRef<HTMLUListElement>(null);
  const pathname = usePathname();

  const navItems = [
    { label: "Work", href: "/work", index: "01" },
    { label: "About", href: "/about", index: "02" },
    { label: "Contact", href: "/contact", index: "03" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(itemsRef.current?.children || [], {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || !transparent
          ? "bg-background/95 backdrop-blur-lg border-b border-grey-medium/10"
          : "bg-transparent"
      }`}
    >
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <Link
            ref={logoRef}
            href="/"
            className="group relative flex items-center gap-3"
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
                    className={`group flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${
                      isActive
                        ? "text-brand-primary"
                        : "text-foreground hover:text-brand-primary"
                    }`}
                  >
                    <span className="text-[0.625rem] font-light text-grey-medium transition-colors duration-300 group-hover:text-brand-primary">
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

          <div className="hidden md:flex items-center gap-3">
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

          <button className="md:hidden relative w-8 h-5 flex flex-col justify-between">
            <span className="w-full h-0.5 bg-foreground transition-all duration-300" />
            <span className="w-2/3 h-0.5 bg-foreground transition-all duration-300 ml-auto" />
            <span className="w-full h-0.5 bg-foreground transition-all duration-300" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

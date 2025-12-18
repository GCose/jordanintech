import Link from "next/link";
import Image from "next/image";
import { NavigationProps } from "@/types";

const Navigation = ({ transparent = false }: NavigationProps) => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 p-[clamp(1rem,2vw,2rem)_clamp(1.5rem,5vw,4rem)] ${
        transparent ? "bg-transparent" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex items-center justify-between max-w-[clamp(1200px,90vw,1400px)]">
        <Link
          href="/"
          className="relative flex items-center gap-2 transition-transform hover:scale-105"
        >
          <Image
            src="/images/logo.jpg"
            alt="JordanInTech Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="viaoda-libre-regular text-[clamp(1.25rem,2vw,1.5rem)] text-brand-primary">
            JIT
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative group font-['Satoshi'] text-[clamp(0.875rem,1vw,1rem)] font-medium text-foreground transition-colors duration-300"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col gap-1.5 w-8 h-6 justify-center items-center"
          aria-label="Toggle menu"
        >
          <span className="w-full h-0.5 bg-foreground transition-all" />
          <span className="w-full h-0.5 bg-foreground transition-all" />
          <span className="w-full h-0.5 bg-foreground transition-all" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation;

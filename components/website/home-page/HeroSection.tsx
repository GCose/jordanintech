import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center bg-background overflow-hidden min-h-dvh pt-[clamp(6rem,15vh,10rem)] px-[clamp(1.5rem,5vw,4rem)] pb-[clamp(4rem,10vh,8rem)]">
      <div className="relative z-10 mx-auto text-center max-w-[clamp(900px,90vw,1200px)]">
        <div className="mb-12 flex justify-center">
          <div className="relative w-[clamp(100px,20vw,150px)] h-[clamp(100px,20vw,150px)]">
            <Image
              src="/images/logo.jpg"
              alt="JordanInTech Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <h1 className="viaoda-libre-regular mb-8 text-[clamp(3rem,10rem,9rem)] font-normal text-foreground tracking-[-0.03em] leading-[0.9]">
          JORDAN IN TECH
        </h1>

        <p className="mb-16 font-['Satoshi'] text-[clamp(1.25rem,2.5vw+0.5rem,1.75rem)] font-normal text-grey-medium leading-[1.6] max-w-[700px] mx-auto">
          Mobile-first software solutions. From concept to deployment.
        </p>

        <Link
          href="/work"
          className="inline-flex items-center justify-center transition-all duration-300 hover:scale-105 font-['Satoshi'] text-[clamp(1rem,1.5vw+0.25rem,1.125rem)] font-medium py-[clamp(1rem,2.5vh,1.25rem)] px-[clamp(2.5rem,6vw,3.5rem)] bg-brand-primary text-white rounded-full no-underline border-2 border-transparent"
        >
          View Our Work
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;

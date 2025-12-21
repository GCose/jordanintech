import { HomeProps } from "@/types";
import Layout from "@/components/website/layouts/Layout";
import HeroSection from "@/components/website/home-page/HeroSection";
import AboutSection from "@/components/website/home-page/AboutSection";
import ProjectsSection from "@/components/website/home-page/ProjectsSection";
import ServicesSection from "@/components/website/home-page/ServicesSection";
import ExperienceSection from "@/components/website/home-page/ExperienceSection";

const Home = ({ isReady = false }: HomeProps) => {
  return (
    <Layout
      title="JordanInTech | Mobile-First Software Solutions"
      description="We build robust mobile and web applications with expertise in system architecture and database design. From concept to deployment, we craft scalable solutions that work."
      keywords="software development, mobile apps, web applications, React Native, Next.js, Django, system architecture, database design, The Gambia, Kairaba Avenue"
      ogImage="/images/og-home.jpg"
      canonicalUrl="https://jordanintech.com"
      isReady={isReady}
    >
      <HeroSection isReady={isReady} />
      <AboutSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
    </Layout>
  );
};

export default Home;

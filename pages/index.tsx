import Layout from "@/components/website/layouts/Layout";
import HeroSection from "@/components/website/home-page/HeroSection";

const Home = () => {
  return (
    <Layout
      title="JordanInTech | Mobile-First Software Solutions"
      description="We build robust mobile and web applications with expertise in system architecture and database design. From concept to deployment, we craft scalable solutions that work."
      keywords="software development, mobile apps, web applications, React Native, Next.js, Django, system architecture, database design, The Gambia, Kairaba Avenue"
      ogImage="/images/og-home.jpg"
      canonicalUrl="https://jordanintech.com"
    >
      <HeroSection />
    </Layout>
  );
};

export default Home;

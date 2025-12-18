import Head from "next/head";
import { LayoutProps } from "@/types";
import Navigation from "@/components/website/layouts/Navigation";

const Layout = ({
  children,
  title,
  description,
  keywords = "software development, mobile apps, web development, React Native, Next.js, Django, system architecture, database design, The Gambia",
  ogImage = "/images/og-image.jpg",
  canonicalUrl = "https://jordanintech.com",
}: LayoutProps) => {
  const siteName = "JordanInTech";
  const fullTitle = `${title} | ${siteName}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JordanInTech",
    url: canonicalUrl,
    logo: `${canonicalUrl}/images/logo.jpg`,
    description: description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kairaba Avenue",
      addressLocality: "Banjul",
      addressCountry: "GM",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+220-710-3716",
      email: "jordannwabuike@gmail.com",
      contactType: "Business",
    },
    sameAs: [
      "https://github.com/jordannwabuike",
      "https://linkedin.com/in/jordannwabuike",
    ],
  };

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="relative min-h-screen bg-background">
        <Navigation />
        <main className="relative">{children}</main>
      </div>
    </>
  );
};

export default Layout;

import { ReactNode } from 'react';

export interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
    twitterCard?: string;
    noindex?: boolean;
}

export interface StructuredDataProps {
    type: 'Organization' | 'Person' | 'WebSite' | 'Service';
    name: string;
    url: string;
    logo?: string;
    description?: string;
    address?: {
        streetAddress: string;
        addressLocality: string;
        addressCountry: string;
    };
    contactPoint?: {
        telephone: string;
        email: string;
    };
    sameAs?: string[];
}

export interface LayoutProps {
    children: ReactNode;
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
    canonicalUrl?: string;
    isReady?: boolean;
}

export interface NavigationProps {
    transparent?: boolean;
    isReady?: boolean;
}

export interface LoadingScreenProps {
    onComplete: () => void;
}

export interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export interface HeroSectionProps {
    isReady?: boolean;
}

export interface HomeProps {
    isReady?: boolean;
}
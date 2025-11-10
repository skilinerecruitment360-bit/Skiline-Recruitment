import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  keywords?: string;
}

export function usePageMeta({
  title,
  description,
  ogTitle,
  ogDescription,
  keywords,
}: PageMetaProps) {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', description);
      document.head.appendChild(metaDescription);
    }

    // Set or update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      } else {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        metaKeywords.setAttribute('content', keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Set or update Open Graph title
    let ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', ogTitle || title);
    } else {
      ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      ogTitleMeta.setAttribute('content', ogTitle || title);
      document.head.appendChild(ogTitleMeta);
    }

    // Set or update Open Graph description
    let ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', ogDescription || description);
    } else {
      ogDescMeta = document.createElement('meta');
      ogDescMeta.setAttribute('property', 'og:description');
      ogDescMeta.setAttribute('content', ogDescription || description);
      document.head.appendChild(ogDescMeta);
    }

    // Set or update Twitter card title
    let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', ogTitle || title);
    } else {
      twitterTitleMeta = document.createElement('meta');
      twitterTitleMeta.setAttribute('name', 'twitter:title');
      twitterTitleMeta.setAttribute('content', ogTitle || title);
      document.head.appendChild(twitterTitleMeta);
    }

    // Set or update Twitter card description
    let twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescMeta) {
      twitterDescMeta.setAttribute('content', ogDescription || description);
    } else {
      twitterDescMeta = document.createElement('meta');
      twitterDescMeta.setAttribute('name', 'twitter:description');
      twitterDescMeta.setAttribute('content', ogDescription || description);
      document.head.appendChild(twitterDescMeta);
    }
  }, [title, description, ogTitle, ogDescription, keywords]);
}

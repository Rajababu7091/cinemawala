import { useEffect } from 'react';

export default function SEO({ title, description, image, url }) {
  useEffect(() => {
    const siteTitle = 'CinemaWala – Discover Movies & Where to Watch';
    const finalTitle = title ? `${title} | CinemaWala` : siteTitle;
    document.title = finalTitle;

    const finalDesc = description || 'Discover movies, memorable moments and find official platforms to watch them. Cinema ka asli adda 🍿';

    // Update meta tags
    const metaTags = {
      'meta[name="description"]': finalDesc,
      'meta[property="og:title"]': finalTitle,
      'meta[property="og:description"]': finalDesc,
      'meta[property="twitter:title"]': finalTitle,
      'meta[property="twitter:description"]': finalDesc,
    };

    if (image) {
      metaTags['meta[property="og:image"]'] = image;
      metaTags['meta[property="twitter:image"]'] = image;
    }

    if (url) {
      metaTags['meta[property="og:url"]'] = url;
    }

    Object.entries(metaTags).forEach(([selector, content]) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    });

    // Scroll to top smoothly on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [title, description, image, url]);

  return null;
}

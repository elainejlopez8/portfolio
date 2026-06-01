'use client';

import logo from '@/assets/logo.png';
import { useEffect } from 'react';

export default function SetAdminLogo() {
  useEffect(() => {
    try {
      // set favicon to match site logo
      try {
        const existing = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
        if (existing) {
          existing.href = logo.src;
        } else {
          const link = document.createElement('link');
          link.rel = 'icon';
          link.href = logo.src;
          document.head.appendChild(link);
        }
      } catch (e) {
        /* ignore */
      }

      const navHeader = document.querySelector('.template-default .nav__header');
      if (!navHeader) return;

      // Prefer an <img> inside nav__header if present
      const img = navHeader.querySelector('img');
      if (img) {
        (img as HTMLImageElement).src = logo.src;
        (img as HTMLImageElement).alt = 'Portfolio Site Logo';
        (img as HTMLImageElement).style.width = '56px';
        (img as HTMLImageElement).style.height = 'auto';
        return;
      }

      // Otherwise inject an img element
      const newImg = document.createElement('img');
      newImg.src = logo.src;
      newImg.alt = 'Portfolio Site Logo';
      newImg.style.width = '56px';
      newImg.style.height = 'auto';
      newImg.style.display = 'block';
      navHeader.prepend(newImg);
    } catch (e) {
      // ignore
    }
  }, []);

  return null;
}





'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToLocale() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language;
    // Vérification que la langue est soit 'en' soit 'fr'
    const detectedLang = browserLang.startsWith('en') ? 'en' : 'fr';
    if (['en', 'fr'].includes(detectedLang)) {
      router.replace(`/${detectedLang}`);
    } else {
      // Par défaut en français
      router.replace('/fr');
    }
  }, [router]);

  return null;
}

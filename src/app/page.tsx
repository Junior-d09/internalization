'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToLocale() {
  const router = useRouter();

  useEffect(() => {
    // Vérifier d'abord s'il y a une préférence dans le localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
      // Utiliser la langue sauvegardée si elle existe
      router.replace(`/${savedLang}`);
    } else {
      // Sinon, récupérer la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      
      // Rediriger vers la langue du navigateur si elle est supportée
      if (browserLang === 'en' || browserLang === 'fr') {
        router.replace(`/${browserLang}`);
      } else {
        // Sinon, utiliser le français par défaut
        router.replace('/fr');
      }
    }
  }, [router]);

  return null;
}
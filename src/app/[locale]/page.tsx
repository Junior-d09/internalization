'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(locale);

  // Styles en ligne avec typage correct pour React.CSSProperties
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      position: 'relative',
      padding: '1rem'
    },
    langSelector: {
      position: 'absolute',
      top: '1.5rem',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      zIndex: 10
    },
    select: {
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      cursor: 'pointer'
    },
    contentBox: {
      width: '100%',
      maxWidth: '48rem',
      margin: '0 auto',
      paddingTop: '4rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    title: {
      fontSize: '2.25rem',
      fontWeight: '700',
      color: '#4f46e5',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center'
    },
    globeIcon: {
      marginLeft: '0.25rem'
    },
    description: {
      fontSize: '1.125rem',
      color: '#374151',
      marginBottom: '2.5rem',
      textAlign: 'center', 
      maxWidth: '36rem',
      lineHeight: '1.75'
    },
    imageContainer: {
      padding: '0.25rem',
      backgroundColor: 'white',
      borderRadius: '9999px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      marginBottom: '2rem'
    },
    footer: {
      color: '#374151',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center'
    },
    globeIconSupport: {
      marginLeft: '0.25rem'
    },
    pageFooter: {
      width: '100vw',
      backgroundColor: '#897C6C', 
      color: 'white',
      padding: '1rem',
      marginTop: '2rem',
      textAlign: 'center' ,
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: '2rem'
    }
  };

  useEffect(() => {
    // Vérifier d'abord s'il y a une préférence dans le localStorage
    const savedLang = localStorage.getItem('preferredLanguage');
    
    if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
      // Si une préférence existe dans le localStorage et est différente de la langue actuelle
      if (savedLang !== locale) {
        router.replace(`/${savedLang}`);
      }
      setSelectedLang(savedLang);
    } else {
      // Si pas de préférence sauvegardée, utiliser la langue du navigateur
      const browserLang = navigator.language.split('-')[0];
      
      // Si la langue du navigateur est supportée et différente de la locale actuelle
      if ((browserLang === 'fr' || browserLang === 'en') && browserLang !== locale) {
        router.replace(`/${browserLang}`);
      }
      
      setSelectedLang(locale);
    }
  }, [locale, router]);

  const handleChangeLang = (newLang: string) => {
    if (newLang === locale || (newLang !== 'fr' && newLang !== 'en')) return;
    
    // Sauvegarder la préférence de langue dans le localStorage
    localStorage.setItem('preferredLanguage', newLang);
    
    // Rediriger vers la nouvelle langue
    router.replace(`/${newLang}`);
    
    // Mettre à jour le state
    setSelectedLang(newLang);
  };

  return (
    <div style={styles.container}>
      {/* Sélecteur de langue en haut et centré */}
      <div style={styles.langSelector}>
        <select
          value={selectedLang}
          onChange={(e) => handleChangeLang(e.target.value)}
          style={styles.select}
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇺🇸 English</option>
        </select>
      </div>

      {/* Contenu principal centré */}
      <div style={styles.contentBox}>
        <h1 style={styles.title}>
          {t('title')} 
        </h1>

        <p style={styles.description}>
          {t('description')}
        </p>

        <div style={styles.imageContainer}>
          <Image
            src="/web.jpg"
            alt="Image internationale"
            width={180}
            height={180}
            style={{borderRadius: '9999px'}}
          />
        </div>

        <p style={styles.footer}>
          {t('support')} 
        </p>
        
      </div>
      
      {/* Footer ajouté en dehors du contentBox pour prendre toute la largeur */}
      <div style={styles.pageFooter}>
        <div style={styles.footerContent}>
          <p>{t('email')}: christ@dfs.com</p>
          <p>{t('contact')}: 61142613</p>
          <p>{t('realise')}</p>
        </div>
      </div>
      </div>
    
  );
}
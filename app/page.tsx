'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Page = () => {
  const [lang, setLang] = useState<'fr' | 'en'>('fr');

  useEffect(() => {
    const browserLang = navigator.language;
    if (browserLang.startsWith('en')) {
      setLang('en');
    } else {
      setLang('fr');
    }
  }, []);

  const content = {
    fr: {
      title: "Bienvenue sur la page d'internationalisation 🌍",
      description:
        "Cette page permet d’illustrer la mise en place de contenus accessibles dans plusieurs langues, pour une meilleure expérience utilisateur.",
      footer: "Traduisez votre interface pour toucher un public mondial 🌐",
    },
    en: {
      title: 'Welcome to the Internationalization Page 🌍',
      description:
        'This page illustrates how to display content in multiple languages for a better user experience.',
      footer: 'Translate your interface to reach a global audience 🌐',
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-6 space-y-6">
      {/* Language Selector */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as 'fr' | 'en')}
        className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="fr">🇫🇷 Français</option>
        <option value="en">🇬🇧 English</option>
      </select>

      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-indigo-700 text-center"
      >
        {content[lang].title}
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg text-gray-600 text-center max-w-md"
      >
        {content[lang].description}
      </motion.p>

      {/* Card with Image and Text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="rounded-lg shadow-lg bg-white p-4 flex flex-col items-center space-y-4"
      >
        <Image
          src="/image 4.png"
          alt="Image internationale"
          width={150}
          height={150}
          className="rounded"
        />
        <p className="text-gray-700 font-medium text-center">
          {content[lang].footer}
        </p>
      </motion.div>
    </div>
  );
};

export default Page;

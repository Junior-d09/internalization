'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangeLang = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-400 to-pink-300 overflow-hidden">
      {/* Blurred light spot */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[150px] z-0" />

      {/* Content container */}
      <div
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl backdrop-blur-md bg-[#F6FDFA] shadow-xl border border-white/20 flex flex-col items-center justify-center space-y-6"
      >
        {/* Language Selector */}
        <select
          value={locale}
          onChange={(e) => handleChangeLang(e.target.value)}
          className="px-4 py-2 rounded-md bg-[#F2F7FC] border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto"
        >
          <option value="fr">🇫🇷 Français</option>
          <option value="en">🇬🇧 English</option>
        </select>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-white text-center"
        >
          {t('title')}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-base md:text-lg text-white/90 text-center"
        >
          {t('description')}
        </motion.p>

        {/* Image + Footer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="bg-white rounded-xl p-4 flex flex-col items-center space-y-4 shadow-lg"
        >
          <Image
            src="/image 4.png"
            alt="Image internationale"
            width={120}
            height={120}
            className="rounded-full mx-auto" // Centrer l'image
          />
          <p className="text-gray-700 font-medium text-center">{t('footer')}</p>
        </motion.div>
      </div>
    </div>
  );
}

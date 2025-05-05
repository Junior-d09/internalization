
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  // Détecte automatiquement la langue préférée de l'utilisateur
  localeDetection: true
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};
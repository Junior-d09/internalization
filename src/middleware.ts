import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const middleware = (request: NextRequest) => {
  // Toujours vérifier la langue du navigateur à chaque requête
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  let browserLang = defaultLocale;
  
  // Extraction du code langue principal
  if (acceptLanguage) {
    const match = acceptLanguage.match(/^([a-zA-Z]{2})/);
    if (match) {
      const lang = match[1].toLowerCase();
      if (locales.includes(lang as typeof locales[number])) {
        browserLang = lang;
      }
    }
  }
  
  // Création du middleware sans cookie persistant
  return createMiddleware({
    locales,
    defaultLocale: browserLang as typeof locales[number],
    localePrefix: 'never',
    // Activer la détection automatique
    localeDetection: true
  })(request);
};

export default middleware;

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/']
};
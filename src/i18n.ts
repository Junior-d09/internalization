// i18n.ts
export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'fr' as const;

type Locale = (typeof locales)[number];

export default async function getMessages({
  requestLocale,
}: {
  requestLocale: string | undefined;
}) {
  // Gestion de locale undefined - utilisez defaultLocale dans ce cas
  const locale = requestLocale && locales.includes(requestLocale as Locale) 
    ? requestLocale as Locale 
    : defaultLocale;

  // Utilisation de import dynamique pour charger le bon fichier de traduction
  try {
    // Assurez-vous que le chemin est correct vers vos fichiers de traduction
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch (error) {
    console.error(`Erreur lors du chargement des messages pour la locale ${locale}:`, error);
    
    // Fallback sur la locale par défaut si le fichier de la locale demandée n'est pas trouvé
    if (locale !== defaultLocale) {
      console.warn(`Utilisation de la locale par défaut (${defaultLocale}) comme fallback`);
      const defaultMessages = (await import(`../messages/${defaultLocale}.json`)).default;
      return { locale: defaultLocale, messages: defaultMessages };
    }
    
    // Si même le fichier par défaut n'est pas trouvé, retourner un objet vide
    return { locale: defaultLocale, messages: {} };
  }
}
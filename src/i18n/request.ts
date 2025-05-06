import getMessages from "../i18n";
import { locales, defaultLocale } from "../i18n";

export default async function getRequestConfig({ locale }: { locale?: string }) {
  // Ajout d'une vérification pour s'assurer que locale n'est pas undefined
  const requestLocale = locale || defaultLocale;
  
  const messages = await getMessages({ requestLocale });

  return {
    messages: messages.messages,
    locale: messages.locale,
    defaultLocale,
    locales,
  };
}


import React, { createContext, useContext, useState, ReactNode } from "react";
import { I18n } from "i18n-js";
import { SpinnerView } from "@/components/SpinnerView/SpinnerView";
import { defaultLocale } from "@lawallet/react";
import en from "./locales/en/globals.json";
import es from "./locales/es/globals.json";
import { AvailableLanguages } from "@lawallet/react/types";

interface TranslationsContext {
  i18n: I18n;
  lng: AvailableLanguages;
  changeLanguage: (lang: AvailableLanguages) => void;
}
export const I18nContext = createContext<TranslationsContext>(
  {} as TranslationsContext
);

const i18n = new I18n(
  {
    en,
    es,
  },
  { locale: defaultLocale, defaultLocale }
);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<AvailableLanguages>(defaultLocale);

  const changeLanguage = (lang: AvailableLanguages) => {
    i18n.locale = lang;
    setLocale(lang);
  };

  return (
    <I18nContext.Provider value={{ i18n, lng: locale, changeLanguage }}>
      {!i18n.locale ? <SpinnerView /> : children}
    </I18nContext.Provider>
  );
};

export const useTranslations = () => useContext(I18nContext);

/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'preact/hooks';
import { get as getData, set as setData } from 'idb-keyval';
import { IntlProvider } from 'preact-i18n';
import { createContext } from 'preact';

const Language = createContext(null);

export function LanguageProvider({ children }) {
  const [persistedLanguage, setPersistedLanguage] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(persistedLanguage);
  const [definition, setDefinition] = useState({}); // 初始化为空

  const setLanguage = (lang) => {
    setPersistedLanguage(lang);
    setData('language', lang);
    setCurrentLanguage(lang);

    // 根据语言加载对应的国际化文件
    import(`../lang/${lang}.json`)
      .then((langDefinition) => {
        setDefinition(langDefinition);
      })
      .catch((error) => {
        console.error(`Error loading language file for ${lang}:`, error);
      });
  };

  useEffect(() => {
    async function loadLanguage() {
      const language = await getData('language');
      setLanguage(language || 'en'); // 默认语言为 'en'
    }

    loadLanguage();
  }, []);

  return (
    <IntlProvider definition={definition}>
      <Language.Provider value={{ currentLanguage, setLanguage }}>{children}</Language.Provider>
    </IntlProvider>
  );
}

export function useLanguage() {
  return useContext(Language);
}

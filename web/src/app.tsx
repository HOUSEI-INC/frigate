/* eslint-disable no-console */
import * as Routes from './routes';
import { h } from 'preact';
import { useState } from 'preact/hooks';
// import { useState, useEffect } from 'react';
import ActivityIndicator from './components/ActivityIndicator';
import AsyncRoute from 'preact-async-route';
import AppBar from './AppBar';
import Cameras from './routes/Cameras';
import { Router } from 'preact-router';
import Sidebar from './Sidebar';
import { DarkModeProvider, DrawerProvider } from './context';
import useSWR from 'swr';
import defaultDefinition from './lang/ja.json';
import { IntlProvider } from 'preact-i18n';

export default function App() {
  const { data: config } = useSWR('config');
  const cameraComponent = config && config.ui?.use_experimental ? Routes.getCameraV2 : Routes.getCamera;

  const [definition, setDefinition] = useState(defaultDefinition);

  const changeLanguage = (lang: string) => {
    import(`./lang/${lang}.json`)
      .then((langDefinition) => {
        setDefinition(langDefinition);
      })
      .catch((error) => {
        console.error(`Error loading language file for ${lang}:`, error);
      });
    console.log({ ...definition });
  };

  return (
    <IntlProvider definition={{ ...definition }}>
      {/* <DarkModeProvider> */}
        <DrawerProvider>
          <div data-testid="app" className="w-full">
            <AppBar changeLanguage={changeLanguage} />
            {!config ? (
              <div className="flex flex-grow-1 min-h-screen justify-center items-center">
                <ActivityIndicator />
              </div>
            ) : (
              <div className="flex flex-row min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <Sidebar />
                <div className="w-full flex-auto mt-16 min-w-0">
                  <Router>
                    <AsyncRoute path="/cameras/:camera/editor" getComponent={Routes.getCameraMap} />
                    <AsyncRoute path="/cameras/:camera" getComponent={cameraComponent} />
                    <AsyncRoute path="/birdseye" getComponent={Routes.getBirdseye} />
                    <AsyncRoute path="/events" getComponent={Routes.getEvents} />
                    <AsyncRoute path="/exports" getComponent={Routes.getExports} />
                    <AsyncRoute
                      path="/recording/:camera/:date?/:hour?/:minute?/:second?"
                      getComponent={Routes.getRecording}
                    />
                    <AsyncRoute path="/storage" getComponent={Routes.getStorage} />
                    <AsyncRoute path="/system" getComponent={Routes.getSystem} />
                    {/* <AsyncRoute path="/config" getComponent={Routes.getConfig} /> */}
                    <AsyncRoute path="/common_config" getComponent={Routes.getCommonConfig} />
                    <AsyncRoute path="/logs" getComponent={Routes.getLogs} />
                    <AsyncRoute path="/styleguide" getComponent={Routes.getStyleGuide} />
                    <Cameras default path="/" />
                  </Router>
                </div>
              </div>
            )}
          </div>
        </DrawerProvider>
      {/* </DarkModeProvider> */}
    </IntlProvider>
  );
}

/* eslint-disable no-console */
import { render, Component } from 'preact';
import App from './app';
import { ApiProvider } from './api';
import './index.css';
import defaultDefinition from './lang/en.json';
import { IntlProvider } from 'preact-i18n';

class MainApp extends Component {
  state = {
    definition: defaultDefinition,
  };

  changeLanguage = (lang: string) => {
    console.log(lang);
    import(`./lang/${lang}.json`)
      .then((definition) => {
        this.setState({ definition });
        console.log(definition);
      })
      .catch((error) => {
        console.error(`Error loading language file for ${lang}:`, error);
      });
  };

  render() {
    return (
      <ApiProvider>
        <IntlProvider definition={this.state.definition}>
          <App changeLanguage={this.changeLanguage} />
        </IntlProvider>
      </ApiProvider>
    );
  }
}

render(<MainApp />, document.getElementById('app') as HTMLElement);

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Components
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';
import '@refinitiv-ui/elements/header';
import '@refinitiv-ui/elements/tab-bar';
import '@refinitiv-ui/elements/tab';
import '@refinitiv-ui/elements/interactive-chart';
import '@refinitiv-ui/elements/radio-button';
import '@refinitiv-ui/elements/datetime-picker';
import '@refinitiv-ui/elements/email-field';
import '@refinitiv-ui/elements/overlay-menu';
import '@refinitiv-ui/elements/dialog';
import '@refinitiv-ui/elements/toggle';
import '@refinitiv-ui/elements/checkbox';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  // eslint-disable-next-line no-console
  .catch(err => console.error(err));

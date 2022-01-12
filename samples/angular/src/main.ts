import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Components
import '@refinitiv-ui/elements/lib/button';
import '@refinitiv-ui/elements/lib/text-field';
import '@refinitiv-ui/elements/lib/password-field';
import '@refinitiv-ui/elements/lib/header';
import '@refinitiv-ui/elements/lib/tab-bar';
import '@refinitiv-ui/elements/lib/tab';
import '@refinitiv-ui/elements/lib/interactive-chart';
import '@refinitiv-ui/elements/lib/radio-button';
import '@refinitiv-ui/elements/lib/datetime-picker';
import '@refinitiv-ui/elements/lib/email-field';
import '@refinitiv-ui/elements/lib/overlay-menu';
import '@refinitiv-ui/elements/lib/dialog';
import '@refinitiv-ui/elements/lib/toggle';
import '@refinitiv-ui/elements/lib/checkbox';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

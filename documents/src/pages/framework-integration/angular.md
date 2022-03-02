<!--
type: page
title: Angular
location: ./integrations/angular
layout: default
-->

<div style="float:right">
  <a href="https://angular.io/" target="_blank">angular.io</a>
</div>

# Angular Guide
@>This guideline uses Angular's seed project and Angular CLI 13.1.2.

Install Angular CLI.

```sh
npm install -g @angular/cli
```

### Initialize your project
Create new Angular application using the `ng new` command.

```sh
ng new my-app && cd my-app
```

Once your app has been created you should be able to serve your application.

```sh
npm start
```

### Using web components in Angular
First off we need to import the `CUSTOM_ELEMENTS_SCHEMA` from `@angular/core` and inject it into the `schemas` property of our AppModule definition. This property will allow non-Angular elements named with dash case like custom elements to be used in Angular's template.

Make the following changes to `./src/app/app.module.ts`.

```diff
-import { NgModule } from '@angular/core';
+import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';

 import { AppComponent } from './app.component';

 @NgModule({
   declarations: [
     AppComponent
   ],
   imports: [
     BrowserModule
   ],
   providers: [],
-  bootstrap: [AppComponent]
+  bootstrap: [AppComponent],
+  schemas: [CUSTOM_ELEMENTS_SCHEMA]
 })

 export class AppModule { }
```

### Install EF elements
EF elements need their class definition and theme to be installed before they can be used.

Install elements and themes.

```sh
npm install @refinitiv-ui/elements
npm install @refinitiv-ui/halo-theme
```

Import the elements and themes into your app, `src/app/app.component.ts`

```javascript
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/loader/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

If you're using Angular 13++ or using Webpack 5, you can import module by using a shorter path.

```javascript
import '@refinitiv-ui/elements/loader';
import '@refinitiv-ui/elements/button';
import '@refinitiv-ui/elements/panel';
import '@refinitiv-ui/elements/text-field';
import '@refinitiv-ui/elements/password-field';

import '@refinitiv-ui/halo-theme/dark/imports/native-elements';
import '@refinitiv-ui/elements/loader/themes/halo/dark';
import '@refinitiv-ui/elements/button/themes/halo/dark';
import '@refinitiv-ui/elements/panel/themes/halo/dark';
import '@refinitiv-ui/elements/text-field/themes/halo/dark';
import '@refinitiv-ui/elements/password-field/themes/halo/dark';
```

At this stage EF elements should be ready to use!. You can use them like any other native HTML elements.

### Create a login page

We need to use `ngDefaultControl` directive so Angular's Forms can be used with custom elements such as `ef-text-field`.

Import `ReactiveFormsModule` in `src/app/app.module.ts`.

```diff
 import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 import { BrowserModule } from '@angular/platform-browser';
+import { ReactiveFormsModule } from '@angular/forms';

...
...
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
+   ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
```

Define the view template by replacing the contents in `src/app/app.component.html` with the following.

```html
<ef-panel id="login-page" [formGroup]="loginForm" spacing>
  <ef-loader *ngIf="loading"></ef-loader>

  <ng-container *ngIf="!loading">
    <h1>{{ title }}</h1>
    <ef-text-field
      formControlName="username"
      placeholder="Username"
      ngDefaultControl
    >
    </ef-text-field>
    <ef-password-field
      formControlName="password"
      placeholder="Password"
      ngDefaultControl
    >
    </ef-password-field>
    <div id="button-group">
      <ef-button (click)="login()"
        [disabled]="!loginForm.valid"
      >Login</ef-button >
      <ef-button>Cancel</ef-button>
    </div>
  </ng-container>
</ef-panel>
```

Add styling into `src/app/app.component.css`

```css
#login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 200px;
  margin: 40px auto;
}

#button-group {
  margin: 10px 0;
}
```

Now, we need to add logic to make login page works by updating `src/app/app.component.ts`.

```javascript
import { Component } from '@angular/core';
import { timer } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';

...
...
...

const DEFAULT_TITLE = 'Hello!';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loading: boolean = false;
  public title: string = DEFAULT_TITLE;
  public loginForm = this.formbuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formbuilder: FormBuilder) { }

  get username(): AbstractControl {
    return this.loginForm.value['username'];
  }

  get password(): AbstractControl {
    return this.loginForm.value['password'];
  }

  login(): void {
    this.loading = true;

    timer(2000).pipe(
      finalize(() => { this.loading = false }),
    ).subscribe(() => {
      this.title = 'Done!';
      this.loginForm.reset();
    })
  }
}
```

Serve your application.

```sh
npm start
```

### Using EF with Angular's form

Using third-party form control elements with Angular's forms API requires [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor) which acts as a bridge that synchronizes the data between one and another. `ControlValueAccessor` already covers all the standard native `input` tags, but not for custom tags like EF components.

However, for element such as `ef-text-field`, `ef-search-field` and `ef-password-field>` that has similar behavior to native `input[type=text]`, you can use [DefaultValueAccessor](https://angular.io/api/forms/DefaultValueAccessor) directive (`ngDefaultControl`).

```html
<ef-text-field formControlName="..." ngDefaultControl>
</ef-text-field>
```

For elements which need to have its own `ControlValueAccessor` implementation in order to work correctly. Implementation varies depending on element's API and use cases.

```ts
@Directive({
  selector: '[ef-number-field]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFieldValueAccessor),
      multi: true
    }
  ]
})
export class NumberFieldValueAccessor implements ControlValueAccessor {
  onChange = () => {};
  onTouched = () => {};

  writeValue (value: string): void { ... }
  registerOnChange (fn: any): void { ... }
  registerOnTouched (fn: any): void { ... }

  setDisabledState (isDisabled: boolean): void { ... }

  // listens to value-changed event from number-field, then update the value
  @HostListener('value-changed', ['$event.detail'])
  listenForValueChange ({ value }) {
    this.value = value;
  }
```

### Additional type definition

Some EF elements supports i18N features. It uses [FormatJS](https://formatjs.io/) library and some of thier modules are using features that available in new Javascript version. If you see any errors related to @formatjs during project compilation, you may need to add `esnext.intl` into `lib` section in `tsconfig.json` file.

```diff
"lib": [
  "es2018",
+ "esnext.intl"
  "dom"
]
```

::footer::

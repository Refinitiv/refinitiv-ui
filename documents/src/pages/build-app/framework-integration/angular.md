<!--
type: page
title: Angular
location: ./tutorials/angular
layout: default
-->

<div style="float:right">
  <a href="https://angular.io/" target="_blank">angular.io</a>
</div>

# Angular Guide

## Try online demo
A playground project that uses Element Framework with Angular. Here is a [link](https://codesandbox.io/p/devbox/angular-16-forms-ef-v7-gghflk).

## Using web components in Angular

@>This guideline uses project generated from [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

Import `CUSTOM_ELEMENTS_SCHEMA` from `@angular/core` and inject it into the `schemas` property of our AppModule definition. This property will allow non-Angular elements named with dash case like web components to be used in Angular's template.

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

## Using EF with Angular's form

To utilise full capabilities of Angular's powerful [ReactiveForms](https://angular.io/guide/reactive-forms) with web components, we need to use [ControlValueAccessor](https://angular.io/api/forms/ControlValueAccessor) directive which acts as a bridge that synchronizes the data between element and Forms API.

In most cases, for elements such as `ef-text-field`, `ef-search-field` and `ef-number-field>` that has similar behavior to native `input[type=text]`, you can use [DefaultValueAccessor](https://angular.io/api/forms/DefaultValueAccessor) directive `ngDefaultControl`.

```html
<ef-text-field formControlName="..." ngDefaultControl>
</ef-text-field>
```

However, there are elements that needs custom implmentation of `ControlValueAccessor`. Implementation may varies depending on element's API and how you want to use them in your form.

Below is the example of how to implement `ef-slider` `ControlValueAccessor` when slider is in `range` mode. You can customise how `ef-slider` writes value to Angular Forms depending on your use case.

```typescript
import { Directive, forwardRef, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: 'ef-slider',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderValueAccessorDirective),
      multi: true,
    },
  ],
})
export class SliderValueAccessorDirective implements ControlValueAccessor {
  constructor(private elementRef: ElementRef) {}

  private onChange: any = (value: { from: ''; to: '' }) => {};
  private onTouched: any = (value: { from: ''; to: '' }) => {};

  public value = { from: '', to: '' };

  writeValue(value: { from: string; to: string }) {
    this.value = value;
    this.onChange(value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.elementRef.nativeElement.disabled = isDisabled;
  }

  @HostListener('from-changed', ['$event.detail.value'])
  fromChanged(value: string) {
    this.value.from = value;
  }

  @HostListener('to-changed', ['$event.detail.value'])
  toChanged(value: string) {
    this.value.to = value;
  }
}
```

## Additional type definition

Some EF elements supports i18N features. It uses [FormatJS](https://formatjs.io/) library and some of thier modules are using features that available in new Javascript version. If you see any errors related to @formatjs during project compilation, you may need to add `esnext.intl` into `lib` section in `tsconfig.json` file.

```diff
"lib": [
  "es2018",
+ "esnext.intl"
  "dom"
]
```

::footer::

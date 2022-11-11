<!-- 
title: Element Framework Extensions
location: ./creating-custom-elements
type: page
layout: default
-->

# Creating Custom Elements

Element Framework does not only provide a collection of UI components but also allow you to extend the components from EF base classes.

When you are using a framework to build apps, you may not necessary to create new components from EF base class but use EF components to compose components that specific to your framework, for example, Angular components, React components, or Vue components.

However, if you want to craft components that agnostic to application frameworks, either in order to share them with other projects or give you flexibility to be able to change your application framework, you may follow our guideline to extend the components from EF base classes.

EF base classes are extended from [Lit](https://lit.dev/), there are more advantage to create components from our base class rather than Lit directly as it will derive extra advantages that are implemented in EF Core module such as mobile tap events, localisation, accessibility, etc.

@> Element Framework is using TypeScript and Lit. We strongly recommend reading through [Lit Documentation](https://lit.dev/docs/) to understand a concept of Web Components as well as features of Lit.

## Playground

A playground showing a simple element that created from Element Framework.

<a target="_blank" href="https://codesandbox.io/s/counter-element-nwogim?file=/elements/efx-counter.ts" style="display:inline-block;padding:4px 12px;background:blue;color:white">Start Now</a>

## Quickstart Tutorial

Get started to create your first component by reading through the short tutorial.

<a href="./tutorials/element" style="display:inline-block;padding:4px 12px;background:blue;color:white">Start Now</a>

## Starter Template

Instantly create your component project. Starter template comes with completed project structure and tooling for linting, testing, demo page.

<a href="./tools/starter-templates" style="display:inline-block;padding:4px 12px;background:blue;color:white">Start Now</a>
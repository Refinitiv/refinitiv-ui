<!--
type: page
title: Styling Components
location: ./styles/styling-components
layout: default
-->

# Styling Components
EF elements are built with using [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Shadow DOM encapsulates internal styles and component structures so they don't leak out, or get interfered with by application-level styles.

While component's internal styles are protected, applications can override any styles that are available at host scope by using the normal CSS selector.

```html
<ef-email-field class="login-input"></ef-email-field>
<ef-password-field class="login-input"></ef-password-field>
```

```css
.login-input {
  width: 150px;
  margin-bottom: 5px;
}
```

## CSS Variables
Some EF elements provide [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) which allows application to modify its internal styles without hacking into Shadow DOM. CSS Variables are also used to style canvas components. Available CSS variables are in API document of each component.

```html
<ef-led-gauge red-blue-scale></ef-led-gauge>
```

```css
ef-led-gauge[red-blue-scale] {
  --center-right-segment-color: rgba(60, 60, 200, 0.65);
  --right-segment-color: rgba(60, 60, 200, 1);
}
```

::footer::

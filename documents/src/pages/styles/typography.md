<!--
type: page
title: Typography
location: ./styles/typography
layout: default
-->

# Typography

In accordance with Refinitiv's Halo Design System, the default font in your application should be Proxima Nova Fin, which is automatically applied when you import native styles from EF themes.

::proximanovawarning::

::
```css
.semibold {
  font-weight: 500;
}
.bold {
  font-weight: 600;
}
.fonts {
  font-size: 24px;
}
```
```html
<h6>Proxima Nova Fin Regular (400)</h6>
<div class="fonts">
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
</div>
<h6>Proxima Nova Fin Semibold (500)</h6>
<div class="fonts semibold">
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
</div>
<h6>Proxima Nova Fin Bold (600)</h6>
<div class="fonts bold">
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
a b c d e f g h i j k l m n o p q r s t u v w x y z
0 1 2 3 4 5 6 7 8 9
</div>
```
```javascript
import { halo } from '/theme-loader.js';
halo();
```
::


::footer::
